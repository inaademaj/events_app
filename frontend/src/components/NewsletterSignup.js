import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup({
  compact = false,
  title = 'Stay in the loop',
  description = 'Get product updates, curated events, and launch news in one polished weekly email.',
}) {
  const fetcher = useFetcher();
  const formRef = useRef(null);
  const { data, state } = fetcher;
  const isSubmitting = state === 'submitting';

  useEffect(() => {
    if (state === 'idle' && data?.ok) {
      formRef.current?.reset();
    }
  }, [data, state]);

  return (
    <section className={`${classes.wrapper} ${compact ? classes.compact : ''}`}>
      <div className={classes.copy}>
        <p className={classes.eyebrow}>Newsletter</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <fetcher.Form
        ref={formRef}
        method="post"
        action="/newsletter"
        className={classes.newsletter}
      >
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          aria-label="Sign up for newsletter"
          required
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Joining...' : 'Sign up'}
        </button>
      </fetcher.Form>
      {data?.message && (
        <p className={`${classes.feedback} ${data.ok ? classes.success : classes.error}`}>
          {data.message}
        </p>
      )}
    </section>
  );
}

export default NewsletterSignup;
