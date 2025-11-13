'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from '../components/Calendar';

export default function UpdatePage() {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([
    { date: 15, title: 'Movie Night', color: '#f5d7d7' },
    { date: 20, title: 'Anniversary Dinner', color: '#fef9f3' },
  ]);
  const [eventInput, setEventInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to confirmation page
    router.push('/confirmation');
  };

  const handleDateClick = (date: number) => {
    // In a real app, this would open a modal to add an event
    console.log('Date clicked:', date);
  };

  return (
    <div className="min-h-screen bg-[#fefbf9] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#5a5a5a] mb-8">
          Update Love Mail
        </h1>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Notes & Sweet Nothings */}
          <div>
            <label className="block text-lg font-semibold text-[#5a5a5a] mb-3">
              Notes & Sweet Nothings
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b4a0] focus:border-transparent resize-none"
              placeholder="Write your sweet notes here..."
            />
          </div>

          {/* Shared Tasks & Lists */}
          <div>
            <label className="block text-lg font-semibold text-[#5a5a5a] mb-3">
              Shared Tasks & Lists
            </label>
            <textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b4a0] focus:border-transparent resize-none"
              placeholder="Add your shared tasks and lists here..."
            />
          </div>

          {/* Our Calendar */}
          <div>
            <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
              Our Calendar
            </h3>
            <Calendar events={calendarEvents} onDateClick={handleDateClick} />
            <div className="mt-4">
              <textarea
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b4a0] focus:border-transparent resize-none"
                placeholder="Add calendar events or reminders here..."
              />
            </div>
          </div>

          {/* Export Data */}
          <div className="text-right">
            <button
              type="button"
              className="text-[#5a5a5a] hover:text-[#8a8a8a] transition-colors mr-4"
            >
              Export Data
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#e8b4a0] text-white rounded-lg hover:bg-[#d4a088] transition-colors"
            >
              Update Love Mail
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

