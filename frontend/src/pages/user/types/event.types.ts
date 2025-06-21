export type EventStatus = "active" | "cancelled" | "completed";

export type UserEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status: EventStatus;
  attendees: number;
};
