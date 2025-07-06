import type { JSX } from "preact";
import type { Event } from "~/server/services/event/schema";

interface ViewEventProps extends JSX.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

export default function ViewEvent({ event, ...props }: ViewEventProps) {
  return (
    <div {...props}>
      <h1 className="text-4xl font-bold text-neutral mb-2">{event.title}</h1>
      {event.description && (
        <p className="text-lg text-base-content/80 mb-6">{event.description}</p>
      )}
      <div className="space-y-4">
        {event.date && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Date:</span>
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
        )}
        {event.address && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Address:</span>
            <span>{event.address}</span>
          </div>
        )}
        {event.rsvpByDate && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">RSVP by:</span>
            <span>{new Date(event.rsvpByDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
