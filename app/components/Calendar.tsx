'use client';

import { useState } from 'react';

interface CalendarEvent {
  date: number;
  title: string;
  color: string;
  id?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: number) => void;
  onEventAdd?: (event: CalendarEvent) => void;
  showEventModal?: boolean;
  displayMonth?: number; // 0-11 (0 = January, 10 = November)
  displayYear?: number;
  highlightDate?: number; // Date to highlight in pink
}

const EVENT_COLORS = [
  { name: 'Pink', value: '#f5d7d7' },
  { name: 'Peach', value: '#fef9f3' },
  { name: 'Mint', value: '#b8d4c8' },
  { name: 'Lavender', value: '#e6d9e9' },
  { name: 'Coral', value: '#e8b4a0' },
];

export default function Calendar({ events = [], onDateClick, onEventAdd, showEventModal = true, displayMonth, displayYear, highlightDate }: CalendarProps) {
  const [currentDate] = useState(new Date());
  const month = displayMonth !== undefined ? displayMonth : currentDate.getMonth();
  const year = displayYear !== undefined ? displayYear : currentDate.getFullYear();
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
  const today = currentDate.getDate();

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventColor, setEventColor] = useState(EVENT_COLORS[0].value);

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

  const handleDateClick = (date: number) => {
    if (showEventModal) {
      setSelectedDate(date);
      setEventTitle('');
      setEventColor(EVENT_COLORS[0].value);
    }
    onDateClick?.(date);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && eventTitle.trim() && onEventAdd) {
      onEventAdd({
        date: selectedDate,
        title: eventTitle.trim(),
        color: eventColor,
      });
      setSelectedDate(null);
      setEventTitle('');
    }
  };

  const isToday = (date: number | null) => {
    if (date === null) return false;
    const currentDate = new Date();
    // Check if we're viewing the current month and year, and if the date matches today
    const isCurrentMonth = month === currentDate.getMonth();
    const isCurrentYear = year === currentDate.getFullYear();
    const isTodayDate = date === currentDate.getDate();
    return isCurrentMonth && isCurrentYear && isTodayDate;
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="text-sm text-[#5a5a5a] mb-4">{monthName} {year}</div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-[#8a8a8a] py-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const event = getEventForDate(day);
            const isCurrentDay = isToday(day);
            const isHighlighted = highlightDate !== undefined && day === highlightDate;
            
            // Determine styling for today - always highlight prominently
            let buttonStyle: React.CSSProperties | undefined;
            let buttonClasses = 'aspect-square rounded-lg text-sm transition-all duration-200 font-medium relative ';
            
            if (day) {
              if (isCurrentDay) {
                // Today always gets prominent highlighting
                if (event) {
                  // Today with event: use event color but add prominent ring
                  buttonStyle = { backgroundColor: event.color };
                  buttonClasses += 'text-white hover:opacity-90 ring-4 ring-[#e8b4a0] ring-offset-2 ring-offset-white shadow-xl font-bold';
                } else {
                  // Today without event: use coral background with ring
                  buttonClasses += 'bg-[#e8b4a0] text-white hover:bg-[#d4a088] ring-4 ring-[#e8b4a0] ring-offset-2 ring-offset-white shadow-xl font-bold';
                }
              } else if (event) {
                // Event on non-today date
                buttonStyle = { backgroundColor: event.color };
                buttonClasses += 'text-white hover:opacity-90';
              } else if (isHighlighted) {
                // Highlighted date (not today)
                buttonClasses += 'bg-[#f5d7d7] text-[#5a5a5a] hover:bg-[#f0cccc]';
              } else {
                // Regular date
                buttonClasses += 'bg-gray-50 text-[#5a5a5a] hover:bg-[#f5d7d7]';
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => day && handleDateClick(day)}
                className={buttonClasses}
                style={buttonStyle}
                disabled={!day}
                title={isCurrentDay ? "Today" : event ? event.title : undefined}
              >
                {day}
                {isCurrentDay && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#e8b4a0] shadow-sm" title="Today"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      {selectedDate !== null && showEventModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedDate(null)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#5a5a5a] mb-4">
              Add Event for {monthName} {selectedDate}
            </h3>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5a5a5a] mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b4a0] focus:border-transparent"
                  placeholder="Enter event title..."
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5a5a5a] mb-2">
                  Color
                </label>
                <div className="flex gap-2 flex-wrap">
                  {EVENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setEventColor(color.value)}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        eventColor === color.value
                          ? 'border-[#5a5a5a] scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-[#5a5a5a] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!eventTitle.trim()}
                  className="flex-1 px-4 py-2 bg-[#e8b4a0] text-white rounded-lg hover:bg-[#d4a088] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

