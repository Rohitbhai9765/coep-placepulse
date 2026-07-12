import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventForm from "@/components/calendar/EventForm";
import { getEvent } from "@/services/eventApi";

import type { Event } from "@/types/event";

const EditEvent = () => {
  const { id } = useParams();

  const [event, setEvent] = useState<Event | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      const data = await getEvent(eventId);

      setEvent(data);
    } catch (error) {
      console.error(error);

      alert("Unable to load event.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-xl">Loading event...</h2>;
  }

  if (!event) {
    return <h2 className="text-xl">Event not found.</h2>;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Edit Event
        </h1>

        <p className="mt-2 text-zinc-500">
          Update placement event.
        </p>

      </div>

      <EventForm event={event} />

    </div>
  );
};

export default EditEvent;