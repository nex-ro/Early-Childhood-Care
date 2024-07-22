// resources/js/Layouts/MainLayout.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import logo from '../../../storage/app/public/icon/logo.png';

export default function MainHeader() {
    return (
            <Head>
                <title>Early Childhood care </title>
                 <link rel="icon" href={logo} />
            </Head>
    );
}
