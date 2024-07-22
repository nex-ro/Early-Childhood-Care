import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/login.css';
import LoginImg from '../../../asset/images/signin-image.jpg'
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css'
import { useEffect } from 'react';
import bg from '../../../asset/images/lgn.jpg';
import MainHeader from '@/Components/MainHeader';

export default function Register( ) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        noHp : '',
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
        post(route('register'));
    };
    return (
        <div className="main" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <MainHeader></MainHeader>

            {/* Sign up form */}
            <section className="signup">
                <div className="containerItem">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form  onSubmit={submit} >
                                <div className="form-group">
                                    <label htmlFor="name"><i className={`zmdi zmdi-account material-icons-name${errors.name ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' id="name" name="name" value={data.name}  autoComplete="name" isFocused={true} onChange={(e) => setData('name', e.target.value)} required placeholder="Nama anda"/>
                                    <p className="errorTxt">{errors.name}</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"><i className={`zmdi zmdi-email ${errors.email ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="email" name="email" id="email" value={data.email} autoComplete="username" onChange={(e) => setData('email', e.target.value)} required placeholder="Email Anda"/>
                                    <p className="errorTxt">{errors.email}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="noHp"><i className={`zmdi zmdi-phone ${errors.noHp ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="number" name="noHp" id="noHp" value={data.noHp} autoComplete="" onChange={(e) => setData('noHp', e.target.value)} required placeholder="No Hp Anda"/>
                                    <p className="errorTxt">{errors.noHp}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className={`zmdi zmdi-lock ${errors.password ? 'label-has-error' : ''}`}></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="password"  name="password" id="pass" value={data.password}  autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required placeholder="Password"/>
                                    <p className="errorTxt">{errors.password}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re_pass"><i className={`zmdi zmdi-lock-outline ${errors.password_confirmation ? 'label-has-error' : ''}`} ></i></label>
                                    <input className='pl-5 mt-1 block w-full' type="password"  id="re_pass" name="password_confirmation"value={data.password_confirmation} autoComplete="new-password"  onChange={(e) => setData('password_confirmation', e.target.value)}  required placeholder="Repeat your password"/>
                                    <p className="errorTxt">{errors.password_confirmation}</p>
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a href="#" className="term-service">Terms of service</a></label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={LoginImg} alt="sign up"/></figure>
                            <a href={route('login')} className="signup-image-link">Sudah memiliki Akun</a>
                            <a href={route('registerOp')} className="signup-image-link">Daftar Akun Operator</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

