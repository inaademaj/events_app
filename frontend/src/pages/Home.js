import { Suspense } from 'react';
import { Await, Link, defer, useLoaderData, useRouteLoaderData } from 'react-router-dom';

import classes from './Home.module.css';
import { fetchEvents } from '../util/api';
import { formatEventDate, getFeaturedEvents } from '../util/events';

function HomePage() {
  const { events } = useLoaderData();
  const token = useRouteLoaderData('root');

  return (
    <div className={classes.page}>
      <section className={classes.hero}>
        <div className={classes.heroCopy}>
          <p className={classes.eyebrow}>React Authentication Project</p>
          <h1>Launch secure events with a frontend that feels production-ready.</h1>
          <p className={classes.description}>
            Discover live experiences, publish new sessions, and manage access through a cleaner authentication flow.
          </p>
          <div className={classes.actions}>
            <Link to="/events" className={classes.primaryAction}>
              Explore Events
            </Link>
            <Link to={token ? '/events/new' : '/auth?mode=login'} className={classes.secondaryAction}>
              {token ? 'Create an Event' : 'Log In'}
            </Link>
          </div>
          <div className={classes.stats}>
            <div>
              <strong>Fast CRUD</strong>
              <span>Protected create, edit, and delete flows</span>
            </div>
            <div>
              <strong>Clean UX</strong>
              <span>Improved forms, empty states, and feedback</span>
            </div>
            <div>
              <strong>Senior polish</strong>
              <span>Sharper layout, typography, and visual hierarchy</span>
            </div>
          </div>
        </div>
        <div className={classes.heroPanel}>
          <div className={classes.panelCard}>
            <span>Platform snapshot</span>
            <h2>All core flows are connected.</h2>
            <ul>
              <li>Authentication-protected event management</li>
              <li>Searchable event browsing experience</li>
              <li>Newsletter capture with inline feedback</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={classes.featureGrid}>
        <article>
          <h2>Built for clear navigation</h2>
          <p>People can move from discovery to action without hitting dead ends or confusing layouts.</p>
        </article>
        <article>
          <h2>Designed around trust</h2>
          <p>Auth state behaves more predictably, expired sessions are handled safely, and protected screens stay protected.</p>
        </article>
        <article>
          <h2>Ready for extension</h2>
          <p>The API access layer is cleaner now, which makes future backend integrations easier to grow.</p>
        </article>
      </section>

      <section className={classes.featured}>
        <div className={classes.sectionHeading}>
          <p className={classes.eyebrow}>Featured events</p>
          <h2>Upcoming experiences people can join next</h2>
        </div>
        <Suspense fallback={<p className={classes.loading}>Loading featured events...</p>}>
          <Await resolve={events}>
            {(loadedEvents) => {
              const featuredEvents = getFeaturedEvents(loadedEvents);

              if (featuredEvents.length === 0) {
                return (
                  <div className={classes.emptyState}>
                    <p>No upcoming events yet. Add one to bring the platform to life.</p>
                    {token && (
                      <Link to="/events/new" className={classes.primaryAction}>
                        Add First Event
                      </Link>
                    )}
                  </div>
                );
              }

              return (
                <div className={classes.cards}>
                  {featuredEvents.map((event) => (
                    <Link key={event.id} to={`/events/${event.id}`} className={classes.card}>
                      <img src={event.image} alt={event.title} />
                      <div className={classes.cardBody}>
                        <p>{formatEventDate(event.date)}</p>
                        <h3>{event.title}</h3>
                        <span>View details</span>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </section>
    </div>
  );
}

export default HomePage;

export function loader() {
  return defer({
    events: fetchEvents(),
  });
}
