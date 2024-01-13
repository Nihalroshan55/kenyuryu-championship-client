import TableThree from '../../components/TableThree.tsx';
import { IoPersonAddOutline } from 'react-icons/io5';
import AddStudent from '../../components/Addstudent.tsx';
import React from 'react';
import DefaultLayoutUser from '../../layout/DefaultLayoutUser.tsx';

const ECommerce = () => {
  const [size, setSize] = React.useState(null);
  const handleOpen = (value: any) => setSize(value);
  return (
    <>
      <DefaultLayoutUser>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 ">
            <div className="text-center justify-center flex p-5 bg-gradient-to-r from-red-500 to-black text-white text-2xl font-bold uppercase">
              <p className="admindashboard-table-criteria">
                Kenyuryu INDO-Srilanka Karate Championship 2024
              </p>
            </div>
           
            <TableThree />
            <div className=" border-stroke flex justify-end py-4 dark:border-strokedark">
              <div
                onClick={() => handleOpen('lg')}
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <span>
                  <IoPersonAddOutline size={25} />
                </span>
                Add Student
              </div>
            </div>
          </div>
          <AddStudent size={size} handleOpen={handleOpen} />
        </div>
      </DefaultLayoutUser>
    </>
  );
};

export default ECommerce;
