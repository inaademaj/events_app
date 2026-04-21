import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import {getAuthToken} from "../util/auth";
import { buildApiUrl, fetchEvent, fetchEvents } from '../util/api';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => (
            <EventsList
              events={loadedEvents}
              title="More Experiences"
              intro="Keep exploring related sessions, workshops, and live moments."
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  return fetchEvent(id);
}

async function loadEvents() {
  return fetchEvents();
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch(buildApiUrl('/events/' + eventId), {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
