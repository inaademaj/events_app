export function sortEventsByDate(events) {
  return [...events].sort((firstEvent, secondEvent) => {
    return new Date(firstEvent.date) - new Date(secondEvent.date);
  });
}

export function formatEventDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function isUpcomingEvent(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today;
}

export function getFeaturedEvents(events, limit = 3) {
  return sortEventsByDate(events)
    .filter((event) => isUpcomingEvent(event.date))
    .slice(0, limit);
}
