import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/*========Left-side========= */}
            <div>
                <img className=' mb-5 w-50' src={assets.logo01} alt=''/>
                <p className='w-full md:w-1/2 text-gray-600 leading-6'>We are the largest  healthcare facility providing single occupant patient rooms and second only to the public healthcare facility providing single occupant patient rooms sector in Oman .</p>

            </div>

            {/*========Center-side========= */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
                
            </div>

            {/*========Right-side========= */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>muscathospital@gmail.com</li>
                </ul>
                
            </div>
        </div>
        <div>
            {/*copyright */}
        </div>
        <hr/>
        <p className='py-5 text-sm text-center'>Muscat Private Hospital © 2019 - 2024, All Rights Reserved</p>
      
    </div>
  )
}

export default Footer
