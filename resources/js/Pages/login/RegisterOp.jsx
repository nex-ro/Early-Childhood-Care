import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/login.css';
import LoginImg from '../../../asset/images/sekolah.png';
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css';
import { useEffect } from 'react';
import bg from '../../../asset/images/lgn.jpg';
import MainHeader from '@/Components/MainHeader';

export default function Register({ datas }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        noHp: '',
        nik: '',
        surat: '',
        instansi: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log(data); // Debugging: log form data to the console
        post(route('postregisterOp'));
    };

    return (
        <div className="main" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <MainHeader></MainHeader>
            <section className="signup">
                <div className="containerItem">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 style={{ fontSize: "30px" }} className="form-title">Daftar Operator</h2>
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label htmlFor="name"><i className={`zmdi zmdi-account material-icons-name ${errors.name ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' id="name" name="name" value={data.name} autoComplete="name" isFocused={true} onChange={(e) => setData('name', e.target.value)} required placeholder="Nama Operator" />
                                    <p className="errorTxt">{errors.name}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className={`zmdi zmdi-email ${errors.email ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="email" name="email" id="email" value={data.email} autoComplete="username" onChange={(e) => setData('email', e.target.value)} required placeholder="Email Operator" />
                                    <p className="errorTxt">{errors.email}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noHp"><i className={`zmdi zmdi-phone ${errors.noHp ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="number" name="noHp" id="noHp" value={data.noHp} autoComplete="" onChange={(e) => setData('noHp', e.target.value)} required placeholder="No Hp Operator" />
                                    <p className="errorTxt">{errors.noHp}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nik"><i className={`zmdi zmdi-file ${errors.noHp ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="text" name="nik" id="nik" value={data.nik} autoComplete="" onChange={(e) => setData('nik', e.target.value)} required placeholder="NIK" />
                                    <p className="errorTxt">{errors.nik}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="instansi"><i className={`zmdi zmdi-store-24 ${errors.instansi ? 'label-has-error' : ''}`}></i></label>
                                    <select
                                        name="instansi"
                                        id="instansi"
                                        value={data.instansi}
                                        onChange={(e) => setData('instansi', e.target.value)}
                                        className="pl-5 mt-1 block w-full"
                                    >
                                        <option value="" selected>Pilih instansi anda</option>
                                        {datas.data.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.nama_instansi}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="errorTxt">{errors.instansi}</p>
                                </div>
                                <div className="form-group">
                                    <h1 htmlFor="surat">Surat Tugas</h1>
                                    <input className='mt-1 block w-full' type="file" name="surat" id="surat" autoComplete="" onChange={(e) => setData('surat', e.target.files[0])} required placeholder="Surat Tugas" />
                                    <p className="errorTxt">{errors.surat}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className={`zmdi zmdi-lock ${errors.password ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="password" name="password" id="pass" value={data.password} autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required placeholder="Password" />
                                    <p className="errorTxt">{errors.password}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re_pass"><i className={`zmdi zmdi-lock-outline ${errors.password_confirmation ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="password" id="re_pass" name="password_confirmation" value={data.password_confirmation} autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required placeholder="Repeat your password" />
                                    <p className="errorTxt">{errors.password_confirmation}</p>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of Service</a></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" disabled={processing} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={LoginImg} alt="sign up" /></figure>
                            <a href={route('login')} className="signup-image-link">Sudah memiliki Akun</a>
                            <a href={route('register')} className="signup-image-link">Daftar akun user</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
