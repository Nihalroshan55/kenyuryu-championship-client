import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface VerifyEmailProps {
  register: (otp: number) => Promise<boolean>;
  email:string
}
export function Verifyemail({ register,email }: VerifyEmailProps) {
  const navigate = useNavigate();
  const inputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement | null>(null),
  );
const [invalidOtp, setinvalidOtp] = useState(true)
  const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    }
  };
  const verifyOtp = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let otp = '';
    for (let val of inputRefs) {
      otp += `${val.current?.value}`;
    }
    let result=await register(parseInt(otp))
    if(result==true){
      navigate('/home');
    }
    setinvalidOtp(result)
    return ;
  };
  return (
    <>
      <div className="relative border-strokedark bg-boxdark px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl text-white">
              <p>Email Verification</p>
            </div>
            <div className="flex text-white flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={verifyOtp}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {inputRefs.map((inputRefs, index) => (
                    <div className="w-16 h-16 ">
                      <input
                        required
                        key={index}
                        ref={inputRefs}
                        onChange={(e) => handleInput(index, e)}
                        maxLength={1}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg border-form-strokedark bg-form-input focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                     
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                  {!invalidOtp&&
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p className='text-red-700'>Invalid Otp</p>{' '}
                    
                  </div>}
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{' '}
                    <a
                      className="flex flex-row items-center text-red-700"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
