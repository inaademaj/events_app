import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className={classes.shell}>
      <div className={classes.intro}>
        <p className={classes.eyebrow}>Secure access</p>
        <h1>{isLogin ? 'Welcome back to EventSpace' : 'Create your organizer account'}</h1>
        <p>
          {isLogin
            ? 'Sign in to publish events, update details, and manage your audience.'
            : 'Set up a clean workspace for events, announcements, and protected actions.'}
        </p>
        <ul className={classes.highlights}>
          <li>Protected event management</li>
          <li>Persistent session handling</li>
          <li>Fast, focused publishing workflow</li>
        </ul>
      </div>
      <Form method="post" className={classes.form}>
        <div className={classes.formHeader}>
          <h2>{isLogin ? 'Log in' : 'Create account'}</h2>
          <p>{isLogin ? 'Use your credentials to continue.' : 'Get started in less than a minute.'}</p>
        </div>
        {data && data.errors && (
          <ul className={classes.errors}>
            {Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}
          </ul>
        )}
        {data && data.message && <p className={classes.message}>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength="6" />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} >
            {isLogin ? 'Create new user' : 'Login instead'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : isLogin ? 'Log in' : 'Create account'}</button>
        </div>
      </Form>
    </section>
  );
}

export default AuthForm;
