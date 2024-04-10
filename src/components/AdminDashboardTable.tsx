import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PrintableComponentAdminDashTable.css';
// import axios from 'axios';
import { adminaxios } from '../axios/config';
interface AdminDashTableProps {
  gender: string;
  belt_color: string;
  kata: boolean;
  kumite: boolean;
  weight_category: string;
  age_category?:string ;
  category?:string
  fetch:boolean;
  color?:any
}
type Params = {
  gender?: string;
  belt_color?: string;
  kata?: string;
  kumite?: string;
  weight_category?: string | null;
  category: string;
  color?:any
};
const AdminDashTable: React.FC<AdminDashTableProps>  = ({color,belt_color,gender,kata,kumite,weight_category,age_category,fetch=true}) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates data from the API
    if (fetch) {
      fetchData();
    } 
  }, [fetch]); 
  const fetchData = async () => {

    // let params= {

    //   gender: gender=="Male"?"M":gender=="Female"?"F":"N", 
    //   belt_color: belt_color, 
    //   kata: kata?"True":"False", 
    //   kumite:kumite?"True":"False",
    //   weight_category:kumite? weight_category:null, 
    //   category:age_category
    // }

    
    let params: Partial<Params> = {};
    if(gender=="Male"){
      params.gender ='M';
    }else if(gender=='Female'){
      params.gender='F';
    }if (belt_color){
      params.belt_color=belt_color
    }if(kata){
      if (kumite){
        params.kata="True"
        params.kumite="True"
      }else{
        params.kata="True"
        params.kumite="False"
      }
    }if (kumite){
      params.kumite="True"  
    }if (weight_category){
      params.weight_category=weight_category
    }
    if (age_category){
      params.category=age_category
    }if (color){
      console.log(color);
      
      params.color=color
    }

    if (kata && !kumite) {
      const { kumite, ...updatedParams } = params;
      params = updatedParams as typeof params;
    }
    if (kumite && !kata) {
      const { kata, ...updatedParams } = params;
      params = updatedParams as typeof params;
    }
    try {
      const response = await adminaxios.get('/api/candidates/filters', {
      
        params: params
      });

      console.log(params);
      
      setCandidates(response.data);
      if (response.data.length === 0) {
        toast.error('No candidates found.')
        
    }
    } catch (error) {
      console.error('Error fetching candidates:', error);
      
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      {candidates.length === 0 ? (
          <p>No candidates found.</p>
        ) : (
        <table className="w-full table-auto admindashboard-table">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sl
              </th>
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
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Belt
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
                  {index+1}
                </td>
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
                  {candidate.colours}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {candidate.club.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashTable;
