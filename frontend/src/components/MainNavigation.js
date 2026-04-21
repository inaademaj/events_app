import {Form, NavLink, useRouteLoaderData} from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <div className={classes.brand}>
        <NavLink to="/" className={classes.logo}>
          EventSpace
        </NavLink>
        <p>Secure event experiences with a cleaner product feel.</p>
      </div>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.authActions}>
        {!token && (
          <NavLink
            to="/auth?mode=login"
            className={({ isActive }) =>
              isActive
                ? `${classes.authLink} ${classes.authActive}`
                : classes.authLink
            }
          >
            Authentication
          </NavLink>
        )}
        {token && (
          <Form action="/logout" method="post">
            <button className={classes.logoutButton}>Logout</button>
          </Form>
        )}
      </div>
    </header>
  );
}

export default MainNavigation;
