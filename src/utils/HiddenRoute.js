import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

/*
    This Component simply Hides a component if the user is logged in. IE hiding the longin link when user is logged in already.
  */
const HiddenRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!localStorage.getItem('token')) {
          return <Component />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default HiddenRoute;
