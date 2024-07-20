import React, { useState, useEffect } from 'react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { Link, Head ,router} from '@inertiajs/react';
import icon from '../../../../storage/app/public/icon/default.jpg'
import TextAreaInput from "@/Components/Modal";



export default function Dashboard({datas}) {
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

  const deleteUser = (data) => {
    if(!window.confirm("Are you sure want to delete this project?")){
        return;
    }
    router.delete(route('admin.destroyInstansi', data.id));
}


  return (
    <div className="kotak">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src={icon} alt="Logo"/>
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
          <Link href="kelolahUser">
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
        <h1>Data Instansi</h1>
        <div className="recent-orders tbl-Full">
          <div className="flex flex-row justify-between ">
          <h2 className='my-3'>Recent Orders</h2>
          <Link href={route('admin.inputInstansi')}  className="margin1x1 bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-3">
                        Tambah Data Instansi
        </Link>
          </div>
          <div className="overflow-x-auto">
  <table className="table" >
    {/* head */}
    <thead>
      <tr   >
        <th>No</th>
        <th>Image</th>
        <th>Nama Instansi</th>
        <th>NoHp</th>
        <th>Rating</th>
        <th>Update At</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* table */}
      {datas.data.map((data) => (
        <tr key={data.id}>
        <td>{data.id}</td>
        <td className=''><img
        className='m-auto'
                src={data.gambar}
                style={{ width: 60 }} />
        </td>
        <td>{data.nama_instansi}</td>
        <td>{data.noHp}</td>
        <td>{data.rating/data.jmlhReviewer? data.rating/data.jmlhReviewer:"not rated yet"}</td>
        <td>{data.updated_at}</td>
        <td className="px-3 py-2 text-nowrap flex flex-column justify-center">
        <Link href={route('user.detail',{id:data.id})} className="font-medium text-green-600 dark:text-green-500 hover:underline mx-1 ">
             Detail
        </Link>
        <Link href={route('admin.edit',{ id: data.id })}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1 px-2">
             Edit
        </Link>
        <button onClick={(e) => deleteUser(data)}className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1">
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
              <img src={icon}  alt="Profile"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
