import React, { useEffect, useState } from 'react';
import InvoiceModal from './ShowInvoice';
import SwitcherFour from './SwitcherFour';
import { adminaxios } from '../axios/config';
import toast from 'react-hot-toast';

const ClubDetailsTable = () => {
  const [size, setSize] = React.useState(null);
  const handleOpen = (value: any) => setSize(value);
  const [allRegistration, setallRegistrations] = useState([]);
  const [id, setId] = useState();
  const [name, setname] = useState();
  const [clubName, setclubName] = useState();
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
 const handlePaymentConfirmation= async (id:number)=>{

  const userConfirmed = window.confirm(
    'Are you sure you want to Confirm payment of this Club?',
  );

  if (userConfirmed) {
    // Perform the actual delete action
    try {
      const { data }: any = await adminaxios.patch(`/api/clubs/${id}/`,{is_paid:"true"});
      getAllRegistrations();
      if (data) {
        toast.success('Payment Confirmed Successfully', {
          position: 'top-center',
        });
      }
    } catch (error: any) {
      toast.error('Error Occurred, try again.. !', {
        position: 'top-center',
      });
    }
  }
 }
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
            {allRegistration.map((item: any, index) => (
              <tr key={index}>
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
                  <span className="bg-black border-strokedark  shadow-default  text-white p-2 rounded-lg">
                    {item.is_paid?"Paid":"Pending"}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span
                    onClick={() => {
                      setId(item.id);
                      setname(item.coach_name);
                      setclubName(item.name);
                      handleOpen('md');
                    }}
                    className="bg-black border-strokedark  shadow-default  text-white p-2 rounded-lg"
                  >
                    Open Invoice
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {!item.is_paid&&<button onClick={()=>handlePaymentConfirmation(item.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                    Confirm Payment
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InvoiceModal
        id={id}
        name={name}
        clubName={clubName}
        size={size}
        key={1}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default ClubDetailsTable;
