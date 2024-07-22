import Dropdown from '@/Components/Dropdown';
// import { Link, router ,route} from "@inertiajs/react";
import { Link, Head, router } from "@inertiajs/react";

export default function User_header({ auth }) {
    const stylee = {
        borderRadius: '0 0 20px 20px',
        whiteSpace: 'nowrap',
    };

    return (
        <nav style={stylee} className="rounded-lg shadow mx-4 bg-white">
            <div className="w-full mx-auto max-w-screen-xl p-4 no-wrap flex flex-row items-center justify-between px-16">
                <span className="text-sm text-gray-500 sm:text-center">
                    <a href={route('home')} className="hover:underline">
                        Early Childhood{" "}
                        <span className="text-red-500">Care</span>
                    </a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        {auth.user ? (
                            <>
                                {auth.user.role === "admin" ? (
                                    <Link
                                        href={route('admin.dashboard')}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route("user.profile")}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}
                            </>
                        ) : (
                            <Link
                                href={route("login")}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-1 focus:outline-none"
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
