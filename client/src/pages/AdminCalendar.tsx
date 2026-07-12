import { useEffect, useState } from "react";

import type { Event } from "@/types/event";

import EventForm from "@/components/calendar/EventForm";
import EventTable from "@/components/calendar/EventTable";

import { getEvents } from "@/services/eventApi";

const AdminCalendar = () => {

  const [events, setEvents] =
    useState<Event[]>([]);

  const fetchEvents = async () => {

    const data = await getEvents();

    setEvents(data);

  };

  useEffect(() => {

    fetchEvents();

  }, []);

  return (

    <div className="space-y-10">

      <div>

        <h1 className="text-5xl font-bold">
          Placement Calendar
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage placement schedule.
        </p>

      </div>

      <EventForm />

      <EventTable
        events={events}
        refresh={fetchEvents}
      />

    </div>

  );

};

export default AdminCalendar;