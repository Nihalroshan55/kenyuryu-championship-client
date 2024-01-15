import { Link } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import useColorMode from '../../hooks/useColorMode';
import { Verifyemail } from '../../components/verifyemail';
import { axiosInstance, axiosInstanceNoToken } from '../../axios/config';
import toast from 'react-hot-toast';
interface FormData {
  name: string;
  password: string;
  email: string;
  coach_name: string;
  phone: string;
}

const SignUp = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [verifymailcomponent, setverifymailcomponent] = useState(false);
  useEffect(() => {
    if (typeof setColorMode === 'function') {
      setColorMode('dark');
    }
  }, []);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    email: '',
    coach_name: '',
    phone: '',
  });
  const [collectedOtp, setcollectedOtp] = useState();
  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
    // Check if passwords match when password changes
    setPasswordsMatch(event.target.value === retypePassword);
  };

  const handleRetypePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRetypePassword(event.target.value);
    // Check if passwords match when retype password changes
    setPasswordsMatch(event.target.value === password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    const coach_name = form.elements.namedItem(
      'coach_name',
    ) as HTMLInputElement;

    if (password.value === retypePassword) {
      setFormData({
        name: name.value,
        password: password.value,
        email: email.value,
        coach_name: coach_name.value,
        phone: phone.value,
      });
      try {
        // Make a POST request using Axios
        const { data }: any = await axiosInstanceNoToken.post(
          '/api/clubs/otpcreate/',
          { email: email.value, password: password.value },
        );

        setcollectedOtp(data.otp);

        // Handle the response accordingly
        setverifymailcomponent(true);
      } catch (error: any) {
        // Handle errors
        if (error.response.data.error == 'Active Club found in gven Email Id') {

          toast.error('Already have an account with this email Please login', {
            position: 'top-center',
          });
        }
        console.error('Error submitting form:', error);
      }

      // Your form submission logic here
    } else {
      setPasswordsMatch(false);
    }
  };
  const handleRegister = async (otp: number): Promise<boolean> => {


    if (collectedOtp == otp) {
      try {
        // Make a POST request using Axios
        const { data }: any = await axiosInstanceNoToken.post(
          '/api/clubs/',
          formData,
        );
       
        localStorage.setItem('user', JSON.stringify(data));

        return true;
      } catch (error: any) {
        // Handle errors

        console.error('Error submitting form:', error);
        toast.error(error.response, {
          position: 'top-center',
        });
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <div className=" bg-black  h-screen  flex flex-col justify-center  rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="flex justify-center items-center  ">
              <img
                src="\static\images\kumite-poster-removebg-preview.png"
                alt=""
              />
            </div>
          </div>
          <div className=" h-49  sm:hidden">.</div>
          <div className="w-full  border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2  ">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              {verifymailcomponent == false ? (
                <>
                  <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                    Sign Up to Register
                  </h2>
                </>
              ) : (
                <></>
              )}
              {verifymailcomponent ? (
                <Verifyemail register={handleRegister} email={formData.email} />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Club Name
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Enter your Club name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Name
                    </label>
                    <div className="relative">
                      <input
                        required
                        name="coach_name"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                              fill=""
                            />
                            <path
                              d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />

                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        required
                        name="phone"
                        type="text"
                        placeholder="Enter your phone"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />
                      <span className="absolute right-4 top-4">
                        {/* Password icon */}
                      </span>
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        required
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />
                      <span className="absolute right-4 top-4">
                        {/* Password icon */}
                      </span>
                    </div>
                  </div>

                  {/* Retype password input */}
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Re-type Password
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        placeholder="Re-enter your password"
                        value={retypePassword}
                        onChange={handleRetypePasswordChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-red-700 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-red-700"
                      />
                      <span className="absolute right-4 top-4">
                        {/* Retype password icon */}
                      </span>
                    </div>
                    {!passwordsMatch && (
                      <p className="text-red-700 mt-2">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <div className="mb-5">
                    <input
                      required
                      type="submit"
                      value="Create account"
                      className="w-full cursor-pointer rounded-lg border border-red-700 bg-red-700 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Already have an account?{' '}
                      <Link to="/auth/signin" className="text-red-700">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
