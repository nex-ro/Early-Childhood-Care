import React, { useState, useEffect } from 'react';
import '../../../css/admin-Dashboard.css';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { Link, Head, router } from "@inertiajs/react";
import Swal from 'sweetalert2';
import icon from '../../../../storage/app/public/icon/default.jpg';

export default function Dashboard({ auth, instansi }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [editData, setEditData] = useState(null);

  console.log(instansi);
  const data = instansi[0];

  useEffect(() => {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');

    const openSideMenu = () => {
      sideMenu.style.display = 'block';
    };

    const closeSideMenu = () => {
      sideMenu.style.display = 'none';
    };

    menuBtn.addEventListener('click', openSideMenu);
    closeBtn.addEventListener('click', closeSideMenu);

    // Cleanup event listeners on component unmount
    return () => {
      menuBtn.removeEventListener('click', openSideMenu);
      closeBtn.removeEventListener('click', closeSideMenu);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode-variables');
  };

  const openModal = (data) => {
    setEditData(data); // Set data for editing
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null); // Clear data when closing modal
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitt = (e) => {
    e.preventDefault();
    console.log(data)
    // Create FormData to send file with the request
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', data.id);

    // Send a POST request with the FormData
    router.post(route('operator.storeData', data.id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        setIsModalOpen(false); // Close the modal on success
        Swal.fire({
          icon: 'success',
          title: 'File uploaded successfully',
          text: 'Your file has been successfully uploaded.',
          confirmButtonText: 'OK'
        });
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error uploading your file.',
          confirmButtonText: 'OK'
        });
        console.error('Error uploading file:', error);
      }
    });
  };

  const deleteUser = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('operator.deleteData', data.id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was an error deleting your file.',
            'error'
          );
          console.error('Error deleting file:', error);
        });
      }
    });
  };

  return (
    <div className="kotak">
      <aside>
        <div className="toggle">
          <div className="logo">
            <img src="images/logo.png" alt="Logo" />
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
            <i className="zmdi zmdi-folder zmdi-lg"></i>
            <h3>Kelolah dokument</h3>
          </Link>
          <Link href={route('logout')} method="post">
            <i className="zmdi zmdi-run zmdi-lg"></i>
            <h3>Logout</h3>
          </Link>
        </div>
      </aside>
      <main>
        <h1></h1>
        <div className="recent-orders tbl-Full">
          <h2>Kelolah Dokument</h2>
          <div>
            <table className="shadowBoxOnly table border border-gray-300 border-collapse w-full">
              {/* head */}
              <thead>
                <tr className="bg-gray-100 px-2 bg-black text-white text-center">
                  <th className="border border-black px-4 py-2">Name</th>
                  <th className="border border-black px-4 py-2">File</th>
                  <th className="border border-black px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.dokumentDaftar ? (
                  <tr>
                    <td className="border border-gray-300">File Pendaftaran</td>
                    <td className="border border-gray-300">
                      <a href={data.dokumentDaftarUrl} target="_blank" rel="noopener noreferrer">
                        <i style={{ fontSize: '3rem' }} className="zmdi zmdi-collection-pdf"></i>
                        <p>file pendaftaran</p>
                      </a>
                    </td>
                    <td className="border border-gray-300">
                      <button onClick={() => deleteUser(data)} className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-300 p-5">
                      <p>Tambahkan file yang perlu di uploud</p>
                      <button
                        onClick={openModal}
                        className="mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="button"
                      >
                        Toggle Modal
                      </button>
                    </td>
                    {/* Main modal */}
                    {isModalOpen && (
                      <div
                        id="authentication-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="border border-black fixed inset-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full"
                      >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                          {/* Modal content */}
                          <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t">
                              <h3 className="text-xl font-semibold text-gray-900">
                                Masukan File
                              </h3>
                              <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5">
                              <form onSubmit={submitt} className="space-y-4">
                                <div>
                                  <label
                                    htmlFor="file"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                  >
                                    Upload File
                                  </label>
                                  <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={handleFileChange}
                                    required
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </tr>
                )}
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
