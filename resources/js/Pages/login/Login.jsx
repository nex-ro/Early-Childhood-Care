import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import '../../../css/login.css';
import RegisterImg from '../../../asset/images/signup-image.jpg';
import LoginImg from '../../../asset/images/signin-image.jpg'
import '../../../asset/fonts/material-icon/css/material-design-iconic-font.css'


export default function Login( ) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div className="main" >
             <Head title="Login" />

            {/* Sign in Form */}
            <section className="sign-in">
                <div className="containerItem">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={RegisterImg} alt="sign in"/></figure>
                            <a  href={route('register')} className="signup-image-link">Daftar akunnnnn</a>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form  onSubmit={submit}>
                            <div className="form-group">
                                <label htmlFor="email" className={`zmdi zmdi-account material-icons-name ${errors.email ? 'label-has-error' : ''}`}></label>
                                <input id="email" type="email" name="email" value={data.email} className="pl-5 block w-100 d-block" autoComplete="username" isFocused={true} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
                                <p className="errorTxt">{errors.email}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className={`zmdi zmdi-lock  ${errors.password ? 'label-has-error' : ''}`}></label>
                                <input  id="password" type="password" name="password" value={data.password} className="pl-5 mt-1 block w-full" autoComplete="current-password" onChange={(e) => setData('password', e.target.value)} placeholder="Password"/>
                                <p className="errorTxt">{errors.password}</p>
                            </div>

                                <div className="form-group">
                                    <input type="checkbox" id="remember-me" className="agree-term"  name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#" className="btn-google"><i className="zmdi zmdi-google"></i> Google</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

