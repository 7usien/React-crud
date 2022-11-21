import React from 'react';
import { Table } from 'react-bootstrap';
import PostlistItem from './PostlistItem';

export const PostsList = ({ posts, loading, error, isLogged }) => {
 return (
  <>
   <Table striped bordered hover>
    <thead>
     <tr>
      <th>#</th>
      <th style={{ width: 'auto' }}>Title</th>
      <th style={{ width: 'content-fit' }}>desc</th>
      <th style={{ width: 'auto' }}>Actions</th>
     </tr>
    </thead>
    <tbody>
     <PostlistItem
      isLogged={isLogged}
      posts={posts}
      loading={loading}
      error={error}
     />
    </tbody>
   </Table>
  </>
 );
};
