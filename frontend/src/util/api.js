import { json } from 'react-router-dom';

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export async function readJsonOrThrow(response, fallbackMessage) {
  const data = await parseResponse(response);

  if (!response.ok) {
    throw json(
      { message: data?.message || fallbackMessage },
      { status: response.status || 500 }
    );
  }

  return data;
}

export async function fetchEvents() {
  const response = await fetch(buildApiUrl('/events'));
  const data = await readJsonOrThrow(response, 'Could not fetch events.');
  return data.events || [];
}

export async function fetchEvent(eventId) {
  const response = await fetch(buildApiUrl(`/events/${eventId}`));
  const data = await readJsonOrThrow(
    response,
    'Could not fetch details for selected event.'
  );
  return data.event;
}
