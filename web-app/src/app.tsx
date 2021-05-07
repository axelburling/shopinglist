import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { Item, User } from './@types/arrayTypes';
import AdminDash from './Components/Admin/index';
import AdminLogin from './Components/Admin/LoginAdmin';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import List from './Components/dashboard/List';
import Fam from './Components/Family/index';
import Forgot from './Components/ForgotPassword/index';
import Reset from './Components/ForgotPassword/reset';
import LandingPage from './Components/Landing';
import NavBar from './Components/Navbar';

const Global = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [clock, setClock] = useState('');
  const [time, setTime] = useState('');
  const [itemsChange, setItemsChange] = useState<boolean>(false);

  const [user, setUser] = useState<User>(null);
  const [famId, setFamId] = useState<string>('');
  const [id, setId] = useState('');
  const [aId, setAId] = useState('');

  const [name, setName] = useState<string>('');

  const language = async () => {
    const res = await fetch('http://localhost:8090/api/v1/admin/lang');
    const data = await res.json();
  };

  const isauth = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.getItem('token'));

      const email = localStorage.getItem('user_email');
      const body = { email };
      fetch('http://localhost:8090/api/v1/me', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(data => {
          if (data.data.loggedIn == true) {
            const value = data.data.loggedIn;
            value === true ? setIsAuth(true) : setIsAuth(false);

            setUser(data.data.user);
          }
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  setInterval(() => {
    const timezone = moment.tz.guess();
    const localTime = moment.tz(timezone).format('YYYY-MM-DD HH:mm');
    const time = moment.tz(timezone).format('HH:mm');
    setClock(time);
    setTime(localTime);
  }, 2000);

  useEffect(() => {
    isauth();
    setId(v4().toString());
  }, [isAuth]);

  useEffect(() => {
    language();
  }, [itemsChange]);

  return (
    <Global>
      {isAuth == true ? <NavBar clock={clock} /> : <> </>}
      <Switch>
        <Route
          exact
          path={`/dashboard/:id`}
          render={props => (
            <List
              items={items}
              setItems={setItems}
              itemsChange={itemsChange}
              setItemsChange={setItemsChange}
              setClock={setClock}
              time={time}
              user={user}
              name={name}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={props =>
            !isAuth ? <LandingPage /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/register"
          render={props =>
            !isAuth ? (
              <Register setIsAuth={setIsAuth} />
            ) : (
              <Redirect to="/fam" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={props =>
            !isAuth ? <Login setIsAuth={setIsAuth} /> : <Redirect to="/fam" />
          }
        />
        <Route
          exact
          path="/admin"
          render={props => <AdminLogin setAId={setAId} aId={aId} />}
        />
        <Route exact path={`/admin/${aId}`} component={AdminDash} />
        <Route exact path="/forgot" render={props => <Forgot id={id} />} />
        <Route exact path={`/${id}`} render={props => <Reset />} />
        <Route
          exact
          path={`/fam`}
          render={props =>
            isAuth ? (
              <Fam
                user={user}
                setFamId={setFamId}
                setName={setName}
                name={name}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
      <ToastContainer />
    </Global>
  );
};

export default App;
