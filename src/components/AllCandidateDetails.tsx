import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineNotInterested } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../axios/config';
import toast from 'react-hot-toast';
import EditStudent from './EditStudent';
import AddStudentAdmin from './AddStudentAdmin';

const AllCandidateDetails = ({ size,pdf }: any) => {
  const [sizes, setSize] = React.useState(null);
  const [addSize, setAddSize] = React.useState(null);
  const [editId, seteditId] = useState()
  const handleOpen = (value: any) => setSize(value);
  const handleAddOpen = (value: any) => {
    setAddSize(value);
    fetchClub();

  }
  const fetchClub = async () => {
    try {
      console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      const  {data} : any = await axiosInstance.get(
        "/api/clubs/",
      );
      // setAllPlayers(clubs);
      console.log(data) 
      setAllClubs(data)
      
    } catch (error: any) {
      console.error('Error fetchitn:', error);
    }
  };
  // const { id } = JSON.parse(localStorage.getItem('user') as string).user;
  // const id=2
  const [AllPlayers, setAllPlayers] = useState([]);
  const [allClubs, setAllClubs] = useState<any>([]);
  useEffect(() => {
    fetchPlayers();
  }, [size,sizes]);

  const fetchPlayers = async () => {
    try {
      const { data }: any = await axiosInstance.get(
        "/api/candidates/",
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
      <div className="max-w-full overflow-x-auto lastone">
      <div className='float-right bg-gray-2  dark:bg-meta-4 mb-5 rounded-lg'> <button onClick={() => handleAddOpen('lg')} className='w-20 p-2'>ADD</button> </div>
        <table className=" w-full table-auto lastone">
          <thead >
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sl
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Chest No
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
              <th className={` ${pdf?"hidden":""} py-4 px-4 font-medium text-black dark:text-white forhideelement`}>
                Belt Category
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Belt
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Club
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kata
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kumite
              </th>
              <th className={`${pdf?"hidden":""} py-4 px-4 font-medium text-black dark:text-white forhideelement`}>
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
                {index+1}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.name}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.chest_no}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.age}
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                {item.gender=="M"?'Male':"Female"}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.weight}
              </td>
              <td className={`${pdf?"hidden":""} border-b border-[#eee] py-5 px-4 dark:border-strokedark forhideelement`}>
                {item.belt_color}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.colours}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.club.name}
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
               {item.kata?<IoCheckmarkDoneSharp size={25} />:<MdOutlineNotInterested size={25} />} 
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              {item.kumite?<IoCheckmarkDoneSharp size={25} />:<MdOutlineNotInterested size={25} />} 

              </td>

              <td className={`${pdf?"hidden":""} border-b border-[#eee] py-5 px-4 dark:border-strokedark forhideelement`}>
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
      {/* <AddStudent size={size} handleOpen={handleOpen} /> */}
      <AddStudentAdmin size={addSize} fetchPlayers={fetchPlayers} allClubs={allClubs} handleOpen={handleAddOpen} />
    </div>
  );
};

export default AllCandidateDetails;
