'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import VisualPath from '@/components/VisualPath'
import ShareableCard from '@/components/ShareableCard'
import { toPng } from 'html-to-image'
import { calculateConnectionResult } from '@/lib/connectionCalculator'

function ResultPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session')
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showUnlock, setShowUnlock] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(13)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [amountError, setAmountError] = useState<string | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setIsLoading(false)
      return
    }

    // Check for payment status in URL params
    const paymentStatus = searchParams.get('payment')
    if (paymentStatus === 'success') {
      // Payment successful - show confirmation message only
      setPaymentCompleted(true)
      // Don't automatically unlock - story will be sent via email
    } else if (paymentStatus === 'cancelled') {
      // Payment cancelled - show message
      setAmountError('Payment was cancelled. Please try again when ready.')
    }

    const fetchResult = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Get firstName from URL params
        const firstName = searchParams.get('firstName') || null // null means they chose "Swiftie" default
        
        // Fetch quiz data from database to calculate connections
        let quizData: any = null
        try {
          const response = await fetch(`/api/get-quiz-data?sessionId=${sessionId}`)
          if (response.ok) {
            quizData = await response.json()
          }
        } catch (err) {
          console.log('Could not fetch quiz data, using URL params')
        }
        
        // If no quiz data from DB, try to get from URL params (fallback)
        const quizInputs = {
          ageRange: quizData?.age_range || searchParams.get('ageRange') || undefined,
          city: quizData?.city || searchParams.get('city') || undefined,
          school: quizData?.school || searchParams.get('school') || undefined,
          company: quizData?.company || searchParams.get('company') || undefined,
          industry: quizData?.industry || searchParams.get('industry') || undefined,
          experienceLevel: quizData?.experience_level || searchParams.get('experienceLevel') || undefined,
        }
        
        // Calculate connections and rarity using deterministic algorithm
        const { connections, rarity } = calculateConnectionResult(quizInputs)
        
        setResult({
          connections,
          rarity,
          firstName,
          story: firstName
            ? `Wow ${firstName}! You're just ${connections} connections away from Taylor Swift! Your path likely goes through a mutual friend in the music industry, perhaps someone who worked at Republic Records or Big Machine Label Group. Imagine the stories you could uncover!`
            : `Wow! You're just ${connections} connections away from Taylor Swift! Your path likely goes through a mutual friend in the music industry, perhaps someone who worked at Republic Records or Big Machine Label Group. Imagine the stories you could uncover!`
        })
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load results')
        setIsLoading(false)
      }
    }

    fetchResult()
  }, [sessionId, searchParams])

  // Helper function to wait for all images to load
  const waitForImages = (element: HTMLElement): Promise<void> => {
    return new Promise((resolve) => {
      // Wait a bit for Next.js Image components to render
      setTimeout(() => {
        const images = element.querySelectorAll('img')
        if (images.length === 0) {
          // Extra delay to ensure everything is rendered
          setTimeout(resolve, 300)
          return
        }
        
        let loadedCount = 0
        const totalImages = images.length
        let resolved = false
        
        const checkComplete = () => {
          if (resolved) return
          loadedCount++
          if (loadedCount === totalImages) {
            resolved = true
            // Extra delay to ensure rendering is complete, especially for Next.js Image components
            setTimeout(resolve, 500)
          }
        }
        
        images.forEach((img) => {
          // Check if image is already loaded
          if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            checkComplete()
          } else {
            // Wait for image to load
            img.onload = () => {
              // Double check it's actually loaded
              if (img.complete && img.naturalWidth > 0) {
                checkComplete()
              }
            }
            img.onerror = checkComplete // Continue even if image fails
            // Force load if src is set
            if (img.src && !img.complete) {
              const tempImg = new Image()
              tempImg.onload = checkComplete
              tempImg.onerror = checkComplete
              tempImg.src = img.src
            }
          }
        })
        
        // Timeout after 8 seconds (longer for mobile/slow connections)
        setTimeout(() => {
          if (!resolved) {
            resolved = true
            resolve()
          }
        }, 8000)
      }, 200)
    })
  }

  const handleShare = async () => {
    if (!result || !cardRef.current || isSharing) return
    
    setIsSharing(true)
    
    try {
      // Clean and format the name for sharing
      const rawFirstName = result.firstName?.trim() || ''
      const shareName = rawFirstName !== '' ? rawFirstName : 'Swiftie'
      const hasFirstName = rawFirstName !== ''
      
      // Personalized share message with website URL
      const shareText = hasFirstName
        ? `${shareName} is ${result.connections} connections from Taylor Swift! In the top ${result.rarity} of Swifties! 💜 Find your connection at swifties.getsanely.com`
        : `I'm ${result.connections} connections from Taylor Swift! In the top ${result.rarity} of Swifties! 💜 Find your connection at swifties.getsanely.com`
      
      // Wait for all images to load before generating
      await waitForImages(cardRef.current)
      
      // Generate high-quality image for sharing (1080x1920 for IG Story format)
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Reduced from 3 for better performance, still high quality
        backgroundColor: '#fef3f8',
        cacheBust: true,
        fontEmbedCSS: '', // Ensure fonts are embedded
      })
      
      // Convert data URL to blob
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const fileName = `${shareName.toLowerCase().replace(/\s+/g, '-')}-taylor-connection-${result.connections}.png`
      const file = new File([blob], fileName, { type: 'image/png' })
      
      // Try Web Share API with file (works on mobile and some desktop browsers)
      // Prioritize sharing the image file on mobile
      if (navigator.share) {
        const shareTitle = `${shareName} is ${result.connections} connections from Taylor Swift!`
        
        try {
          // First, try to share with the image file (this is what we want on mobile)
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: shareTitle,
              text: shareText,
            })
            // Success - user shared the image
            return
          }
          
          // If file sharing not supported, try with text and URL
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: 'https://swifties.getsanely.com',
          })
          // Success - user shared
          return
        } catch (shareError: any) {
          // User cancelled - that's fine, just return silently
          if (shareError.name === 'AbortError') {
            return
          }
          // If share failed, continue to download fallback
          console.log('Share failed, falling back to download:', shareError)
        }
      }
      
      // Fallback: Download the image (for browsers that don't support Web Share API)
      // On mobile, this will save to camera roll/gallery
      const blobUrl = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.download = fileName
      link.href = blobUrl
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      }, 100)
      
      // Only show message on desktop (mobile will just download)
      if (window.innerWidth > 768) {
        // Brief, non-intrusive message
        console.log('Image downloaded! Share it from your downloads folder.')
      }
      
    } catch (err) {
      console.error('Share error:', err)
      // Silent failure - user can try again or use download button
    } finally {
      setIsSharing(false)
    }
  }

  const handleDownload = async () => {
    if (!result || !cardRef.current || isGeneratingImage) return
    
    setIsGeneratingImage(true)
    
    try {
      const displayNameForFile = result.firstName || 'Swiftie'
      const fileName = `${displayNameForFile.toLowerCase().replace(/\s+/g, '-')}-taylor-connection-${result.connections}.png`
      
      // Wait for all images to load before generating
      await waitForImages(cardRef.current)
      
      // Generate high-quality image (1080x1920 for IG Story format)
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Reduced from 3 for better performance, still high quality
        backgroundColor: '#fef3f8',
        cacheBust: true,
        fontEmbedCSS: '', // Ensure fonts are embedded
      })
      
      // Convert to blob for better mobile compatibility
      const imageResponse = await fetch(dataUrl)
      const imageBlob = await imageResponse.blob()
      const blobUrl = URL.createObjectURL(imageBlob)
      
      // Create download link
      const link = document.createElement('a')
      link.download = fileName
      link.href = blobUrl
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      // Clean up after a delay
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      }, 100)
      
      setIsGeneratingImage(false)
    } catch (error) {
      console.error('Error generating image:', error)
      setIsGeneratingImage(false)
      // Silent failure - user can try again
      console.error('Failed to generate image. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-8 animate-spin">✨</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loading your results...
          </h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-purple-dark mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/quiz')}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!result) {
    return null
  }

  // Use firstName if provided, otherwise use "Swiftie" (they chose the default)
  // Clean and format the name properly
  const rawFirstName = result.firstName?.trim() || ''
  const displayName = rawFirstName !== '' ? rawFirstName : 'Swiftie'
  const username = rawFirstName !== ''
    ? `@${rawFirstName.toLowerCase().replace(/\s+/g, '')}swiftie` 
    : '@swiftie'
  
  // Personalize messages - use cleaned displayName
  const hasFirstName = rawFirstName !== ''
  const rarityMessage = hasFirstName
    ? `${displayName}, only ${result.rarity} of Swifties are this close! 💜`
    : `Only ${result.rarity} of Swifties are this close! 💜`
  
  const vipMessage = hasFirstName
    ? `${displayName}, you're basically VIP status! ✨`
    : `You're basically VIP status! ✨`

  // Calculate display amount for button
  const getDisplayAmount = () => {
    if (customAmount) {
      const parsed = parseFloat(customAmount)
      return isNaN(parsed) ? (selectedAmount || 13) : parsed
    }
    return selectedAmount || 13
  }

  return (
    <>
      {/* Hidden Shareable Card for Image Generation - IG Story Format (9:16) */}
      {result && (
        <div className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" style={{ width: '1080px', height: '1920px' }}>
          <div ref={cardRef} style={{ width: '1080px', height: '1920px' }}>
            <ShareableCard
              displayName={displayName}
              connections={result.connections}
              rarity={result.rarity}
              username={username}
              firstName={hasFirstName ? rawFirstName : null}
            />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-3 sm:p-4 md:p-6 py-6 sm:py-8 md:py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-2xl border-2 sm:border-4 border-purple-gradient-start">
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
            {/* Header */}
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">💜</div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark leading-tight px-2">
              {displayName === 'Swiftie' 
                ? `YOU'RE ${result.connections} CONNECTIONS FROM TAYLOR SWIFT!`
                : `${displayName.toUpperCase()}, YOU'RE ${result.connections} CONNECTIONS FROM TAYLOR SWIFT!`
              }
            </h1>

            {/* Result Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200">
              {/* Visual Path - Always show the same style (like landing page) */}
              {/* Ensure full visibility - no negative margins needed, component handles it */}
              <div className="mb-6 w-full">
                <VisualPath connections={result.connections} firstName={result.firstName} />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-base sm:text-lg font-bold text-purple-dark mb-2">RARITY:</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-gradient-start">
                    {rarityMessage}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-purple-dark font-medium">
                  {vipMessage}
                </p>

                <p className="text-sm text-gray-medium font-mono">{username}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4"
                onClick={handleShare}
                disabled={isSharing}
              >
                <span className="flex-shrink-0 text-base sm:text-lg">{isSharing ? '✨' : '📸'}</span>
                <span className="whitespace-nowrap">{isSharing ? 'Sharing...' : 'Share My Card'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4"
                onClick={handleDownload}
                disabled={isGeneratingImage}
              >
                <span className="flex-shrink-0 text-base sm:text-lg">{isGeneratingImage ? '✨' : '📥'}</span>
                <span className="whitespace-nowrap">
                  <span className="hidden sm:inline">{isGeneratingImage ? 'Generating...' : 'Download to Camera Roll'}</span>
                  <span className="sm:hidden">{isGeneratingImage ? 'Generating...' : 'Download'}</span>
                </span>
              </Button>
            </div>

            {/* Payment Success Confirmation */}
            {paymentCompleted && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-green-400 shadow-xl mb-4 sm:mb-6">
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="text-5xl sm:text-6xl md:text-7xl mb-2">✨</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 mb-2 sm:mb-3 leading-tight">
                    Payment Successful! 💜
                  </h2>
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-200">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-semibold mb-2 leading-relaxed">
                      Your full connection story to Taylor Swift will be sent to your provided email
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
                      in less than 24 hours! ⏰
                    </p>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200">
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Check your inbox (and spam folder) for your personalized connection story! 📧
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Divider - Only show unlock section if payment hasn't been completed */}
            {!paymentCompleted && (
            <div className="border-t-2 border-gray-200 pt-4 sm:pt-6">
              <p className="text-base sm:text-lg md:text-xl font-bold text-purple-dark mb-4 sm:mb-6">
                Okay but WHO are these people?
              </p>

              {!showUnlock ? (
                <Button
                  onClick={() => setShowUnlock(true)}
                  size="lg"
                  className="w-full mb-4 sm:mb-6 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4"
                >
                  <span className="flex-shrink-0 text-base sm:text-lg">🔓</span>
                  <span className="whitespace-nowrap">
                    <span className="hidden sm:inline">Unlock Your Full Story</span>
                    <span className="sm:hidden">Unlock Story</span>
                  </span>
                </Button>
              ) : (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="bg-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-2 border-purple-200 text-left">
                    <p className="font-bold text-purple-dark mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">
                      See exactly who connects you:
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-medium text-sm sm:text-base">
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">✅</span>
                        <span>All the names revealed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">✅</span>
                        <span>How they know each other</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">✅</span>
                        <span>Where they work</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">✅</span>
                        <span>Verified sources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">✅</span>
                        <span>Share without watermark</span>
                      </li>
                    </ul>
                  </div>

                  {/* Connection Story */}
                  <div className="bg-white border-2 border-purple-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-left">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {result.story}
                    </p>
                  </div>

                  {/* Only show payment section if payment hasn't been completed */}
                  {!paymentCompleted && (
                  <div className="bg-gradient-to-r from-purple-gradient-start to-purple-gradient-end rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-white">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 leading-tight">Pay What You Like • One-time • Yours forever</p>
                    
                    {/* Preset Amount Buttons */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {[13, 20, 50].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount('')
                            setAmountError(null)
                          }}
                              className={cn(
                                'px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all',
                                'border-2 touch-manipulation min-h-[44px] sm:min-h-[48px]',
                                'active:scale-95',
                                selectedAmount === amount && !customAmount
                                  ? 'bg-white text-purple-gradient-start border-white shadow-lg scale-105'
                                  : 'bg-white/20 text-white border-white/40 hover:bg-white/30 hover:border-white/60'
                              )}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>

                          {/* Custom Amount Input */}
                          <div className="mb-3 sm:mb-4">
                            <label className="block text-white/90 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                              Or enter custom amount (min $13)
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-white text-lg sm:text-xl font-bold">$</span>
                              <input
                                type="number"
                                min="13"
                                step="1"
                                value={customAmount}
                                onChange={(e) => {
                                  const value = e.target.value
                                  setCustomAmount(value)
                                  if (value) {
                                    const numValue = parseFloat(value)
                                    if (numValue < 13) {
                                      setAmountError('Minimum amount is $13')
                                      setSelectedAmount(null)
                                    } else {
                                      setAmountError(null)
                                      setSelectedAmount(numValue)
                                    }
                                  } else {
                                    setAmountError(null)
                                    setSelectedAmount(13) // Default to $13 if empty
                                  }
                                }}
                                placeholder="13"
                                className={cn(
                                  'flex-1 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg',
                                  'bg-white/20 text-white placeholder-white/50',
                                  'border-2 border-white/40 focus:border-white focus:outline-none',
                                  'focus:bg-white/30 transition-all touch-manipulation',
                                  'min-h-[44px] sm:min-h-[48px]',
                                  amountError && 'border-red-300'
                                )}
                              />
                            </div>
                            {amountError && (
                              <p className="text-red-200 text-xs sm:text-sm mt-1">{amountError}</p>
                            )}
                          </div>

                          {/* Continue Button */}
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full mt-2 bg-white text-purple-gradient-start hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center px-3 sm:px-4 whitespace-nowrap"
                      onClick={async () => {
                        const finalAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 13)
                        if (finalAmount && finalAmount >= 13) {
                          setIsProcessingPayment(true)
                          setAmountError(null)
                          
                          try {
                            const response = await fetch('/api/create-checkout', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                amount: finalAmount,
                                sessionId: sessionId,
                              }),
                            })

                            if (!response.ok) {
                              const errorData = await response.json()
                              throw new Error(errorData.error || 'Failed to create checkout session')
                            }

                            const data = await response.json()
                            
                            // Redirect to Stripe checkout (or success page in mock mode)
                            if (data.checkoutUrl) {
                              window.location.href = data.checkoutUrl
                            } else {
                              throw new Error('No checkout URL received')
                            }
                          } catch (error) {
                            console.error('Payment error:', error)
                            setAmountError(error instanceof Error ? error.message : 'Failed to process payment. Please try again.')
                            setIsProcessingPayment(false)
                          }
                        } else {
                          setAmountError('Please select or enter an amount (minimum $13)')
                        }
                      }}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? 'Processing... ✨' : `Continue - $${getDisplayAmount()}`}
                    </Button>
                  </div>
                  )}

                  {!paymentCompleted && (
                  <p className="text-sm text-gray-medium flex items-center justify-center gap-2">
                    <span>🔒</span>
                    <span>Private & secure • No subscriptions, no spam</span>
                  </p>
                  )}
                </div>
              )}
            </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button
                onClick={() => router.push('/quiz')}
                variant="outline"
                className="flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center px-3 sm:px-4 whitespace-nowrap"
              >
                Take Quiz Again
              </Button>
              <Button
                onClick={() => router.push('/')}
                className="flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center px-3 sm:px-4 whitespace-nowrap"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your results...</p>
        </div>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  )
}
