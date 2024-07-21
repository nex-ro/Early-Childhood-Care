import React, { useState, useEffect } from 'react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { Link, router } from '@inertiajs/react';
import icon from '../../../../storage/app/public/icon/default.jpg';
import Swal from 'sweetalert2';
import Dropdown from '@/Components/Dropdown';
import Pagination from "@/Components/Pagination";
import logo from '../../../../storage/app/public/icon/logo.png'

export default function KelolahUser({ users, success, auth }) {
  console.log(users);
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

  const updateUserStatus = (userId, status) => {
    router.put(route('admin.updateStatus', userId), { status }, {
      onSuccess: () => {
        Swal.fire('Success', 'User status updated successfully', 'success');
      },
      onError: (error) => {
        Swal.fire('Error', 'Failed to update user status', 'error');
      }
    });
  };

  return (
    <div className="kotak">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h2 className='logoTxt'>Early Childhood <span className="danger">Care</span></h2>
          </div>
          <div className="close" id="close-btn">
            <i className="zmdi-lg zmdi-close"></i>
          </div>
        </div>
        <div className="sidebar">
          <Link href={route('admin.dashboard')}>
            <i className="zmdi zmdi-view-dashboard zmdi-lg"></i>
            <h3>Dashboard</h3>
          </Link>
          <Link href={route('admin.kelolahUser')}>
            <i className="zmdi zmdi-account zmdi-lg"></i>
            <h3>Kelolah User</h3>
          </Link>
          <Link href={route('admin.kelolaInstansi')}>
            <i className="zmdi zmdi-folder zmdi-lg"></i>
            <h3>Kelolah Instansi</h3>
          </Link>
          <Link href={route('logout')} method="post">
            <i className="zmdi zmdi-run zmdi-lg"></i>
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>
      <main>
        <h1>Data User</h1>
        <div className="recent-orders tbl-Full">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="me-2">
              <a href={route('admin.kelolahUser')} aria-current="page" className="px-8 inline-block p-4 text-black bg-gray-300 rounded-t-lg">All User</a>
            </li>
            <li className="me-2">
              <a href={route('admin.kelolahOp')} aria-current="page" className="px-8 inline-block p-4 text-black bg-gray-300 rounded-t-lg active dark:bg-black dark:text-white">Register Akun Operator</a>
            </li>
          </ul>
          <div className="">
            <table className="table divide-y divide-gray-200 border border-gray-300">
              <thead className='bg-black text-white'>
                <tr>
                  <th>No</th>
                  <th>Name Operator</th>
                  <th>Instansi</th>
                  <th>Email</th>
                  <th>No Hp</th>
                  <th>NIK</th>
                  <th>Surat Tugas</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.data.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center p-4">Data belum ada</td>
                  </tr>
                ) : (
                  users.data.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.id_instansi}</td>
                      <td>{user.email}</td>
                      <td>{user.noHp}</td>
                      <td>{user.nik}</td>
                      <td><a href={user.surat} target='_blank'>Tes</a></td>
                      <td>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                              >
                                {user.status}
                                <svg
                                  className="ms-2 -me-0.5 h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </span>
                          </Dropdown.Trigger>
                          <Dropdown.Content className="z-99">
                            <Dropdown.Link as="button" onClick={(e) => { e.preventDefault(); updateUserStatus(user.id, 'Diterima'); }}>
                              Terima
                            </Dropdown.Link>
                            <Dropdown.Link as="button" onClick={(e) => { e.preventDefault(); updateUserStatus(user.id, 'Waiting'); }}>
                              Waiting
                            </Dropdown.Link>
                            <Dropdown.Link as="button" onClick={(e) => { e.preventDefault(); updateUserStatus(user.id, 'Ditolak'); }}>
                              Tolak
                            </Dropdown.Link>
                          </Dropdown.Content>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="text-center">
              <Pagination links={users.meta.links} />
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
              <p>Hey, <b>{auth.user.name}</b></p>
              <small className="text-muted">{auth.user.role}</small>
            </div>
            <div className="profile-photo">
              <img src={icon} alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
