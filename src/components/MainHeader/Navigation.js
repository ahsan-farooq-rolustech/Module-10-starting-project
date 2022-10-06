import React,{useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from './../../store/auth-context';

const Navigation = (props) => {
  /**
   * used the context api to get the value of isLoggedIn using a hook which is the
   * useContext hook. using the ctx variable we will have access to the isLoggedIn
   */
  const ctx=useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
