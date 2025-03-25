// app/not-found.js (or app/not-found.tsx if using TypeScript)

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-500">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mt-2">
          Oops! Looks like you’ve wandered into the void.
        </p>
        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}