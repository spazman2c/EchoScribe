export function Analytics() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">
          Gain insights into your meeting patterns, team dynamics, and
          productivity metrics.
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="card p-4 mb-6 bg-surface/80">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">Time Range:</span>
          <select className="input w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
          </select>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meeting Frequency */}
        <div className="card p-6 bg-surface/80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Meeting Frequency
          </h2>
          <div className="h-64 bg-background rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart placeholder - Meeting frequency over time
            </p>
          </div>
        </div>

        {/* Sentiment Trends */}
        <div className="card p-6 bg-surface/80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Sentiment Trends
          </h2>
          <div className="h-64 bg-background rounded-lg flex items-center justify-center">
            <p className="text-gray-500">
              Chart placeholder - Sentiment analysis trends
            </p>
          </div>
        </div>

        {/* Action Item Completion */}
        <div className="card p-6 bg-surface/80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Action Item Completion
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Completed</span>
              <span className="text-sm font-medium text-white">67%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-success-500 h-2 rounded-full"
                style={{ width: '67%' }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-medium text-white">32</p>
                <p className="text-gray-400">Completed</p>
              </div>
              <div>
                <p className="font-medium text-white">12</p>
                <p className="text-gray-400">In Progress</p>
              </div>
              <div>
                <p className="font-medium text-white">4</p>
                <p className="text-gray-400">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Topics */}
        <div className="card p-6 bg-surface/80">
          <h2 className="text-lg font-semibold text-white mb-4">
            Most Discussed Topics
          </h2>
          <div className="space-y-3">
            {[
              { topic: 'Project Timeline', count: 15 },
              { topic: 'Budget Planning', count: 12 },
              { topic: 'Team Resources', count: 9 },
              { topic: 'Client Feedback', count: 7 },
              { topic: 'Technical Issues', count: 5 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-white">{item.topic}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-primary-400 h-2 rounded-full"
                      style={{ width: `${(item.count / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-400 w-6">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="card p-6 mt-8 bg-surface/80">
        <h2 className="text-lg font-semibold text-white mb-4">
          Team Performance Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-400 text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-white mb-1">
              Meeting Efficiency
            </h3>
            <p className="text-2xl font-bold text-primary-400 mb-2">85%</p>
            <p className="text-sm text-gray-400">Average efficiency score</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-success-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-success-500 text-2xl">🏯</span>
            </div>
            <h3 className="font-semibold text-white mb-1">
              Goal Achievement
            </h3>
            <p className="text-2xl font-bold text-success-500 mb-2">92%</p>
            <p className="text-sm text-gray-400">
              Meetings with clear outcomes
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-warning-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-warning-500 text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-white mb-1">Engagement</h3>
            <p className="text-2xl font-bold text-warning-500 mb-2">78%</p>
            <p className="text-sm text-gray-400">Average participation rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
