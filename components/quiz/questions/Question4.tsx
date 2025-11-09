'use client'

import QuestionBase from '../QuestionBase'

interface Question4Props {
  onNext: () => void
  progress: number
}

export default function Question4({ onNext, progress }: Question4Props) {
  return (
    <QuestionBase
      progress={progress}
      emoji="💡"
      title="Quick heads up!"
      onNext={onNext}
      nextLabel="Let's Go! →"
      canProceed={true}
    >
      <div className="space-y-6 text-center">
        <p className="text-lg text-gray-medium">
          To find REAL, accurate connections (not random guesses), we need a little more detail.
        </p>

        <p className="text-lg text-gray-medium">
          The next questions help us search for actual people who connect you to Taylor's team.
        </p>

        <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🔒</span>
            <span className="font-bold text-purple-dark">Your info stays private</span>
          </div>
          <p className="text-sm text-gray-medium">and is deleted after 30 days</p>
        </div>

        <p className="text-lg text-purple-dark font-medium">
          You've come this far — let's find your connection! ✨
        </p>
      </div>
    </QuestionBase>
  )
}

