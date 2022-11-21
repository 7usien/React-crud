import React from 'react';
import { PostsList } from '../components/PostsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchposts } from './../state/postSlice';
import Loading from '../components/Loading';

const Index = () => {
 const { isLogged } = useSelector((state) => state.authSlice);

 const dispatch = useDispatch();
 const { records, error, loading } = useSelector((state) => state.posts);

 useEffect(() => {
  dispatch(fetchposts());
 }, [dispatch]);

 return (
  <>
   <Loading loading={loading} error={error}>
    <PostsList posts={records} isLogged={isLogged} />
   </Loading>
  </>
 );
};

export default Index;
