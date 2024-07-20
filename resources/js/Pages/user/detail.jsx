import User_header from '@/Components/User_header';
import User_footer from '@/Components/User_footer';
import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import "../../../asset/fonts/material-icon/css/material-design-iconic-font.css";
import { Inertia } from '@inertiajs/inertia'; // Ensure you import Inertia

export default function Detail({ auth, datas, dataKomentar }) {
    const instansi = datas['data'];

    // Generate star rating
    const generateStars = (rating, jmlhReviewer) => {
        const newStars = [];
        const roundedRating = Math.round(rating / jmlhReviewer);
        if (!rating / jmlhReviewer) {
            newStars.push(<i style={{ fontSize: "1rem" }} key="not-rated">Not rated yet</i>);
        } else {
            for (let i = 1; i <= 5; i++) {
                newStars.push(
                    <i
                        style={{
                            fontSize: "24px",
                            color: i <= roundedRating ? "gold" : "grey"
                        }}
                        key={i}
                        className={`zmdi ${i <= roundedRating ? "zmdi-star" : "zmdi-star-outline"}`}
                    ></i>
                );
            }
            newStars.push(<i style={{ fontSize: "1rem" }}>{rating / jmlhReviewer}</i>);
        }
        return newStars;
    };

    // State for rating and comment
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({ rating: false, comment: false });

    // Handle star rating click
    const handleStarClick = (index) => {
        setRating(index + 1);
        setErrors(prev => ({ ...prev, rating: false }));
    };

    // Handle comment change
    const handleCommentChange = (e) => {
        setComment(e.target.value);
        setErrors(prev => ({ ...prev, comment: false }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;

        if (!auth.user) {
            Inertia.visit(route('login')); // Redirect to login if user is not authenticated
            return; // Exit the function early
        }

        if (rating === 0) {
            setErrors(prev => ({ ...prev, rating: true }));
            hasError = true;
        }
        if (comment.trim() === '') {
            setErrors(prev => ({ ...prev, comment: true }));
            hasError = true;
        }
        if (!hasError) {
            Inertia.post(route('user.komenPost'), { id: instansi.id, userId: auth.user.id, rating, comment });
        }
    };

    // Star component
    const Star = ({ filled, onClick }) => (
        <span onClick={onClick} style={{ cursor: 'pointer', color: filled ? 'gold' : 'gray', fontSize: "30px" }}>
            &#9733;
        </span>
    );

    // Manage dropdown visibility
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Handle click outside dropdown
    const handleClickOutside = (event) => {
        if (activeDropdown && !event.target.closest('.dropdown-menu')) {
            setActiveDropdown(null);
        }
    };



    // Delete comment
    const deletekomen = (id) => {
        if (!window.confirm("Apakah anda yakin ingin menghapus komentar ini?")) {
            return;
        }
        router.delete(route("user.destroyKoment", id));
    };

    return (
        <div className='bg-gray-100'>
            <User_header auth={auth} />
            <div className="bg-gray-100 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href={route("homepage")}>
                        <i style={{ fontSize: "30px" }} className="p-2 zmdi zmdi-arrow-left"></i>
                    </Link>
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                <img className="w-full h-full object-cover" src={instansi.gambar} alt="Product Image" />
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">{instansi.nama_instansi}</h2>
                            <p className="text-gray-600 text-sm mb-2">
                                {generateStars(instansi.rating, instansi.jmlhReviewer)}
                            </p>
                            <div className="flex">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Daerah&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                                    <span className="text-gray-600">{instansi.daerah}</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Alamat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                                    <span className="text-gray-600">{instansi.alamat}</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">No Hp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                                    <span className="text-gray-600">{instansi.noHp}</span>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Terdaftar</span>
                                    <span className="text-gray-600">{instansi.noHp}</span>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Deskripsi Instansi:</span>
                                <p className="text-gray-600 text-sm mt-2" style={{ height: "100px" }}>
                                    {instansi.Deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Comment section */}
            <section className="bg-grey-1 py-8 lg:py-16 antialiased">
                <div className="max-w-2xl lg:mx-28 md:mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Discussion ({dataKomentar.total})</h2>
                    </div>
                    <form className="mb-6" onSubmit={handleSubmit}>
                        <div>
                            {errors.rating && <p className="text-red-500 text-xs italic">Rating is required</p>}
                            <div>
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Star
                                            key={index}
                                            filled={index < rating}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                            </div>
                        </div>
                        {errors.comment && <p className="text-red-500 text-xs italic">Comment is required</p>}
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-600">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows="6"
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                placeholder="Write a comment..." value={comment} onChange={handleCommentChange} required></textarea>
                        </div>
                        <button type="submit"
                            className="bg-black inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                            Post comment
                        </button>
                    </form>
                    {dataKomentar.data.map((komentar) => (
                        <article key={komentar.id} className="p-6 text-base bg-grey-1 rounded-lg border-t-2">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                                        <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={komentar.user_gambar}
                                            alt="Profile"
                                        />
                                        {komentar.user_nama}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
                                            {komentar.created_at}
                                        </time>
                                    </p>
                                </div>
                                {auth.user && auth.user.role === 'admin' && (
                                    <button
                                        id={`dropdownComment${komentar.id}Button`}
                                        onClick={() => toggleDropdown(komentar.id)}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-grey-1 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                        type="button"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                        >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>
                                )}
                                {/* Dropdown menu */}
                                <div
                                    id={`dropdownComment${komentar.id}`}
                                    className={`z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow ${activeDropdown === komentar.id ? "" : "hidden"}`}
                                >
                                    <ul className="py-1 text-sm text-gray-700">
                                        <li>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    deletekomen(komentar.id);
                                                }}
                                                className="block py-2 px-4 hover:bg-gray-100"
                                            >
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </footer>
                            <p className="text-gray-500">
                                {komentar.komentar}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
            <User_footer />
        </div>
    );
}
