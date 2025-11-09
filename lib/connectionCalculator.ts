/**
 * Deterministic algorithm to calculate connection path and rarity
 * Based on user inputs - same inputs = same results
 */

interface QuizData {
  ageRange?: string
  city?: string
  school?: string
  company?: string
  industry?: string
  experienceLevel?: string
}

/**
 * Simple hash function to create consistent numeric value from string
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

/**
 * Calculate connection count based on user inputs
 * Returns a number between 2-6 connections
 */
export function calculateConnections(data: QuizData): number {
  let connectionScore = 5 // Base: 5 connections (most common)
  
  // Music cities = closer connections
  const musicCities = ['nashville', 'los angeles', 'new york', 'nyc', 'london', 'toronto', 'austin']
  const cityLower = (data.city || '').toLowerCase()
  if (musicCities.some(mc => cityLower.includes(mc))) {
    connectionScore -= 1.5 // Music cities = 1-2 connections closer
  }
  
  // Music/Entertainment industry = much closer
  if (data.industry === 'music') {
    connectionScore -= 2 // Music industry = 2-3 connections closer
  } else if (data.industry === 'creative' || data.industry === 'marketing') {
    connectionScore -= 0.5 // Creative/marketing = slightly closer
  }
  
  // Music schools = closer
  const musicSchools = ['berklee', 'belmont', 'full sail', 'juilliard', 'usc', 'nyu', 'vanderbilt']
  const schoolLower = (data.school || '').toLowerCase()
  if (musicSchools.some(ms => schoolLower.includes(ms))) {
    connectionScore -= 1 // Music schools = 1 connection closer
  }
  
  // Music companies = closer
  const musicCompanies = ['republic', 'big machine', 'universal', 'sony', 'warner', 'spotify', 'apple music', 'record label']
  const companyLower = (data.company || '').toLowerCase()
  if (musicCompanies.some(mc => companyLower.includes(mc))) {
    connectionScore -= 1.5 // Music companies = 1-2 connections closer
  }
  
  // Age factor (younger = potentially closer through social media)
  if (data.ageRange === '18-24') {
    connectionScore -= 0.3 // Slightly closer
  } else if (data.ageRange === '45+') {
    connectionScore += 0.5 // Slightly further
  }
  
  // Experience level (more experience = more connections)
  if (data.experienceLevel === '10+') {
    connectionScore -= 0.5 // More experience = slightly closer
  } else if (data.experienceLevel === '0-2') {
    connectionScore += 0.3 // Less experience = slightly further
  }
  
  // Add some variation based on hash of all inputs combined
  const combinedInput = `${data.city || ''}-${data.school || ''}-${data.company || ''}-${data.industry || ''}`
  const hashValue = hashString(combinedInput)
  const variation = (hashValue % 100) / 100 // 0-0.99 variation
  
  // Apply variation (can add or subtract up to 0.8 connections)
  connectionScore += (variation - 0.5) * 1.6
  
  // Clamp between 2 and 6 connections
  const connections = Math.max(2, Math.min(6, Math.round(connectionScore)))
  
  return connections
}

/**
 * Calculate rarity percentage based on connection count
 * Fewer connections = rarer (lower percentage)
 */
export function calculateRarity(connections: number): string {
  // Rarity distribution:
  // 2 connections: 0.5-1.5% (extremely rare)
  // 3 connections: 1.5-3.5% (very rare)
  // 4 connections: 3.5-6.5% (rare)
  // 5 connections: 6.5-12% (uncommon)
  // 6 connections: 12-20% (common)
  
  let baseRarity: number
  let range: number
  
  switch (connections) {
    case 2:
      baseRarity = 1.0
      range = 1.0
      break
    case 3:
      baseRarity = 2.5
      range = 2.0
      break
    case 4:
      baseRarity = 5.0
      range = 3.0
      break
    case 5:
      baseRarity = 9.0
      range = 5.5
      break
    case 6:
      baseRarity = 16.0
      range = 8.0
      break
    default:
      baseRarity = 5.0
      range = 3.0
  }
  
  // Add small variation based on connections (for visual variety)
  const variation = (connections * 7) % 10 / 10 // 0-0.9
  const rarity = baseRarity + (variation - 0.45) * range
  
  return Math.max(0.1, Math.min(25, rarity)).toFixed(1)
}

/**
 * Calculate connections and rarity from quiz data
 * Returns consistent results for the same inputs
 */
export function calculateConnectionResult(data: QuizData): {
  connections: number
  rarity: string
} {
  const connections = calculateConnections(data)
  const rarity = calculateRarity(connections)
  
  return {
    connections,
    rarity: `${rarity}%`
  }
}

