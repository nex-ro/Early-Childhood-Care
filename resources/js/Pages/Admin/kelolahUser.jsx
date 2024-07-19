import React, { useState, useEffect } from 'react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { Link, Head ,router} from '@inertiajs/react';
import icon from '../../../../storage/app/public/icon/default.jpg'

export default function kelolahUser({users}) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');

    menuBtn.addEventListener('click', () => {
      sideMenu.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
      sideMenu.style.display = 'none';
    });


    // Cleanup event listeners on component unmount
    return () => {
      menuBtn.removeEventListener('click', () => {});
      closeBtn.removeEventListener('click', () => {});
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode-variables');
  };

  const deleteUser = (user) => {
    if(!window.confirm("Are you sure want to delete this project?")){
        return;
    }
    router.delete(route('admin.destroyUser', user.id));
}
  return (
    <div className="kotak">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src="images/logo.png" alt="Logo"/>
            <h2 className='logoTxt'>Early Childhood <span className="danger">Care</span></h2>
          </div>
          <div className="close" id="close-btn">
            <i className="zmdi-lg zmdi-close"></i>
          </div>
        </div>
        <div className="sidebar">
          <Link href="/admin">
            <i className="zmdi zmdi-view-dashboard zmdi-lg"></i>
            <h3>Dashboard</h3>
          </Link>
          <Link href="#">
            <i className="zmdi  zmdi-account zmdi-lg"></i>
            <h3>Kelolah User</h3>
          </Link>
          <Link href="kelolahInstansi">
                <i className="zmdi  zmdi-folder zmdi-lg"></i>
            <h3>Kelolah Instansi</h3>
          </Link>
          <Link href={route('logout')} method="post" >
            <i className="zmdi zmdi-run zmdi-lg"></i>
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>
      <main>
        <h1>Data User</h1>
        <div className="recent-orders tbl-Full">
          <h2>Recent Orders</h2>
          <div className="overflow-x-auto">
  <table className="table" >
    {/* head */}
    <thead>
      <tr   >
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>role</th>
        <th>Create at</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody>
      {/* table */}
      {users.data.map((user) => (
        <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.created_at}</td>
        <td>
        <button onClick={(e) => deleteUser(user)}className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1">
            Delete
        </button>
        </td>

      </tr>

        ))}


    </tbody>
  </table>
</div>
        </div>
      </main>
      <div className="right-section">
        <div className="nav">
          <button id="menu-btn">
            <i className="zmdi zmdi-menu zmdi-lg"></i>
          </button>
          <div className="dark-mode" onClick={toggleDarkMode}>
            {darkMode ? (
                <i className="zmdi zmdi-sun zmdi-med"></i>

            ) : (
              <i className="zmdi zmdi-brightness-3 zmdi-med"></i>
            )}
          </div>
          <div className="profile">
            <div className="info">
              <p>Hey, <b>Reza</b></p>
              <small className="text-muted">Admin</small>
            </div>
            <div className="profile-photo">
              <img src={icon} alt="Profile"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
