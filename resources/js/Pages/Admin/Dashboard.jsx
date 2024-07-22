import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
// import logo from '/storage/app/public/icon/logo'
import icon from '../../../../storage/app/public/icon/default.jpg'
import logo from '../../../../storage/app/public/icon/logo.png'
import MainHeader from '@/Components/MainHeader';


export default function Dashboard({Auth,}) {
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
        <MainHeader></MainHeader>
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src={logo} alt="Logo"/>
            <h2 className='logoTxt'>Early Childhood <span className="danger">Care</span></h2>
          </div>
          <div className="close" id="close-btn">
            <i className="zmdi-lg zmdi-close"></i>
          </div>
        </div>
        <div className="sidebar">
          <Link href="#">
            <i className="zmdi zmdi-view-dashboard zmdi-lg"></i>
            <h3>Dashboard</h3>
          </Link>
          <Link href="admin/kelolahUser">
            <i className="zmdi  zmdi-account zmdi-lg"></i>
            <h3>Kelolah User</h3>
          </Link>
          <Link href="admin/kelolahInstansi">
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
        <h1>Dashboard</h1>
        <div className="analyse">
          <div className="sales">
            <div className="status">
              <div className="info">
                <h3>Jumlah User</h3>
                <h1 style={{textAlign:"right" ,paddingRight:"30px"}}>5</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>30%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visits">
            <div className="status">
              <div className="info">
                <h3>jumlah admin</h3>
                <h1 style={{textAlign:"right" ,paddingRight:"30px"}}>1</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>10%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="searches">
            <div className="status">
              <div className="info">
                <h3>jumlah instansi </h3>
                <h1 style={{textAlign:"right" ,paddingRight:"30px"}}>3</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>+21%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new-users">
          <h2>New Users</h2>
          <div className="user-list">
            <div className="user">
              <img src={icon} alt="User"/>
              <h2>Jack</h2>
              <p>user</p>
            </div>
            <div className="user">
              <img src={icon}alt="User"/>
              <h2>bobi</h2>
              <p>user</p>
            </div>
            <div className="user">
              <img src={icon} alt="User"/>
              <h2>Deri</h2>
              <p>user</p>
            </div>
            <div className="user">
              <img src={icon} alt="User"/>
              <h2>toti</h2>
              <p>user</p>
            </div>
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
        <div className="user-profile">
          <div className="logo">
            <img className='mx-auto' src={logo} alt="Logo"/>
            <h2 className='logoTxt'>Early Childhood <span className="danger">Care</span></h2>
            <p>merupakan perusahaan yang membantu para orang tua untuk mendapatkan pendidikan yang layak di pekanbaru</p>
          </div>
        </div>
      </div>
    </div>
  );
}
