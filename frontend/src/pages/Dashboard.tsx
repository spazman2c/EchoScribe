import { Mic, Smile, ClipboardList, Clock, Edit3, Check, AlertTriangle, Meh, Frown } from 'lucide-react';

export function Dashboard() {
  return (
    <main className="flex-1" style={{ minWidth: 0 }}>
      <div className="ml-16 sm:ml-20 px-3 sm:px-8 pt-8 pb-6 max-w-full overflow-x-hidden">
        {/* Header is now in Layout/Header */}
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 flex items-center gap-4 hover:border-blue-500 transition group min-w-0">
            <div className="bg-blue-600/20 rounded-lg p-3 min-w-0">
              <Mic className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight text-white">156</div>
              <div className="text-gray-400 text-sm font-normal">Meetings Analyzed</div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 flex items-center gap-4 hover:border-green-500 transition group min-w-0">
            <div className="bg-green-600/20 rounded-lg p-3 min-w-0">
              <Smile className="w-6 h-6 text-green-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-xl font-semibold tracking-tight text-white mr-1">72%</span>
                <span className="text-green-400 text-xs font-medium">↑2%</span>
              </div>
              <div className="text-gray-400 text-sm font-normal">Positive Sentiment</div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 flex items-center gap-4 hover:border-yellow-500 transition group min-w-0">
            <div className="bg-yellow-500/20 rounded-lg p-3 min-w-0">
              <ClipboardList className="w-6 h-6 text-yellow-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight text-white">32</div>
              <div className="text-gray-400 text-sm font-normal">Tasks Created</div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 flex items-center gap-4 hover:border-red-500 transition group min-w-0">
            <div className="bg-red-600/20 rounded-lg p-3 min-w-0">
              <Clock className="w-6 h-6 text-red-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight text-white">7</div>
              <div className="text-gray-400 text-sm font-normal">Follow-ups Pending</div>
            </div>
          </div>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-full" style={{ minWidth: 0 }}>
          {/* Meeting Summary Cards */}
          <section className="col-span-2 min-w-0">
            <h2 className="text-xl font-semibold tracking-tight mb-4 text-gray-100">Recent Meetings</h2>
            <div className="flex flex-col space-y-4">
              {/* Card 1 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm hover:shadow-md transition min-w-0">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-lg font-semibold">M</div>
                    <div className="truncate">
                      <div className="text-base font-semibold text-white truncate">Sprint Planning</div>
                      <div className="text-xs text-gray-400">Jun 10, 2024 • 55m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-6 min-w-0">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800" />
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800 -ml-2" />
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800 -ml-2" />
                    <span className="text-gray-400 text-xs ml-2">+4</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 md:mt-0 min-w-0">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-700/20 text-green-400 text-xs font-medium">
                    <Smile className="w-4 h-4 text-green-400" strokeWidth={1.5} />
                    Positive
                  </div>
                  <button className="ml-2 px-3 py-1 bg-gray-800 hover:bg-blue-700 hover:text-white transition rounded-lg text-blue-400 text-sm font-medium outline-none border border-gray-700 hover:border-blue-600">View</button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm hover:shadow-md transition min-w-0">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-lg font-semibold">M</div>
                    <div className="truncate">
                      <div className="text-base font-semibold text-white truncate">UX Sync</div>
                      <div className="text-xs text-gray-400">Jun 9, 2024 • 40m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-6 min-w-0">
                    <img src="https://randomuser.me/api/portraits/men/12.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800" />
                    <img src="https://randomuser.me/api/portraits/women/25.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800 -ml-2" />
                    <span className="text-gray-400 text-xs ml-2">+2</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 md:mt-0 min-w-0">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-yellow-700/20 text-yellow-400 text-xs font-medium">
                    <Meh className="w-4 h-4 text-yellow-400" strokeWidth={1.5} />
                    Neutral
                  </div>
                  <button className="ml-2 px-3 py-1 bg-gray-800 hover:bg-blue-700 hover:text-white transition rounded-lg text-blue-400 text-sm font-medium outline-none border border-gray-700 hover:border-blue-600">View</button>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm hover:shadow-md transition min-w-0">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-pink-600 flex items-center justify-center text-white text-lg font-semibold">M</div>
                    <div className="truncate">
                      <div className="text-base font-semibold text-white truncate">Client Review</div>
                      <div className="text-xs text-gray-400">Jun 8, 2024 • 30m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-6 min-w-0">
                    <img src="https://randomuser.me/api/portraits/men/16.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800" />
                    <img src="https://randomuser.me/api/portraits/women/52.jpg" className="w-7 h-7 rounded-full border-2 border-gray-800 -ml-2" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 md:mt-0 min-w-0">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-700/20 text-red-400 text-xs font-medium">
                    <Frown className="w-4 h-4 text-red-400" strokeWidth={1.5} />
                    Negative
                  </div>
                  <button className="ml-2 px-3 py-1 bg-gray-800 hover:bg-blue-700 hover:text-white transition rounded-lg text-blue-400 text-sm font-medium outline-none border border-gray-700 hover:border-blue-600">View</button>
                </div>
              </div>
            </div>
          </section>
          {/* Analytics + Activity Feed */}
          <section className="flex flex-col gap-8 min-w-0">
            {/* Analytics Card */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm min-w-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-100 tracking-tight">Sentiment Trends</h3>
                <button className="text-xs text-gray-400 font-medium hover:text-blue-400 transition outline-none">View Insights</button>
              </div>
              <div className="w-full h-32 relative min-w-0">
                <div>
                  <div className="w-full" style={{ minWidth: 0 }}>
                    {/* Chart.js chart placeholder */}
                    <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs">[Chart]</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Activity Feed */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm min-w-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-100 tracking-tight">Recent Activity</h3>
                <button className="text-xs text-gray-400 font-medium hover:text-blue-400 transition outline-none">See All</button>
              </div>
              <ul className="divide-y divide-gray-800">
                <li className="py-3 flex items-start gap-3">
                  <div className="p-2 rounded-md bg-blue-600/20">
                    <Edit3 className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-100 font-medium">AI summary generated</span>
                    <span className="text-gray-400 text-sm"> for <span className="font-medium text-blue-400">Sprint Planning</span></span>
                    <div className="text-xs text-gray-500 mt-1">2h ago</div>
                  </div>
                </li>
                <li className="py-3 flex items-start gap-3">
                  <div className="p-2 rounded-md bg-green-600/20">
                    <Check className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-100 font-medium">Task completed</span>
                    <span className="text-gray-400 text-sm"> by <span className="font-medium text-green-400">Nina Patel</span></span>
                    <div className="text-xs text-gray-500 mt-1">5h ago</div>
                  </div>
                </li>
                <li className="py-3 flex items-start gap-3">
                  <div className="p-2 rounded-md bg-yellow-500/20">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-100 font-medium">Follow-up overdue</span>
                    <span className="text-gray-400 text-sm"> for <span className="font-medium text-yellow-400">UX Sync</span></span>
                    <div className="text-xs text-gray-500 mt-1">1d ago</div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
