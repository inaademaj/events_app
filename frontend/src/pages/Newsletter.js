import { json } from 'react-router-dom';

import NewsletterSignup from '../components/NewsletterSignup';

function NewsletterPage() {
  return <NewsletterSignup />;
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email')?.trim();

  if (!email || !email.includes('@')) {
    return json(
      { ok: false, message: 'Please enter a valid email address.' },
      { status: 422 }
    );
  }

  return {
    ok: true,
    message: `You're in. The next newsletter will be sent to ${email}.`,
  };
}
