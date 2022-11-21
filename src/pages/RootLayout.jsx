import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const RootLayout = () => {
 return (
  <>
   <Container>
    <Header />
    <Row>
     <Col>
      <Outlet />
     </Col>
    </Row>
   </Container>
  </>
 );
};

export default RootLayout;
