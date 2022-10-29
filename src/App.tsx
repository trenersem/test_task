import React, { useRef, useState } from 'react';
import { Form, Home, Users } from './components';
import Loading from './components/Loading';

import './index.scss';
import { useGetTokenQuery, useGetUsersQuery } from './store/reducers/usersApi';

const App = () => {
  const [countUsers, setCountUsers] = useState(6);
  const {} = useGetTokenQuery();
  const { data, isFetching } = useGetUsersQuery({ countUsers });

  const mainRef = useRef<any>(null);

  const scroolToUsers = () => {
    mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scroolToSignUp = () => {
    mainRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <div className="app">
      <Home goToUsers={scroolToUsers} goToSignUp={scroolToSignUp} />
      <div className="main" ref={mainRef}>
        {isFetching ? (
          <Loading />
        ) : (
          <Users data={data} count={countUsers} setCount={setCountUsers} />
        )}
        <Form count={countUsers} setCount={setCountUsers} />
      </div>
    </div>
  );
};

export default App;
