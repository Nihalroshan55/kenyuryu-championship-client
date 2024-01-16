import React, { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import CheckboxTwo from './CheckboxTwo';
import { axiosInstance } from '../axios/config';
import toast from 'react-hot-toast';

interface YourComponentProps {
  size: any | string | undefined; // Adjust the type for size
  handleOpen: (arg: any) => void; // Adjust the type for handleOpen if needed
}

const AddStudent: React.FC<YourComponentProps> = ({ size, handleOpen }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [kata, setkata] = useState(false);
  const [kumita, setkumita] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const gender = form.elements.namedItem('gender') as HTMLInputElement;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const weightElement = form.elements.namedItem('weight') as HTMLInputElement;
    const weight = weightElement.value;
    const belt_color = form.elements.namedItem(
      'belt_color',
    ) as HTMLInputElement;
    const age = form.elements.namedItem('age') as HTMLInputElement;
    const { id } = JSON.parse(localStorage.getItem('user') as string).user;
    if (!kata && !kumita) {
      alert('please Select Atleast one Event');
    } else if (
      !gender.value ||
      !name.value ||
      !weight ||
      !belt_color.value ||
      !age.value
    ) {
      alert('please Fill All Input Fields');
    } else {
      if (buttonRef.current && !buttonRef.current.disabled) {
        buttonRef.current.disabled = true;
        try {
          // Make a POST request using Axios
          const { data }: any = await axiosInstance.post(
            '/api/candidates/',
            {
              name: name.value,
              club: id,
              gender: gender.value,
              weight: weight,
              belt_color: belt_color.value,
              age: age.value,
              kata: kata,
              kumite: kumita,
            }, // Use password.value instead of password
          );

          if (data) {
            handleOpen(null);
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
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        minLength={3}
                        placeholder="Enter Player full name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Age
                      </label>
                      <input
                        required
                        type="text"
                        min={1}
                        max={100}
                        name="age"
                        placeholder="Enter Player Age"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Gender
                      </label>
                      <select
                        required
                        name="gender"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option disabled value="">
                          Select Gender
                        </option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Belt
                      </label>
                      <select
                        required
                        name="belt_color"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option disabled selected value="">
                          Select Belt
                        </option>
                        <option value="Black Belt">black</option>
                        <option value="Colour Belt">colour</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Events
                      </label>
                      <div className="w-full flex justify-center gap-15 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                        <CheckboxTwo
                          key={1}
                          value={'Kata'}
                          setIsChecked={setkata}
                          isChecked={kata}
                        />
                        <CheckboxTwo
                          key={2}
                          value={'Kumita'}
                          setIsChecked={setkumita}
                          isChecked={kumita}
                        />
                      </div>
                    </div>
                    <div className="w-full xl:w-1/2">
                      <>
                        <label className="mb-2.5 block text-black dark:text-white">
                          Weight
                        </label>
                        <input
                          required
                          name="weight"
                          type="number"
                          min={5}
                          max={200}
                          placeholder="Enter Player weight"
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

export default AddStudent;
