import { useEffect, useState } from 'react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { adminaxios } from '../axios/config';
import toast from 'react-hot-toast';
import AddClubAdmin from './AddClubAdmin';

const Allregistrations = () => {
  const [sizes, setSize] = useState(null);
  const [allRegistration, setallRegistrations] = useState([]);
  const handleOpen = (value: any) => setSize(value);
  useEffect(() => {
    getAllRegistrations();
  }, []);

  const getAllRegistrations = async () => {
    try {
      const { data }: any = await adminaxios.get(`/api/clubs/`);
      setallRegistrations(data);
      if (data) {
      }
    } catch (error: any) {
      console.error('Error fetchitn:', error);
      toast.error(
        'Error Occurred on fetching all Registrations, try again.. !',
        {
          position: 'top-center',
        },
      );
    }
  };
  const handleDelete = async (id: number) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this Club?',
    );

    if (userConfirmed) {
      // Perform the actual delete action
      try {
        const { data }: any = await adminaxios.delete(`/api/clubs/${id}/`);
        getAllRegistrations();
        if (data) {
          toast.success('Club Deleted Successfully', {
            position: 'top-center',
          });
        }
      } catch (error: any) {
        toast.error('Error Occurred, try again.. !', {
          position: 'top-center',
        });
      }
    }
  };
  return (
    <div className='shadow-2xl'>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className='float-right bg-gray-2  dark:bg-meta-4 mb-5 rounded-lg'> <button className='w-20 p-2' onClick={() => handleOpen('lg')}  >ADD</button> </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sl
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Club Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Coach
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Total Players
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {allRegistration.map((item: any, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {index+1}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.name}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.coach_name}
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  +91 {item.phone}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.no_of_candidate}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className={`flex gap-5 ${item.id==1?'hidden':'flex'}`  }>
                    <span onClick={()=>handleDelete(item.id)} className="bg-black border-strokedark cursor-pointer  shadow-default  text-red-600 p-2 rounded-lg">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddClubAdmin size={sizes} getAllRegistrations={getAllRegistrations} handleOpen={handleOpen} />
    </div>
            </div>
  );
};

export default Allregistrations;
