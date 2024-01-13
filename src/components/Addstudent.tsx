import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import CheckboxTwo from './CheckboxTwo';

interface YourComponentProps {
  size: any | string | undefined; // Adjust the type for size
  handleOpen: (arg: any) => void; // Adjust the type for handleOpen if needed
}

const AddStudent: React.FC<YourComponentProps> = ({ size, handleOpen }) => {
  const [kata, setkata] = useState(false);
  const [kumita, setkumita] = useState(false);

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
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Player full name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Age
                    </label>
                    <input
                      type="text"
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
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option disabled value="">
                        Select Gender
                      </option>
                      <option value="">Male</option>
                      <option value="">Female</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Belt
                    </label>
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option disabled selected value="">
                        Select Belt
                      </option>
                      <option value="">black</option>
                      <option value="">colour</option>
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
                  {kumita&&<><label className="mb-2.5 block text-black dark:text-white">
                      Weight
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Player weight"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    /></>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddStudent;
