import React from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';

import { deletePost } from '../state/postSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostlistItem = ({ posts, isLogged }) => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const delteHandler = (id) => {
  dispatch(deletePost(id));
 };

 const postLoop =
  posts.length > 0 &&
  posts.map((ele, idx) => (
   <tr key={ele.id}>
    <td>{++idx}</td>

    <td>
     <Link to={`post/${ele.id}`}>{ele.title}</Link>
    </td>
    <td>{ele.desc}</td>
    <td>
     <ButtonGroup aria-label='Basic example'>
      <Button
       variant='success'
       onClick={() => {
        navigate(`/post/${ele.id}/edit`);
       }}
      >
       Edit
      </Button>
      <Button
       disabled={!isLogged}
       onClick={() => {
        delteHandler(ele.id);
       }}
       variant='danger'
      >
       Delete
      </Button>
     </ButtonGroup>
    </td>
   </tr>
  ));

 return <>{postLoop}</>;
};

export default PostlistItem;
