import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const timer = setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, getTokenDuration());

    return () => clearTimeout(timer);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
