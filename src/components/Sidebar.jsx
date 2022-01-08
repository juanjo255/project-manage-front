import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';
import logo from 'media/beakerLogo.png'


const SidebarLinks = () => {
  const [click, setClick] = useState(true)
  return (
    <ul className='mt-12' onClick={()=>setClick(!click)}>
      <SidebarRoute to='' title='Home' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRATOR']}>
        <SidebarRoute to='/usuarios' title='Users' icon='fas fa-user-friends' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Projects' icon='fas fa-tasks' />
      <PrivateComponent roleList={['ADMINISTRATOR', 'LEADER']}>
        <SidebarRoute to='/inscripciones' title='Inscriptions Approval' icon='fas fa-scroll' />
      </PrivateComponent>
      <SidebarRoute to='/perfil' title='Profile' icon='fas fa-user' />
      
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route'>
        <div className='flex items-center text-red-600'>
          <i className='fas fa-sign-out-alt' />
          <span className='font-bold text-black text-sm  ml-2'>Log out</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className=' w-full flex justify-around  '>
      <img src={logo} alt='Logo' className='w-20 mt-5' />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen absolute md:static md:border-black md:border-solid md:border-r-4'>
    {/* Sidebar starts */}
    <div className='sidebar acordion hidden md:flex'>
      <div className='flex flex-col' >
        <Logo />
        <SidebarLinks />
      </div>
    </div>
    <div className='flex md:hidden w-full justify-between bg-black p-2 text-white rounded-r-sm '>
      <button type='button' onClick={() => setOpen(!open)}>
        <i className={`${open ? ('fas fa-times') : ('fas fa-bars')} cursor-pointer`}/>
      </button>
    </div>
    {open && <ResponsiveSidebar setOpen={setOpen} />}
    {/* Sidebar ends */}
  </div>
);
};

const ResponsiveSidebar = ({setOpen}) => {
  return (
      <div
        className= {`h-screen md:hidden acordion overflow-auto rounded-r-sm`}
        id='mobile-nav'
        onClick={()=>setOpen(false)}
        >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => isActive ? 
          ('sidebar-route border-t-2 border-b-2 font-extrabold border-white text-white')
          : ('sidebar-route font-bold text-gray-900 hover:text-black hover:bg-blue-700')
        }>
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
