import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
// import icon from '/storage/app/public/icon/default.png'
import icon from '../../../../storage/app/public/icon/default.jpg'


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

    const Orders = [
      { productName: 'Course 1', productNumber: '123', paymentStatus: 'Paid', status: 'Pending' },
      { productName: 'Course 2', productNumber: '124', paymentStatus: 'Unpaid', status: 'Declined' },
      { productName: 'Course 3', productNumber: '125', paymentStatus: 'Paid', status: 'Completed' },
    ];

    Orders.forEach(order => {
      const tr = document.createElement('tr');
      const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
      `;
      tr.innerHTML = trContent;
      document.querySelector('table tbody').appendChild(tr);
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
                <h3>Total Sales</h3>
                <h1>$65,024</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>+81%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="visits">
            <div className="status">
              <div className="info">
                <h3>Site Visit</h3>
                <h1>24,981</h1>
              </div>
              <div className="progresss">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="percentage">
                  <p>-48%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="searches">
            <div className="status">
              <div className="info">
                <h3>Searches</h3>
                <h1>14,147</h1>
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
              <img src="images/profile-2.jpg" alt="User"/>
              <h2>Jack</h2>
              <p>54 Min Ago</p>
            </div>
            <div className="user">
              <img src="images/profile-3.jpg" alt="User"/>
              <h2>Amir</h2>
              <p>3 Hours Ago</p>
            </div>
            <div className="user">
              <img src="images/profile-4.jpg" alt="User"/>
              <h2>Ember</h2>
              <p>6 Hours Ago</p>
            </div>
            <div className="user">
              <img src="images/plus.png" alt="User"/>
              <h2>More</h2>
              <p>New User</p>
            </div>
          </div>
        </div>
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Number</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
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
            <img src="images/logo.png" alt="Logo"/>
            <h2>AsmrProg</h2>
            <p>Fullstack Web Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
