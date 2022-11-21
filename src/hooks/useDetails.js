import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../state/postSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useDetails = () => {
 const dispatch = useDispatch();
 const { loading, error, record } = useSelector((state) => state.posts);

 const { id } = useParams();

 useEffect(() => {
  dispatch(fetchPost(id));
 }, [dispatch]);

 return { loading, error, record };
};

export default useDetails;
