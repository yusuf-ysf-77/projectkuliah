"use client";

import { createContext, useContext, useState } from "react";

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}

const CalendarContext = createContext<CalendarContextType>({
  selectedDate: new Date(),
  setSelectedDate: () => {},
});

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  return useContext(CalendarContext);
}
