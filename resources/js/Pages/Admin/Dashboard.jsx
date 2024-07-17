import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <div className="">
            ini admin
            <hr />
            <Link href={route('logout')} method="post" as="button">
                Log Out
            </Link>
        </div>

    );
}
