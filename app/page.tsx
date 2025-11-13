'use client';

import EnvelopeIcon from './components/EnvelopeIcon';
import HeartIcon from './components/HeartIcon';
import CalendarIcon from './components/CalendarIcon';
import Calendar from './components/Calendar';

export default function Home() {
  const calendarEvents = [
    { date: 15, title: 'Movie Night', color: '#f5d7d7' },
    { date: 20, title: 'Anniversary Dinner', color: '#fef9f3' },
  ];

  return (
    <div className="min-h-screen bg-[#fefbf9] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#5a5a5a] mb-8">
          Create Love Mail
        </h1>

        <div className="bg-gray-100 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-8 h-8 text-[#5a5a5a]" />
              <HeartIcon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-semibold text-[#5a5a5a]">Love Mail</h2>
          </div>
          
          {/* Rings Icon */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full border-4 border-[#e8b4a0]"></div>
              <div className="w-12 h-12 rounded-full border-4 border-[#b8d4c8] -ml-4"></div>
            </div>
          </div>

          {/* Three Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Notes & Sweet Nothings */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
                Notes & Sweet Nothings
              </h3>
              <div className="space-y-3">
                <div className="bg-[#f5d7d7] rounded-lg p-3 flex items-start gap-2">
                  <HeartIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                  <p className="text-sm text-[#5a5a5a]">
                    Good morning, my love! Thinking of you.
                  </p>
                </div>
                <div className="bg-[#f5d7d7] rounded-lg p-3 flex items-start gap-2">
                  <CalendarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#5a5a5a]" />
                  <p className="text-sm text-[#5a5a5a]">
                    Don't forget we have dinner reservations this Friday!
                  </p>
                </div>
              </div>
            </div>

            {/* Shared Tasks & Lists */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
                Shared Tasks & Lists
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Grocery List: Milk, Eggs, Bread</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>To-do: water plants, pick up your dry cleaning</span>
                </div>
              </div>
              <button className="mt-4 w-10 h-10 rounded-full bg-[#e8b4a0] text-white flex items-center justify-center hover:bg-[#d4a088] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Our Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
                Our Calendar
              </h3>
              <Calendar events={calendarEvents} />
              <div className="mt-4 space-y-2">
                <div className="bg-[#f5d7d7] rounded-lg p-2 text-sm text-[#5a5a5a]">
                  May 15: Movie Night
                </div>
                <div className="bg-[#fef9f3] rounded-lg p-2 text-sm text-[#5a5a5a]">
                  May 20: Anniversary Dinner
                </div>
              </div>
            </div>
          </div>

          {/* Export Data */}
          <div className="text-right mt-6">
            <button className="text-[#5a5a5a] hover:text-[#8a8a8a] transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
