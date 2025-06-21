import { useState } from "react";
import { eventsMock } from "../data/events.mock";

export function useUserEvents() {
  const [events, setEvents] = useState(eventsMock);

  const createEvent = (eventData: any) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const cancelEvent = (eventId: string) => {
    setEvents((prev) => prev.map(ev =>
      ev.id === eventId ? { ...ev, status: "cancelled" } : ev
    ));
  };

  return {
    events,
    createEvent,
    cancelEvent,
  };
}
