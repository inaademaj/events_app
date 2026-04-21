import {Link, useRouteLoaderData, useSubmit} from 'react-router-dom';

import classes from './EventItem.module.css';
import { formatEventDate } from '../util/events';

function EventItem({ event }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Delete this event? This action cannot be undone.');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <div className={classes.visual}>
        <img src={event.image} alt={event.title} />
      </div>
      <div className={classes.content}>
        <p className={classes.badge}>Featured experience</p>
        <h1>{event.title}</h1>
        <time dateTime={event.date}>{formatEventDate(event.date)}</time>
        <p>{event.description}</p>
        {token && (
          <div className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default EventItem;
