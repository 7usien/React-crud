import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addPost } from '../state/postSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import WithGurad from '../utils/WithGurad';
import { useFormik } from 'formik';

import * as Yup from 'yup';

const formSchema = Yup.object().shape({
 title: Yup.string()
  .min(2, 'the latest is 2 chart plz')
  .max(50, 'the max is 50 plz')
  .required('this title is Required *'),
 desc: Yup.string()
  .min(2, 'the latest is 2 chart plz')
  .max(50, 'the max is 50 plz')
  .required('this desc is Required *'),
});

const Add = () => {
 const [post, setPost] = useState({ title: '', desc: '' });

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const { error, loading } = useSelector((state) => state.posts);
 const formik = useFormik({
  initialValues: {
   title: '',
   desc: '',
  },
  onSubmit: (values) => {
   dispatch(addPost({ ...formik.values, id: new Date().getTime() }))
    .unwrap()
    .then(() => {
     navigate('/');
    });
  },
  validationSchema: formSchema,
 });

 return (
  <>
   <Form onSubmit={formik.handleSubmit}>
    <Form.Group className='mb-3'>
     <Form.Label>title</Form.Label>
     <Form.Control
      type='text'
      onChange={formik.handleChange}
      value={formik.values.title}
      name='title'
      isValid={!!formik.errors.title}
      // casting if get value > true or false
     />
     <Form.Control.Feedback type='invalid'>
      {formik.errors.title}
     </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className='mb-3' controlId='validationFormik03'>
     <Form.Label>desc</Form.Label>
     <Form.Control
      as='textarea'
      onChange={formik.handleChange}
      value={formik.values.desc}
      name='desc'
      isValid={!!formik.errors.desc}
     />

     <Form.Control.Feedback type='invalid'>
      {formik.errors.desc}
     </Form.Control.Feedback>
    </Form.Group>

    <Loading loading={loading} error={error}>
     <Button variant='primary' type='submit'>
      add
     </Button>
    </Loading>
   </Form>
  </>
 );
};

export default WithGurad(Add);
