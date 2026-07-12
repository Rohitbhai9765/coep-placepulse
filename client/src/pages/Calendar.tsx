import { useEffect, useState } from "react";

import { getEvents } from "@/services/eventApi";

import type { Event } from "@/types/event";

import EventCard from "@/components/calendar/EventCard";

const Calendar = () => {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    const data = await getEvents();

    setEvents(data);

  };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Placement Calendar
        </h1>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {events.map((event) => (

          <EventCard
            key={event._id}
            event={event}
          />

        ))}

      </div>

    </div>

  );

};

export default Calendar;