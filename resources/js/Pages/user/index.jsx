import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import image from "../../../../storage/app/public/no-image.png";
import Pagination from "@/Components/Pagination";
import "../../../css/homepage.css";
import User_header from "@/Components/User_header";
import User_footer from "@/Components/User_footer";
import MainHeader from "@/Components/MainHeader";

import "../../../asset/fonts/material-icon/css/material-design-iconic-font.css";

const Homepage = ({ auth, datas, queryParams = null, pendaftaran }) => {
    // Initialize queryParams
    console.log(pendaftaran);

    queryParams = queryParams || {};
    // Update query parameters and fetch results
    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("home"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChange(name, e.target.value);
    };

    const [activeTab, setActiveTab] = useState("name");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const generateStars = (rating, jmlhReviewer) => {
        const newStars = [];
        const roundedRating = Math.round(rating / jmlhReviewer);

        if (!rating / jmlhReviewer) {
            newStars.push(
                <i style={{ fontSize: "1rem" }} key="not-rated">
                    Not rated yet
                </i>
            );
        } else {
            for (let i = 1; i <= 5; i++) {
                newStars.push(
                    <i
                        style={{
                            fontSize: "24px",
                            color: i <= roundedRating ? "gold" : "grey",
                        }}
                        key={i}
                        className={`zmdi ${
                            i <= roundedRating
                                ? "zmdi-star"
                                : "zmdi-star-outline"
                        }`}
                    ></i>
                );
            }
            newStars.push(
                <p className="ml-3" style={{ fontSize: "1rem" }}>
                    {(rating / jmlhReviewer).toFixed(2)}
                </p>
            );
        }

        return newStars;
    };

    const cekGambar = (gambar) => {
        return gambar ? gambar : image;
    };

    const dataArray = Array.isArray(datas) ? datas : datas?.data || [];

    const uniqueDaerah = new Set();
    const filteredData = dataArray.filter((item) => {
        if (uniqueDaerah.has(item.daerah)) {
            return false;
        }
        uniqueDaerah.add(item.daerah);
        return true;
    });

    return (
        <div className="bg-gray-100 font-sans">
            <MainHeader></MainHeader>
            <div className="backgroundaja"></div>
            <div className="tes">
                <User_header auth={auth} />
                <h1 className="text-center text-white my-8 text-3xl font-bold">
                    "Tumbuh Kembang Optimal, Masa Depan Gemilang"
                </h1>
                <div className="shadowBox container containerBSR mx-auto max-w-xl p-8 bg-white shadow-lg rounded-lg">
                    <div className="tabs flex justify-center">
                        <div
                            className={`tab ${
                                activeTab === "name"
                                    ? "active mx-4 py-2 px-4 cursor-pointer text-blue-600 border-b-2 border-blue-600"
                                    : "mx-4 py-2 px-4 cursor-pointer text-gray-600"
                            }`}
                            onClick={() => handleTabClick("name")}
                            data-tab="name"
                        >
                            Cari Sekolah Impian Anda
                        </div>
                    </div>
                    <div
                        id="name"
                        className={`tab-content ${
                            activeTab === "name" ? "active" : "hidden"
                        }`}
                    >
                        <div className="form-group mb-4">
                            <label
                                htmlFor="name-input"
                                className="block text-gray-700"
                            >
                                Nama:
                            </label>
                            <input
                                defaultValue={queryParams.name}
                                name="nama"
                                type="text"
                                id="name-input"
                                onBlur={(e) =>
                                    searchFieldChange("name", e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress("name", e)}
                                className="form-control mt-1 block w-full p-2 border rounded"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="form-group mb-4 flex flex-wrap -mx-2">
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="daerah-select"
                                    className="block text-gray-700"
                                >
                                    Daerah:
                                </label>
                                <select
                                    defaultValue={queryParams.daerah}
                                    name="daerah"
                                    id="daerah-select"
                                    onChange={(e) =>
                                        searchFieldChange(
                                            "daerah",
                                            e.target.value
                                        )
                                    }
                                    className="form-control mt-1 block w-full p-2 border rounded"
                                >
                                    <option selected>pilih daerah</option>
                                    {filteredData.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.daerah}
                                        >
                                            {item.daerah}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 px-2">
                                <label
                                    htmlFor="rating-select"
                                    className="block text-gray-700"
                                >
                                    Rating:
                                </label>
                                <select
                                    defaultValue={queryParams.rating}
                                    name="rating"
                                    id="rating-select"
                                    onChange={(e) =>
                                        searchFieldChange(
                                            "rating",
                                            e.target.value
                                        )
                                    }
                                    className="form-control mt-1 block w-full p-2 border rounded"
                                >
                                    <option selected>pilih rating</option>
                                    <option value="0">not rated yet</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <button
                                onClick={() =>
                                    searchFieldChange("submit", true)
                                }
                                className="btn bg-blue-500 text-white py-2 px-4 w-full rounded cursor-pointer"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {pendaftaran ? pendaftaran.length > 0 ? (
    <div className="w-full flex justify-center">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nama Sekolah</th>
                        <th scope="col" className="px-6 py-3">Tanggal Mendaftar</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pendaftaran.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {item.nama}
                            </th>
                            <td className="px-6 py-4">{item.created_at}</td>
                            <td className="px-6 py-4">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
) : "" : ""}

            <div className="container mx-auto my-8 p-1">
                <h1 className="mb-2 cardTtl text-left text-lg font-semibold mb-4">
                    Sekolah unggulan
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dataArray.map((data) => (
                        <div className="col mb-4 kartu" key={data.id}>
                            <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={cekGambar(data.gambar)}
                                    className="card-img-top w-full h-48 object-cover"
                                    alt={data.nama_instansi || "Image"}
                                />
                                <div className="card-body p-4">
                                    <h5 className="card-title text-xl font-semibold">
                                        {data.nama_instansi}
                                    </h5>
                                    <div className="bintang flex flex-column mb-2">
                                        {generateStars(
                                            data.rating,
                                            data.jmlhReviewer
                                        )}
                                    </div>
                                    <p className="card-text text-gray-700 mb-4">
                                        {data.Deskripsi}
                                    </p>
                                    <Link
                                        href={route("user.detail", data.id)}
                                        className="btn bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination links={datas.meta.links} />
            </div>
            <User_footer />
        </div>
    );
};

export default Homepage;
