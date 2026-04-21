// import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';

import classes from './EventsList.module.css';
import { formatEventDate, isUpcomingEvent, sortEventsByDate } from '../util/events';

function EventsList({
  events,
  title = 'All Events',
  intro = 'Find upcoming sessions, talks, and curated experiences.',
}) {
  const token = useRouteLoaderData('root');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  // const events = useLoaderData();
  const sortedEvents = sortEventsByDate(events);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredEvents = sortedEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(normalizedSearch) ||
      event.description.toLowerCase().includes(normalizedSearch);

    if (!matchesSearch) {
      return false;
    }

    if (filter === 'upcoming') {
      return isUpcomingEvent(event.date);
    }

    if (filter === 'past') {
      return !isUpcomingEvent(event.date);
    }

    return true;
  });

  return (
    <section className={classes.events}>
      <div className={classes.topRow}>
        <div>
          <p className={classes.eyebrow}>Curated schedule</p>
          <h2>{title}</h2>
          <p className={classes.intro}>{intro}</p>
        </div>
        <div className={classes.summary}>
          <strong>{filteredEvents.length}</strong>
          <span>matching events</span>
        </div>
      </div>
      <div className={classes.controls}>
        <input
          type="search"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className={classes.filters}>
          <button
            type="button"
            className={filter === 'all' ? classes.activeFilter : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'upcoming' ? classes.activeFilter : ''}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={filter === 'past' ? classes.activeFilter : ''}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>
      </div>
      {filteredEvents.length === 0 && (
        <div className={classes.empty}>
          <h3>No events matched your filters.</h3>
          <p>Try another keyword or switch the event view to see more results.</p>
          {token && (
            <Link to="/events/new" className={classes.emptyAction}>
              Create a New Event
            </Link>
          )}
        </div>
      )}
      <ul className={classes.list}>
        {filteredEvents.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <p className={classes.date}>{formatEventDate(event.date)}</p>
                <h2>{event.title}</h2>
                <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                <p>{event.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventsList;
