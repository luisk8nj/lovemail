'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from '../components/Calendar';
import { storage, CalendarEvent } from '../utils/storage';

export default function UpdatePage() {
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState('');
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const notesListRef = useRef<string[]>([]);
  const tasksListRef = useRef<string[]>([]);
  const isUpdatingRef = useRef(false);

  // Load data from localStorage on mount and when data updates
  useEffect(() => {
    const loadData = () => {
      const data = storage.getData();
      
      // Always update calendar events (they're independent)
      setCalendarEvents(data.calendarEvents);
      
      // Only update notes/tasks if they changed externally (not from our own saves)
      // This prevents circular updates when we save notes/tasks
      if (!isUpdatingRef.current) {
        const currentNotesArray = data.notes;
        const currentTasksArray = data.tasks;
        
        if (JSON.stringify(currentNotesArray) !== JSON.stringify(notesListRef.current)) {
          notesListRef.current = currentNotesArray;
          setNotes(currentNotesArray.join('\n'));
        }
        
        if (JSON.stringify(currentTasksArray) !== JSON.stringify(tasksListRef.current)) {
          tasksListRef.current = currentTasksArray;
          setTasks(currentTasksArray.join('\n'));
        }
      }
    };

    // Load initial data
    const data = storage.getData();
    setCalendarEvents(data.calendarEvents);
    notesListRef.current = data.notes;
    tasksListRef.current = data.tasks;
    setNotes(data.notes.join('\n'));
    setTasks(data.tasks.join('\n'));

    // Listen for data updates from other tabs/pages or calendar events
    window.addEventListener('lovemail-data-updated', loadData);

    return () => {
      window.removeEventListener('lovemail-data-updated', loadData);
    };
  }, []);

  // Auto-save notes as they change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const notesArray = notes.split('\n').filter(n => n.trim());
      const notesArrayStr = JSON.stringify(notesArray);
      const lastSavedStr = JSON.stringify(notesListRef.current);
      
      // Only save if notes actually changed
      if (notesArrayStr !== lastSavedStr) {
        isUpdatingRef.current = true;
        storage.updateNotes(notesArray);
        notesListRef.current = notesArray;
        // Reset flag after a short delay to allow event to propagate
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [notes]);

  // Auto-save tasks as they change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const tasksArray = tasks.split('\n').filter(t => t.trim());
      const tasksArrayStr = JSON.stringify(tasksArray);
      const lastSavedStr = JSON.stringify(tasksListRef.current);
      
      // Only save if tasks actually changed
      if (tasksArrayStr !== lastSavedStr) {
        isUpdatingRef.current = true;
        storage.updateTasks(tasksArray);
        tasksListRef.current = tasksArray;
        // Reset flag after a short delay to allow event to propagate
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timer);
  }, [tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure all data is saved
    const notesArray = notes.split('\n').filter(n => n.trim());
    const tasksArray = tasks.split('\n').filter(t => t.trim());
    storage.updateNotes(notesArray);
    storage.updateTasks(tasksArray);
    // Navigate to confirmation page
    router.push('/confirmation');
  };

  const handleDateClick = (date: number) => {
    // Calendar component handles the modal
    console.log('Date clicked:', date);
  };

  const handleEventAdd = (event: CalendarEvent) => {
    // Storage utility will add the ID if not present and dispatch the sync event
    // This will trigger the 'lovemail-data-updated' event which will update the UI
    storage.addCalendarEvent(event);
    // Immediately update local state for instant feedback
    const data = storage.getData();
    setCalendarEvents(data.calendarEvents);
  };

  return (
    <div className="min-h-screen bg-[#fefbf9] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#5a5a5a] mb-8">
          Update Love Mail
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Our Calendar - Outside of form to avoid nested forms */}
          <div>
            <p className="text-sm text-[#8a8a8a] mb-4">
              Click on any date to add an event
            </p>
            <Calendar 
              events={calendarEvents} 
              onDateClick={handleDateClick}
              onEventAdd={handleEventAdd}
              showEventModal={true}
              displayMonth={new Date().getMonth()}
              displayYear={new Date().getFullYear()}
            />
            {calendarEvents.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold text-[#5a5a5a]">Upcoming Events:</h4>
                {calendarEvents.map((event, index) => (
                  <div
                    key={event.id || index}
                    className="rounded-lg p-2 text-sm text-[#5a5a5a] flex items-center justify-between"
                    style={{ backgroundColor: event.color }}
                  >
                    <span>
                      {new Date().toLocaleString('default', { month: 'long' })} {event.date}: {event.title}
                    </span>
                    <button
                      onClick={() => {
                        if (event.id) {
                          storage.removeCalendarEvent(event.id);
                          // Reload calendar events from storage to ensure consistency
                          const data = storage.getData();
                          setCalendarEvents(data.calendarEvents);
                        }
                      }}
                      className="ml-2 text-red-600 hover:text-red-800 text-xs"
                      title="Remove event"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

