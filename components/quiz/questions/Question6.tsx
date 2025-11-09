'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'
import Button from '@/components/ui/Button'

interface Question6Props {
  companies?: string[]
  onCompaniesChange: (value: string[]) => void
  onNext: () => void
  progress: number
}

export default function Question6({
  companies = [],
  onCompaniesChange,
  onNext,
  progress,
}: Question6Props) {
  const [companyInputs, setCompanyInputs] = useState<string[]>(
    companies.length > 0 ? companies : ['']
  )
  const [skipped, setSkipped] = useState(companies.length === 0)

  const handleCompanyChange = (index: number, value: string) => {
    const newInputs = [...companyInputs]
    newInputs[index] = value
    setCompanyInputs(newInputs)
    onCompaniesChange(newInputs.filter((c) => c.trim() !== ''))
    if (value.trim() !== '') {
      setSkipped(false)
    }
  }

  const addCompany = () => {
    setCompanyInputs([...companyInputs, ''])
  }

  const removeCompany = (index: number) => {
    if (companyInputs.length > 1) {
      const newInputs = companyInputs.filter((_, i) => i !== index)
      setCompanyInputs(newInputs)
      onCompaniesChange(newInputs.filter((c) => c.trim() !== ''))
    }
  }

  const handleSkip = () => {
    setSkipped(true)
    setCompanyInputs([''])
    onCompaniesChange([])
  }

  return (
    <QuestionBase
      progress={progress}
      emoji="🏢"
      title="Where have you worked?"
      onNext={onNext}
      canProceed={true}
      footerText={
        <>
          <p className="mb-2 font-medium text-purple-dark">💡 Why this helps:</p>
          <p className="mb-2">We search for people at these companies who have connections to Taylor's world.</p>
          <p className="text-sm">Example: Your coworker → Someone they know at Apple Music → Taylor's team!</p>
        </>
      }
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-medium text-center mb-4">
          (Optional but this is the secret sauce! 🎧)
        </p>

        {!skipped && (
          <>
            {companyInputs.map((company, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium text-gray-medium">
                  Company {index + 1}:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => handleCompanyChange(index, e.target.value)}
                    placeholder="Type company name..."
                    className="flex-1 p-4 rounded-xl border-2 border-gray-200 focus:border-purple-gradient-start focus:outline-none text-lg"
                  />
                  {companyInputs.length > 1 && (
                    <button
                      onClick={() => removeCompany(index)}
                      className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={addCompany}
              className="w-full p-3 text-purple-gradient-start font-medium hover:bg-purple-50 rounded-xl transition-colors border-2 border-dashed border-purple-200"
            >
              + Add another (optional)
            </button>
          </>
        )}

        {skipped ? (
          <div className="text-center py-4">
            <p className="text-gray-medium mb-4">You skipped this question</p>
            <Button
              onClick={() => setSkipped(false)}
              variant="outline"
              className="w-full"
            >
              Add companies
            </Button>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full"
            >
              Skip this question
            </Button>
          </div>
        )}
      </div>
    </QuestionBase>
  )
}
