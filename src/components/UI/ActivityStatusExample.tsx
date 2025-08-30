import React from 'react'
import ActivityStatus from './ActivityStatus'

const ActivityStatusExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <div className="flex justify-center gap-6 flex-wrap">
          <ActivityStatus year="2025" />
          <ActivityStatus year="2024" />
        </div>
      </div>
    </div>
  )
}

export default ActivityStatusExample
