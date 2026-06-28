"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  User,
  Task,
  Message,
  Note,
  CalendarEvent,
  Company,
} from "./types";
import {
  users as initialUsers,
  tasks as initialTasks,
  messages as initialMessages,
  notes as initialNotes,
  calendarEvents as initialCalendar,
} from "./mock-data";

interface AppState {
  currentUser: User;
  users: User[];
  tasks: Task[];
  messages: Message[];
  notes: Note[];
  calendarEvents: CalendarEvent[];
  companies: Company[];
  setCurrentUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  addUser: (user: User) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addMessage: (message: Message) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (id: string) => void;
  addSubmission: (
    taskId: string,
    submission: import("./types").Submission,
  ) => void;
  createCompany: (name: string, ownerId: string) => Company;
  joinCompany: (code: string, userId: string) => Company | null;
  getCompanyByCode: (code: string) => Company | undefined;
}

const StoreContext = createContext<AppState | null>(null);

const defaultCompany: Company = {
  id: "c1",
  name: "owTask Corp",
  inviteCode: "OWTASK2024",
  leaderCode: "LEAD-OWTASK",
  workerCode: "WORK-OWTASK",
  ownerId: "u1",
  createdAt: "2024-01-01",
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  const [usersList, setUsersList] = useState<User[]>(initialUsers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [notesList, setNotes] = useState<Note[]>(initialNotes);
  const [calendarEvents, setCalendarEvents] =
    useState<CalendarEvent[]>(initialCalendar);
  const [companies, setCompanies] = useState<Company[]>([defaultCompany]);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    );
  }, []);

  const addUser = useCallback((user: User) => {
    setUsersList((prev) => [...prev, user]);
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const addNote = useCallback((note: Note) => {
    setNotes((prev) => [...prev, note]);
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addCalendarEvent = useCallback((event: CalendarEvent) => {
    setCalendarEvents((prev) => [...prev, event]);
  }, []);

  const deleteCalendarEvent = useCallback((id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const addSubmission = useCallback(
    (taskId: string, submission: import("./types").Submission) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, submissions: [...t.submissions, submission] }
            : t,
        ),
      );
    },
    [],
  );

  const createCompany = useCallback(
    (name: string, ownerId: string): Company => {
      const code =
        name
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 8) +
        "-" +
        Math.random().toString(36).slice(2, 6).toUpperCase();
      const company: Company = {
        id: "c" + Date.now(),
        name,
        inviteCode: code,
        leaderCode: "LEAD-" + code,
        workerCode: "WORK-" + code,
        ownerId,
        createdAt: new Date().toISOString(),
      };
      setCompanies((prev) => [...prev, company]);
      return company;
    },
    [],
  );

  const joinCompany = useCallback(
    (code: string, userId: string): Company | null => {
      const company = companies.find(
        (c) =>
          c.inviteCode === code ||
          c.leaderCode === code ||
          c.workerCode === code,
      );
      if (!company) return null;
      setUsersList((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, companyId: company.id } : u,
        ),
      );
      return company;
    },
    [companies],
  );

  const getCompanyByCode = useCallback(
    (code: string): Company | undefined => {
      return companies.find(
        (c) =>
          c.inviteCode === code ||
          c.leaderCode === code ||
          c.workerCode === code,
      );
    },
    [companies],
  );

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        users: usersList,
        tasks,
        messages,
        notes: notesList,
        calendarEvents,
        companies,
        setCurrentUser,
        updateUser,
        addUser,
        addTask,
        updateTask,
        deleteTask,
        addMessage,
        addNote,
        updateNote,
        deleteNote,
        addCalendarEvent,
        deleteCalendarEvent,
        addSubmission,
        createCompany,
        joinCompany,
        getCompanyByCode,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
