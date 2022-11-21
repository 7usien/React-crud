import React from 'react';
import { Table } from 'react-bootstrap';
const Loading = ({ loading, error, children }) => {
 // to get children type if Button as we need
 const elementType = children?.type?.render?.displayName;
 const renderHandler = () => {
  if (elementType === 'Button') {
   const cloneElement = React.cloneElement(
    children,
    { disabled: true },
    'loading ...'
   );
   return (
    <>
     {loading ? (
      cloneElement
     ) : error ? (
      <>
       {children}
       <p>{error}</p>
      </>
     ) : (
      <>{children}</>
     )}
    </>
   );
  }
  return (
   <>
    {loading ? (
     <p>loading wait ...</p>
    ) : error ? (
     <p>{error}</p>
    ) : (
     <>{children}</>
    )}
   </>
  );
 };

 return renderHandler();
};

export default Loading;
