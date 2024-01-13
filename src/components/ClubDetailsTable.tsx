import React from "react";
import InvoiceModal from "./ShowInvoice";
import SwitcherFour from "./SwitcherFour";

const ClubDetailsTable = () => {
  const [size, setSize] = React.useState(null);
  const handleOpen = (value: any ) => setSize(value);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                Payment Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Invoice
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                 Payment 
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Sally Quinn
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                Sally Quinn
              </td>

              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                +91 8129028182
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                54
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="bg-black border-strokedark  shadow-default  text-white p-2 rounded-lg">
                  Pending
                </span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span onClick={() => handleOpen("md")} className="bg-black border-strokedark  shadow-default  text-white p-2 rounded-lg">
                  Open Invoice
                </span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <SwitcherFour/>
              </td>

              
            </tr>
          </tbody>
        </table>
      </div>
      <InvoiceModal size={size} key={1} handleOpen={handleOpen}/>
    </div>
  );
};

export default ClubDetailsTable;
