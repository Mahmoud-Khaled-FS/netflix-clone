import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Protected(props) {
  const auth = useSelector((store) => store.auth);
  if (!auth.token) {
    return <Navigate to={'/'} />;
  }
  return props.children;
}

Protected.NotAuth = function NotAuth(props) {
  const auth = useSelector((store) => store.auth);
  if (auth.token) {
    if (!auth.setup) {
      return <Navigate to={'/simpleSetup'} />;
    }
    return <Navigate to={'/browse'} />;
  }
  return props.children;
};
export default Protected;
