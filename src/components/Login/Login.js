import React, { useState, useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


/**
 * 
 * @param {*} state (react makes sure that the state snapshot is the latest one)
 * @param {*} action 
 * @returns an object {value:String,isValid:Boolean}
 */
const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT')
  {
    return {value:action.val,isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR')
  {
    return {value:state.value,isValid:state.value.includes('@')};
  }
  return {value:'',isValid:false};
};

const passwordReducer=(state,action)=>{
  if(action.type==='USER_INPUT')
  {
    return {value:action.val,isValid:action.val.trim().length>6}
  }

  if(action.type==='INPUT_BLUR')
  {
    return {value:state.value,isValid:state.value.trim().length>6}
  }
  return {value:'',isValid:false};
}

const Login = (props) => {
  /**
   * in the case when we have to make a decision which is based on two or more states
   * it is better to use useReducer hook instead of useState. the reason for that is 
   * react shedules the state changes rather than changes them instantly. so when we are 
   * using more than one state,  it is possible 
   * that we dont get the latest snap shot of either of the two state so to avoid that we use 
   * useReducer hook
   */
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'',isValid:false})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'',isValid:false})

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
     emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
