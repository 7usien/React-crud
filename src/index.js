import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import { Errorpage } from './pages/Errorpage';
import { PostsList } from './components/PostsList';

import { Provider } from 'react-redux';
import store from './state';
import Index from './pages/Index';
import App from './App';

//splice code or lazy loading
const Add = React.lazy(() => import('./pages/Add'));
const Details = React.lazy(() => import('./pages/Details'));
const Edit = React.lazy(() => import('./pages/Edit'));

const paramsHandler = ({ params }) => {
 if (isNaN(params.id)) {
  throw new Response('Bad Request', {
   statusText: 'please enter integer ID',
   status: 400,
  });
 }
};

const router = createBrowserRouter([
 {
  path: '/',
  element: <RootLayout />,
  errorElement: <Errorpage />,
  children: [
   {
    index: true,
    element: <Index />,
   },
   {
    path: 'post/',
    element: <PostsList />,
   },

   {
    path: 'post/add',
    element: (
     <Suspense fallback={<div>wait loading ...</div>}>
      <Add />
     </Suspense>
    ),
   },
   {
    path: 'post/:id/edit',
    loader: paramsHandler,
    element: (
     <Suspense fallback={<div>wait loading ...</div>}>
      <Edit />
     </Suspense>
    ),
   },
   {
    path: 'post/:id',
    loader: paramsHandler,
    element: (
     <Suspense fallback={<div>wait loading ...</div>}>
      <Details />
     </Suspense>
    ),
   },
  ],
 },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
  <RouterProvider router={router}>
   <App />
  </RouterProvider>
 </Provider>
);
