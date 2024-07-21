import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    gambar,
}) {
    const { auth } = usePage().props;
    const user = auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            noHp: user.noHp,
            gambar: user.gambar,
        });
    console.log(data);

    const submit = (e) => {
        e.preventDefault();

        // Create a FormData object
        const formData = new FormData();

        // Append each form field to the FormData object
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("noHp", data.noHp);
        if (data.gambar) {
            // Check if a file is selected
            formData.append("gambar", data.gambar);
        }

        // Send the request with FormData
        patch(route("profile.update"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <section className={className}>
            <header>
                {/* Ensure gambar is used correctly */}
                <img
                    className="rounded-full w-40 h-40"
                    src={`storage/${user.gambar}`}
                    alt="Profile Image"
                />
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="noHp" value="Phone Number" />
                    <TextInput
                        id="noHp"
                        className="mt-1 block w-full"
                        value={data.noHp}
                        onChange={(e) => setData("noHp", e.target.value)}
                        required
                        isFocused
                        autoComplete="noHp"
                    />
                    <InputError className="mt-2" message={errors.noHp} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="gambar" value="Profile Image" />
                    <input
                        id="gambar"
                        type="file"
                        name="gambar"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setData("gambar", file); // Update data with the selected file
                        }}
                    />
                    <InputError className="mt-2" message={errors.gambar} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
