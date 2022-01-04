import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';
import researchProject from 'media/EAFITlogo.png'
import { useEffect } from 'react';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRATOR']}>
        <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user-friends' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-tasks' />
      <PrivateComponent roleList={['ADMINISTRATOR', 'LEADER']}>
        <SidebarRoute to='/inscripciones' title='Aprobacion Inscripciones' icon='fas fa-scroll' />
      </PrivateComponent>
      <SidebarRoute to='/perfil' title='Perfil' icon='fas fa-user' />
      
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
          <span className='font-bold text-black text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src={researchProject} alt='Logo' className='w-40' />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  useEffect (()=>{
    console.log("open", open);
  },[open])

  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-full absolute md:static'>
    {/* Sidebar starts */}

    <div className='sidebar acordion hidden md:flex'>
      <div className='px-8'>
        <Logo />
        <SidebarLinks />
      </div>
    </div>
    <div className='flex md:hidden w-full justify-between bg-black p-2 text-white '>
      <button type='button' onClick={() => setOpen(!open)}>
        <i className={`${open ? 'fas fa-times' : 'fas fa-bars'} cursor-pointer`}/>
      </button>
    </div>
    {open && <ResponsiveSidebar  />}
    {/* Sidebar ends */}
  </div>
);
};

const ResponsiveSidebar = (open) => {
  return (
      <div
        className= {`h-full md:hidden acordion  `}
        id='mobile-nav'>
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
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route border-t-2 border-b-2 font-extrabold border-white text-white'
            : 'sidebar-route font-bold text-gray-900 hover:text-black hover:bg-blue-700'
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
