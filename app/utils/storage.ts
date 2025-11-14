export interface CalendarEvent {
  date: number;
  title: string;
  color: string;
  id?: string;
}

export interface LoveMailData {
  notes: string[];
  tasks: string[];
  calendarEvents: CalendarEvent[];
}

const STORAGE_KEY = 'lovemail-data';

export const storage = {
  getData(): LoveMailData {
    if (typeof window === 'undefined') {
      return { notes: [], tasks: [], calendarEvents: [] };
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { notes: [], tasks: [], calendarEvents: [] };
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return { notes: [], tasks: [], calendarEvents: [] };
    }
  },

  saveData(data: LoveMailData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new CustomEvent('lovemail-data-updated'));
  },

  addNote(note: string): void {
    const data = this.getData();
    data.notes.push(note);
    this.saveData(data);
  },

  addTask(task: string): void {
    const data = this.getData();
    data.tasks.push(task);
    this.saveData(data);
  },

  addCalendarEvent(event: CalendarEvent): void {
    const data = this.getData();
    event.id = event.id || `event-${Date.now()}-${Math.random()}`;
    data.calendarEvents.push(event);
    this.saveData(data);
  },

  removeCalendarEvent(eventId: string): void {
    const data = this.getData();
    data.calendarEvents = data.calendarEvents.filter(e => e.id !== eventId);
    this.saveData(data);
  },

  updateNotes(notes: string[]): void {
    const data = this.getData();
    data.notes = notes;
    this.saveData(data);
  },

  updateTasks(tasks: string[]): void {
    const data = this.getData();
    data.tasks = tasks;
    this.saveData(data);
  },

  resetData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new CustomEvent('lovemail-data-updated'));
  },
};

