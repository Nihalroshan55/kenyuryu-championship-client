import React, { useEffect, useState } from 'react';
import './PrintableComponentAdminDashTable.css';
// import axios from 'axios';
import { adminaxios } from '../axios/config';
interface AdminDashTableProps {
  gender: string;
  belt_color: string;
  kata: boolean;
  kumite: boolean;
  weight_category: string;
  age_category:string;
  fetch:boolean;
}
const AdminDashTable: React.FC<AdminDashTableProps>  = ({belt_color,gender,kata,kumite,weight_category,age_category,fetch}) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates data from the API
   

    fetchData(); 
  }, [fetch]); 
  const fetchData = async () => {
    try {
      const response = await adminaxios.get('/api/candidates/filters', {
        params: {
        
          gender: gender=="Male"?"M":gender=="Female"?"F":"N", 
          belt_color: belt_color, 
          kata: kata?"True":"False", 
          kumite:kumite?"True":"False",
          weight_category:kumite? weight_category:null, 
          age_category:age_category
        },
      });

      
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto admindashboard-table">
          <thead>
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
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Club
              </th>
            </tr>
          </thead>
          <tbody className="admindashboard-table-tr">
            {candidates.map((candidate:any, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.name}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.age}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.gender}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.weight}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.club.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashTable;
