'use client';

import { useState, useEffect } from 'react';
import EnvelopeIcon from './components/EnvelopeIcon';
import HeartIcon from './components/HeartIcon';
import CalendarIcon from './components/CalendarIcon';
import Calendar from './components/Calendar';
import { storage, CalendarEvent } from './utils/storage';

export default function Home() {
  const [notes, setNotes] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  // Load data from localStorage on mount and when data updates
  useEffect(() => {
    const loadData = () => {
      const data = storage.getData();
      setNotes(data.notes);
      setTasks(data.tasks);
      setCalendarEvents(data.calendarEvents);
    };

    // Load initial data
    loadData();

    // Listen for data updates from other tabs/pages
    window.addEventListener('lovemail-data-updated', loadData);

    return () => {
      window.removeEventListener('lovemail-data-updated', loadData);
    };
  }, []);

  // Get current month/year for calendar display
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter calendar events for the current month and year
  const currentMonthEvents = calendarEvents.filter(event => {
    // Since events store only date number, we need to check if they're in the current month
    // For simplicity, we'll show all events below the calendar
    return true;
  });

  // Format event for display
  const formatEventDate = (event: CalendarEvent) => {
    // Since we only have the date number, we'll use a placeholder format
    // In a real app, you'd want to store full date info
    const eventDate = new Date(currentYear, currentMonth, event.date);
    const monthName = eventDate.toLocaleString('default', { month: 'long' });
    return `${monthName} ${event.date}: ${event.title}`;
  };

  // Helper to determine if a note contains calendar-related content
  const isCalendarNote = (note: string) => {
    const calendarKeywords = ['reservation', 'reservations', 'dinner', 'appointment', 'meeting', 'date', 'friday', 'saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
    return calendarKeywords.some(keyword => note.toLowerCase().includes(keyword));
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      storage.addTask(newTask.trim());
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
      setShowTaskModal(false);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowTaskModal(false);
    setNewTask('');
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#5a5a5a] mb-8">
          Create Love Mail
        </h1>

        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-6xl mx-auto">
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
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <div key={index} className="bg-[#f5d7d7] rounded-lg p-3 flex items-start gap-2">
                      {isCalendarNote(note) ? (
                        <CalendarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#5a5a5a]" />
                      ) : (
                        <HeartIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <p className="text-sm text-[#5a5a5a]">{note}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-[#f5d7d7] rounded-lg p-3 flex items-start gap-2">
                      <HeartIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="text-sm text-[#5a5a5a]">Good morning, my love! Thinking of you.</p>
                    </div>
                    <div className="bg-[#f5d7d7] rounded-lg p-3 flex items-start gap-2">
                      <CalendarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#5a5a5a]" />
                      <p className="text-sm text-[#5a5a5a]">Don't forget we have dinner reservations this Friday!</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Shared Tasks & Lists */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
                Shared Tasks & Lists
              </h3>
              <div className="space-y-3">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => {
                    // Check if task starts with "Grocery List:" or similar completed task markers
                    const isCompleted = task.toLowerCase().startsWith('grocery list:') || 
                                       task.toLowerCase().includes('completed') ||
                                       task.toLowerCase().startsWith('done:');
                    const isTask = task.toLowerCase().startsWith('to-do:') || 
                                  task.toLowerCase().startsWith('todo:');
                    
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                        <span>{task}</span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Grocery List: Milk, Eggs, Bread</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5a5a5a]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span>To-do: water plants, pick up your dry cleaning</span>
                    </div>
                  </>
                )}
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => setShowTaskModal(true)}
                    className="w-12 h-12 bg-[#e8b4a0] rounded-full flex items-center justify-center hover:bg-[#d4a088] transition-colors shadow-sm"
                    aria-label="Add new task"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Our Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#5a5a5a] mb-4">
                Our Calendar
              </h3>
              <Calendar 
                events={calendarEvents.filter(e => {
                  // Filter events for current month (simplified check)
                  return true;
                })} 
                showEventModal={false} 
                displayMonth={currentMonth} 
                displayYear={currentYear} 
              />
              <div className="mt-4 space-y-2">
                {calendarEvents.length > 0 ? (
                  calendarEvents.slice(0, 5).map((event, index) => (
                    <div 
                      key={event.id || index} 
                      className="rounded-lg p-2 text-sm text-[#5a5a5a]"
                      style={{ backgroundColor: event.color || '#f5d7d7' }}
                    >
                      {formatEventDate(event)}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-[#f5d7d7] rounded-lg p-2 text-sm text-[#5a5a5a]">
                      May 15: Movie Night
                    </div>
                    <div className="bg-[#e8b4a0] rounded-lg p-2 text-sm text-[#5a5a5a]">
                      May 20: Anniversary Dinner
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-end items-center mt-6">
            <button className="text-[#5a5a5a] hover:text-[#8a8a8a] transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-[#5a5a5a] mb-4">
              Add New Task or List
            </h3>
            <p className="text-sm text-[#8a8a8a] mb-4">
              Add a grocery list, reminder, or daily task to share with your partner.
            </p>
            <textarea
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleAddTask();
                }
              }}
              className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b4a0] focus:border-transparent resize-none mb-4"
              placeholder="e.g., Grocery List: Milk, Eggs, Bread or To-do: water plants, pick up dry cleaning"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-[#5a5a5a] hover:text-[#8a8a8a] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="px-6 py-2 bg-[#e8b4a0] text-white rounded-lg hover:bg-[#d4a088] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
