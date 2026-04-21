import { Suspense } from 'react';
import { useLoaderData, Await, defer, json } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { fetchEvents } from '../util/api';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  try {
    return await fetchEvents();
  } catch (error) {
    if (error.status) {
      throw error;
    }

    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
