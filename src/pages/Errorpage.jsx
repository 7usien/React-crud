import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const Errorpage = () => {
 const error = useRouteError();

 const navigate = useNavigate();

 return (
  <Container>
   <Row>
    <Col span='6' offset='6' className='mt-5 text-center'>
     <h1>🙋 ooops !</h1>
     <p>sorry, an unexoecter rror has occured .</p>
     <p>
      <i>{error.statusText || error.message}</i>
     </p>
     <Button
      variant='link'
      onClick={() => {
       navigate('/', { replace: true });
      }}
     >
      Back
     </Button>
    </Col>
   </Row>
  </Container>
 );
};
