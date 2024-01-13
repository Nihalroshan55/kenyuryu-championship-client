import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineNotInterested } from 'react-icons/md';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from 'react-icons/fi';
const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
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
                Belt
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kata
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Kumita
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  Sally Quinn
                </h5>
              </td> */}
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
                colour
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <IoCheckmarkDoneSharp size={25} />
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <MdOutlineNotInterested size={25} />
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <div className="flex items-center space-x-3.5">
                  <button className="hover:text-primary">
                  <AiOutlineDelete size={20} />
                  </button>
                  <button className="hover:text-primary">
                    <FiEdit3 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
