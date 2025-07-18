export function Meetings() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Meetings</h1>
          <p className="text-gray-400">
            Manage and analyze your meetings with AI-powered insights.
          </p>
        </div>
        <button className="btn-primary text-base px-6 py-2 rounded-xl shadow-card">Schedule Meeting</button>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6 bg-surface/80">
        <div className="flex flex-wrap gap-4">
          <select className="input w-auto">
            <option>All Status</option>
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select className="input w-auto">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This week</option>
            <option>This month</option>
          </select>
          <input
            type="search"
            placeholder="Search meetings..."
            className="input flex-1 min-w-64"
          />
        </div>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="card p-6 bg-surface/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    Weekly Team Standup #{i}
                  </h3>
                  <span className="px-2 py-1 bg-success-500/10 text-success-400 text-xs font-medium rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-400 mb-3">
                  Weekly sync to discuss progress, blockers, and upcoming
                  priorities.
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>📅 Dec {15 + i}, 2024 at 10:00 AM</span>
                  <span>⏱️ 45 minutes</span>
                  <span>👥 5 participants</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="btn-outline text-sm">View Analysis</button>
                <button className="btn-secondary text-sm">View Details</button>
              </div>
            </div>

            {/* Quick insights */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">Sentiment</p>
                  <p className="font-semibold text-success-400">Positive</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Action Items</p>
                  <p className="font-semibold text-white">3</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Key Topics</p>
                  <p className="font-semibold text-white">5</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2">
          <button className="btn-outline">Previous</button>
          <span className="px-3 py-2 text-sm text-gray-400">Page 1 of 3</span>
          <button className="btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}
