import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-8 md:px-10 lg:px-10'>
      {/*=======left======== */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white fonr-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br/>With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>       
          
           <img className='w-20 rounded-lg' src={assets.group_profiles} alt=''/>
        <p> We are committed in providing the best patient care,<br className='hidden sm:block'/> and welcome the opportunity to serve you and your family.</p>

      </div>
      <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-800 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>Book Appointment <img className='w-4' src={assets.arrow_icon}/></a>

      </div>
      {/*======right======== */}
      <div className="md:w-1/2 relative">
  <img className=' w- full md:absolute bottom-0  h-auto rounded-lg ' src={assets.doc01} alt="" />
</div>

    </div>
  )
}

export default Header
