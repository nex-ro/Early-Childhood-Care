import React, { useState, useEffect } from "react";
import "../../../css/admin-Dashboard.css";
import "../../../asset/fonts/material-icon/css/material-design-iconic-font.css";
import { Link, Head, router ,useForm } from "@inertiajs/react";
import icon from "../../../../storage/app/public/icon/default.jpg";

export default function kelolahUser({ users }) {


const { data, setData, post, errors, reset } = useForm({
    gambar: "",
    nama_instansi: "",
    alamat: "",
    Deskripsi: "",
    noHp:"",
    daerah:"",
});
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const sideMenu = document.querySelector("aside");
        const menuBtn = document.getElementById("menu-btn");
        const closeBtn = document.getElementById("close-btn");

        menuBtn.addEventListener("click", () => {
            sideMenu.style.display = "block";
        });

        closeBtn.addEventListener("click", () => {
            sideMenu.style.display = "none";
        });

        // Cleanup event listeners on component unmount
        return () => {
            menuBtn.removeEventListener("click", () => {});
            closeBtn.removeEventListener("click", () => {});
        };
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode-variables");
    };
    const onSubmit = (e) => {
        e.preventDefault();

        post(route('admin.storeInstansi'))
    }

    return (
        <div className="kotak">
            <aside>
                <div className="toggle">
                    <div className="logo">
                        <img src="images/logo.png" alt="Logo" />
                        <h2 className="logoTxt">
                            Early Childhood <span className="danger">Care</span>
                        </h2>
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
                    <Link href="#">
                        <i className="zmdi  zmdi-account zmdi-lg"></i>
                        <h3>Kelolah User</h3>
                    </Link>
                    <Link href={route('admin.kelolaInstansi')}>
                        <i className="zmdi  zmdi-folder zmdi-lg"></i>
                        <h3>Kelolah Instansi</h3>
                    </Link>
                    <Link href={route("logout")} method="post">
                        <i className="zmdi zmdi-run zmdi-lg"></i>
                        <h3>Logout</h3>
                    </Link>
                </div>
            </aside>
            <main>
                <h1>Data User</h1>
                <div className="recent-orders tbl-Full">
                    <div className="overflow-x-auto">
                        <div className=" flex justify-center">
                            <div className="kotakkk">
                              <form
                                    onSubmit={onSubmit}
                                    className=" w-xl"
                                >
                                    <h2 className="my-0">
                                        Tambah Data Instansi
                                    </h2>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className=" px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="nama"
                                            >
                                                Nama Instansi
                                            </label>
                                            <input
                                                value={data.nama_instansi}
                                                id="nama"
                                                name="nama_instansi"
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_instansi",
                                                        e.target.value
                                                    )
                                                }
                                                className="appearance-none block  bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="text"
                                            />
                                            <p className="text-red-500 text-xs italic mb-3">
                                                {errors.nama_instansi}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className=" px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="image"
                                            >
                                                Upload gambar Instansi
                                            </label>
                                            <input
                                                className="appearance-none block  bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="image"
                                                type="file"
                                                name="gambar"
                                                onChange={(e) =>
                                                    setData(
                                                        "gambar",
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                            <p className="text-red-500 text-xs italic">
                                                {errors.gambar}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="alamat"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                value={data.alamat}
                                                id="alamat"
                                                name="alamat"
                                                onChange={(e) =>
                                                    setData(
                                                        "alamat",
                                                        e.target.value
                                                    )
                                                }
                                                className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="text"
                                            />
                                            <p className="text-red-500 text-xs italic mb-3">
                                                {errors.alamat}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="daerah"
                                            >
                                                Daerah
                                            </label>
                                            <input
                                                value={data.daerah}
                                                id="daerah"
                                                name="daerah"
                                                onChange={(e) =>
                                                    setData(
                                                        "daerah",
                                                        e.target.value
                                                    )
                                                }
                                                className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="text"
                                            />
                                            <p className="text-red-500 text-xs italic mb-3">
                                                {errors.daerah}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="deskripsi"
                                            >
                                                Deskripsi
                                            </label>
                                            <textarea
                                                value={data.Deskripsi}
                                                id="deskripsi"
                                                name="Deskripsi"
                                                onChange={(e) =>
                                                    setData(
                                                        "Deskripsi",
                                                        e.target.value
                                                    )
                                                }
                                                className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="text"
                                            />
                                            <p className="text-red-500 text-xs italic mb-3">
                                                {errors.Deskripsi}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-1">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                                htmlFor="noHp"
                                            >
                                                No HP
                                            </label>
                                            <input
                                                value={data.noHp}
                                                id="noHp"
                                                name="noHp"
                                                onChange={(e) =>
                                                    setData(
                                                        "noHp",
                                                        e.target.value
                                                    )
                                                }
                                                className="appearance-none block  bg-gray-200 border border-gray-200 rounded py-3 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                type="text"
                                            />
                                            <p className="text-red-500 text-xs italic mb-3">
                                                {errors.noHp}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="bg-emerald-500 py-3 px-8 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </form>
                            </div>
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
                            <p>
                                Hey, <b>Reza</b>
                            </p>
                            <small className="text-muted">Admin</small>
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
