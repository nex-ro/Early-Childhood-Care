import React, { useState, useEffect } from 'react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { Link, Head } from '@inertiajs/react';
import icon from '../../../../storage/app/public/icon/default.jpg'

export default function Dashboard({auth}) {
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

  return (
    <div className="kotak">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src="images/logo.png" alt="Logo"/>
            <h2>Asmr<span className="danger">Prog</span></h2>
          </div>
          <div className="close" id="close-btn">
            <i className="zmdi-lg zmdi-close"></i>
          </div>
        </div>
        <div className="sidebar">
          <Link href={route('operator.dashboard')}>
            <i className="zmdi zmdi-account zmdi-lg"></i>
            <h3>pendaftar</h3>
          </Link>
          <Link href={route('operator.aturFile')}>
            <i className="zmdi   zmdi-folder zmdi-lg"></i>
            <h3>Kelolah dokument</h3>
          </Link>
          <Link href={route('logout')} method="post" >
            <i className="zmdi zmdi-run zmdi-lg"></i>
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>
      <main>
        <h1>Analytics</h1>
        <div className="recent-orders tbl-Full">
          <h2>Recent Orders</h2>
          <div className="overflow-x-auto">
  <table className="table" >
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
          <a href="#">Show All</a>
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
              <p>Hey, <b>{auth.user.name}</b></p>
              <small className="text-muted">{auth.user.role}</small>
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
