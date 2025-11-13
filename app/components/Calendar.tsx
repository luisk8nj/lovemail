'use client';

import { useState } from 'react';

interface CalendarEvent {
  date: number;
  title: string;
  color: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: number) => void;
}

export default function Calendar({ events = [], onDateClick }: CalendarProps) {
  const [currentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array of days
  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEventForDate = (date: number | null) => {
    if (date === null) return null;
    return events.find(e => e.date === date);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">{monthName} {year}</h3>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-[#8a8a8a] py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const event = getEventForDate(day);
          return (
            <button
              key={index}
              onClick={() => day && onDateClick?.(day)}
              className={`aspect-square rounded-lg text-sm transition-colors ${
                day
                  ? event
                    ? 'text-white hover:opacity-90'
                    : 'bg-gray-50 text-[#5a5a5a] hover:bg-[#f5d7d7]'
                  : ''
              }`}
              style={event ? { backgroundColor: event.color } : undefined}
              disabled={!day}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

