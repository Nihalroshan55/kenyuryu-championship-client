import { MdLocalPrintshop } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';

import './PrintableComponentAdminDashTable.css';
const AdminDashTable = () => {

 
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div  className="max-w-full overflow-x-auto">
        <table  className="w-full table-auto admindashboard-table">
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
          <tbody className='admindashboard-table-tr'>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Sally Quinn
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                25
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Male
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                27 Kg
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Kenyuryu Calicut
              </td>
            </tr>

            <tr>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Sally Quinn
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                25
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Male
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                27 Kg
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Kenyuryu Calicut
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Sally Quinn
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                25
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Male
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                27 Kg
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Kenyuryu Calicut
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default AdminDashTable;
