

import Allregistrations from '../../components/Allregistrations.tsx';

const AllregistrationsPage = () => {
 

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 ">
          <div className="border-b border-stroke flex gap-5  py-4 dark:border-strokedark"></div>
          <Allregistrations />
        </div>
      </div>
    </>
  );
};

export default AllregistrationsPage;
