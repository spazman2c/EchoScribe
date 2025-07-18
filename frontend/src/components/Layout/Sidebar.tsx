import { LayoutDashboard, Activity, CheckCircle, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', aria: 'Dashboard', to: '/dashboard' },
  { icon: Activity, label: 'Analysis', aria: 'Analysis', to: '/analysis' },
  { icon: CheckCircle, label: 'Tasks', aria: 'Tasks', to: '/tasks' },
  { icon: BarChart2, label: 'Insights', aria: 'Insights', to: '/analytics' },
  { icon: Settings, label: 'Settings', aria: 'Settings', to: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-16 sm:w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-6 z-30">
      <div className="mb-10">
        <div className="text-2xl font-semibold tracking-tight text-primary-400 flex items-center justify-center h-12 w-12 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-lg shadow-sm">ES</div>
      </div>
      <nav className="flex flex-col space-y-8 mt-2">
        {navItems.map(({ icon: Icon, aria, to }, idx) => (
          <button
            key={aria}
            className="group p-2 rounded-lg hover:bg-gray-800 outline-none transition"
            aria-label={aria}
            // TODO: Add NavLink for active state
          >
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400" strokeWidth={1.5} />
          </button>
        ))}
      </nav>
      <div className="flex-1"></div>
      <div className="flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-700" />
      </div>
    </aside>
  );
} 