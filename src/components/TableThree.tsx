import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineNotInterested } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axios/config';
import toast from 'react-hot-toast';
import EditStudent from './EditStudent';

const TableThree = ({ size,pdf }: any) => {
  const [sizes, setSize] = React.useState(null);
  const [editId, seteditId] = useState()
  const handleOpen = (value: any) => setSize(value);
  const { id } = JSON.parse(localStorage.getItem('user') as string).user;

  const [AllPlayers, setAllPlayers] = useState([]);
  useEffect(() => {
    fetchPlayers();
  }, [size,sizes]);

  const fetchPlayers = async () => {
    try {
      const { data }: any = await axiosInstance.get(
        `/api/candidates/club_candidates/?club=${id}`,
      );
      setAllPlayers(data);
      if (data) {
      }
    } catch (error: any) {
      console.error('Error fetchitn:', error);
    }
  };

  const deletePlayer = async (id: number) => {
    // Show a confirmation dialog using window.confirm
    const userConfirmed = window.confirm('Are you sure you want to delete this player?');

    if (userConfirmed) {
      // Perform the actual delete action
      try {
        const { data }: any = await axiosInstance.delete(`/api/candidates/${id}`);
        fetchPlayers()
        if (data) {
          toast.success('Player Deleted Successfully', {
            position: 'top-center',
          });
        }
      } catch (error: any) {
        toast.error('Error Occurred, try again.. !', {
          position: 'top-left',
        });
      }
    }
  };

  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className={` w-full table-auto`}>
          <thead >
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Age
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Gender
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Weight
              </th>
              <th className={` ${pdf?"hidden":""} py-4 px-4 font-medium text-black dark:text-white`}>
                Belt Category
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Belt
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kata
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kumite
              </th>
              <th className={`${pdf?"hidden":""} py-4 px-4 font-medium text-black dark:text-white`}>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {AllPlayers.length!=0?AllPlayers.map((item:any, index) => (
              
              <tr key={index}>
              {/* <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  Sally Quinn
                </h5>
              </td> */}
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.name}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.age}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.gender=="M"?'Male':"Female"}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.weight}
              </td>
              <td className={`${pdf?"hidden":""} border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                {item.belt_color}
              </td><td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.colours}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
               {item.kata?<IoCheckmarkDoneSharp size={25} />:<MdOutlineNotInterested size={25} />} 
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              {item.kumite?<IoCheckmarkDoneSharp size={25} />:<MdOutlineNotInterested size={25} />} 

              </td>

              <td className={`${pdf?"hidden":""} border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                <div className="flex items-center space-x-3.5">
                  <button onClick={()=>deletePlayer(item.id)} className="hover:text-primary">
                    <AiOutlineDelete size={20} />
                  </button>
                  <button onClick={() =>{
                    seteditId(item.id)
                    handleOpen('lg')
                  }} className="hover:text-primary">
                    <FiEdit3 size={20} />
                  </button>
                </div>
              </td>
            </tr>
             
            )):<></>}
           
          </tbody>
        </table>
      </div>
      <EditStudent id={editId} size={sizes} handleOpen={handleOpen} />
    </div>
  );
};

export default TableThree;
