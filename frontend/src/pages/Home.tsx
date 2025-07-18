import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Turn Conversations into{' '}
            <span className="text-blue-400">Actionable Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            EchoScribe is an AI-driven meeting analyzer that provides teams with summarized insights, emotional sentiment analysis, actionable tasks, and intelligent follow-up suggestions.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium text-base text-white focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm">
              Get Started
            </Link>
            <button className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-blue-700 hover:text-white transition rounded-lg font-medium text-base text-blue-400 border border-gray-700 hover:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-400 text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Summarization</h3>
            <p className="text-gray-400 text-sm">Get intelligent meeting summaries with key points and decisions</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-400 text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Sentiment Analysis</h3>
            <p className="text-gray-400 text-sm">Understand team dynamics and emotional context</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-yellow-400 text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Action Items</h3>
            <p className="text-gray-400 text-sm">Automatically extract and assign actionable tasks</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-400 text-2xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Integrations</h3>
            <p className="text-gray-400 text-sm">Connect with Zoom, Slack, Jira, and more</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-800 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to transform your meetings?</h2>
          <p className="text-gray-400 mb-6">Join teams who are already using EchoScribe to make their meetings more productive and actionable.</p>
          <Link to="/dashboard" className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium text-lg text-white focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm">
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
