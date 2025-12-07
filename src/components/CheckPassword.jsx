import React from 'react';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';

const CheckPassword = ({password}) => { 
    const errors=[
        ["Password must contain 1 uppercase", /[A-Z]/.test(password)],
        ["Password must contain 1 lowercase", /[a-z]/.test(password)],
        ["Password should 6 character long", password.length>=6],
    ]

    const error=errors.find(item=>item[1]==false)

    if(!error){
        return null; //there is no error return null
    }

    return (
        <div>
        {errors.map((item,index)=><div key={index} className='flex gap-2 justify-between'>{item[0]} {item[1]? <FaCircleCheck className='text-green-400' /> : <FaCircleExclamation className='text-red-400' />}</div>)}
        </div>
    );
};

export default CheckPassword;