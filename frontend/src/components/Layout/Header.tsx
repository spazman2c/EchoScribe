import { PlusCircle } from 'lucide-react';

export function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-base font-normal">Welcome back! Here’s a snapshot of your recent meetings and team sentiment.</p>
      </div>
      <div className="flex space-x-2">
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium text-sm text-white focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm">
          <PlusCircle className="w-5 h-5 mr-1" strokeWidth={1.5} />
          New Meeting
        </button>
      </div>
    </div>
  );
}
