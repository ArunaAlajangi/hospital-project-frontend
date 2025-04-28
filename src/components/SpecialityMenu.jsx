import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>
          We are committed in providing the best patient care and welcome the opportunity to serve you and your family.
        </p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {specialityData.map((item, index) => (
                <Link 
                  key={index} 
                  to={`/doctors/${item.speciality}`} 
                  onClick={() => window.scrollTo(0, 0)} 
                  className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='sm:w-20 mb-2 rounded-full' src={item.image} alt={item.speciality}/>
                    <p className='text-center'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  );
}

export default SpecialityMenu;
