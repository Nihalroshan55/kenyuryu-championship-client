import React, {  useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react';
// import CheckboxTwo from './CheckboxTwo';
import { axiosInstance } from '../axios/config';
import toast from 'react-hot-toast';

interface YourComponentProps {
    size: any | string | undefined; // Adjust the type for size
    handleOpen: (arg: any) => void; // Adjust the type for handleOpen if needed
    getAllRegistrations: any;
}

const AddClubAdmin: React.FC<YourComponentProps> = ({ size, getAllRegistrations, handleOpen }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [invalidPassword, setinvalidPassword] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const coach_name = form.elements.namedItem('coach_name') as HTMLInputElement;
        const name = form.elements.namedItem('name') as HTMLInputElement;
        const email = form.elements.namedItem('email') as HTMLInputElement;
        const phone = form.elements.namedItem('phone') as HTMLInputElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;
        const conform_password = form.elements.namedItem('conform_password') as HTMLInputElement;
        if (password.value != conform_password.value) {
            alert('password and conform password need to be same');
        }
        else if (
            !email.value ||
            !name.value ||
            !coach_name.value ||
            !phone.value||
            !password.value||
            !conform_password.value
        ) {
            alert('please Fill All Input Fields');
        } else {
            if (buttonRef.current && !buttonRef.current.disabled) {
                buttonRef.current.disabled = true;
                try {
                    // Make a POST request using Axios
                    const { data }: any = await axiosInstance.post(
                        '/api/clubs/',
                        {
                            name: name.value,
                            email: email.value,
                            phone: phone.value,
                            coach_name: coach_name.value,
                            password:password.value
                        }, // Use password.value instead of password
                    );

                    if (data) {
                        handleOpen(null);
                        getAllRegistrations();
                    }
                } catch (error: any) {
                    console.error('Error submitting form:', error);
                    setinvalidPassword(true);
                }
            }
        }
    };

    const handleSubmitButton = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Access the form using the ref and submit it
        formRef?.current?.dispatchEvent(new Event('submit', { bubbles: true }));
    };
    // const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     // Update the state with the selected value
    //     setSelectedValue(event.target.value);
    // };
    return (
        <>
            <Dialog
                open={['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(size as string)}
                size={size || 'lg'}
                handler={handleOpen}
                className="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <DialogHeader className="text-black dark:text-white">
                    Add Player
                </DialogHeader>

                <DialogBody>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Name
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                minLength={3}
                                                placeholder="Enter club name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Email
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                min={7}
                                                max={100}
                                                name="email"
                                                placeholder="Enter club email"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                        </div>


                                    </div>

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <>
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Coach Name
                                                </label>
                                                <input
                                                    required
                                                    name="coach_name"
                                                    type="text"
                                                    min={5}
                                                    max={200}
                                                    placeholder="Enter Player weight"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            </>
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <>
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Phone
                                                </label>
                                                <input
                                                    required
                                                    name="phone"
                                                    type="phone"
                                                    min={5}
                                                    max={200}
                                                    placeholder="Enter Player weight"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            </>
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                                        <div className="w-full xl:w-1/2">
                                            <>
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Password
                                                </label>
                                                <input
                                                    required
                                                    name="password"
                                                    type="password"
                                                    min={5}
                                                    max={200}
                                                    placeholder="Enter password"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            </>
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <>
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Conform Password
                                                </label>
                                                <input
                                                    required
                                                    name="conform_password"
                                                    type="password"
                                                    min={5}
                                                    max={200}
                                                    placeholder="Enter conform password"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            </>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    {invalidPassword && (
                        <p className="text-red-700 ">You Are Entered invalid Details</p>
                    )}
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpen(null)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        ref={buttonRef}
                        variant="gradient"
                        color="green"
                        onClick={handleSubmitButton}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default AddClubAdmin;
