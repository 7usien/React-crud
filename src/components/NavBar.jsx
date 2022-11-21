import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
 return (
  <>
   <ul className='nav'>
    <li>
     <NavLink to='/' end>
      Home
     </NavLink>
    </li>
    <li>
     <NavLink to='post/add'>add</NavLink>
    </li>
    <li className='login'>login</li>
   </ul>
  </>
 );
};

export default Navbar;
