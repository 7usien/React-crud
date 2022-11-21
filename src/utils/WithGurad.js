import React from 'react';
import { useSelector } from 'react-redux';

const WithGurad = (Component) => {
 const Wrapper = (props) => {
  const { isLogged } = useSelector((state) => state.authSlice);

  return isLogged ? (
   <Component props={props} />
  ) : (
   <div>please login first !!</div>
  );
 };
 return Wrapper;
};

export default WithGurad;
