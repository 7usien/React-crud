import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
//compo
import Loading from '../components/Loading';
import useDetails from '../hooks/useDetails';
import { editPost } from '../state/postSlice';
import WithGurad from './../utils/WithGurad';
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

const Edit = () => {
 const { loading: loadingData, error: errorData, record } = useDetails();
 console.log(record);
 const formik = useFormik({
  initialValues: {
   title: record ? record?.title : '',
   desc: record ? record?.desc : '',

   onSubmit: (values) => {
    dispatch(
     editPost({
      ...values,
      id: record.id,
     })
    )
     .unwrap()
     .then(() => {
      naviagte('/');
     });
   },
   validationSchema: formSchema,
   enableReinitialize: true,
  },
 });

 const dispatch = useDispatch();
 const naviagte = useNavigate();

 return (
  <div>
   <Loading loading={loadingData} error={errorData}>
    <Form onSubmit={formik.handleSubmit}>
     <Form.Group className='mb-3'>
      <Form.Label>title</Form.Label>
      <Form.Control
       type='text'
       placeholder='Enter title'
       onChange={formik.handleChange}
       name='title'
       value={formik.values.title}
       isValid={!!formik.errors.title}
      />
      <Form.Control.Feedback type='invalid'>
       {formik.errors.title}
      </Form.Control.Feedback>
     </Form.Group>

     <Form.Group className='mb-3'>
      <Form.Label>desc</Form.Label>
      <Form.Control
       as='textarea'
       value={formik.values.desc}
       onChange={formik.handleChange}
       name='desc'
       isValid={!!formik.errors.desc}
      />
      <Form.Control.Feedback type='invalid'>
       {formik.errors.desc}
      </Form.Control.Feedback>
     </Form.Group>

     <Button variant='primary' type='submit'>
      submit
     </Button>
    </Form>
   </Loading>
  </div>
 );
};

export default WithGurad(Edit);
