import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctors = ({ isDarkTheme }) => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setDegree('');
        setFees('');
        setAbout('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={`${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg max-w-5xl mx-auto shadow-md`}>
      <form onSubmit={onSubmitHandler}>
        <p className='text-2xl font-bold mb-6 text-blue-600'>Add Doctor</p>

        <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700'>
          <div className='flex items-center gap-4 mb-6'>
            <label htmlFor="doc_img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.pro_icon}
                alt="Upload"
                className='w-16 h-16 object-cover border border-gray-600 rounded-full'
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc_img' hidden />
            <p className='text-sm'>Upload doctor <br /> picture</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block mb-1'>Doctor Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
                className='w-full p-2 border border-gray-300 rounded-md' required />

              <label className='block mt-4 mb-1'>Doctor Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                className='w-full p-2 border border-gray-300 rounded-md' required />

              <label className='block mt-4 mb-1'>Doctor Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                className='w-full p-2 border border-gray-300 rounded-md' required />

              <label className='block mt-4 mb-1'>Experience</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md'>
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={`${year + 1} Year`}>{year + 1} Year</option>
                ))}
              </select>

              <label className='block mt-4 mb-1'>Fees</label>
              <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="Fees"
                className='w-full p-2 border border-gray-300 rounded-md' required />
            </div>

            <div>
              <label className='block mb-1'>Speciality</label>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md'>
                {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              <label className='block mt-4 mb-1'>Education</label>
              <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Education"
                className='w-full p-2 border border-gray-300 rounded-md' required />

              <label className='block mt-4 mb-1'>Address</label>
              <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address Line 1"
                className='w-full p-2 mb-3 border border-gray-300 rounded-md' required />
              <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address Line 2"
                className='w-full p-2 border border-gray-300 rounded-md' required />
            </div>
          </div>

          <div className='mt-6'>
            <label className='block mb-1'>About Doctor</label>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Write about doctor"
              className='w-full p-2 border border-gray-300 rounded-md' rows="5" required />
          </div>

          <button type='submit' className='mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700'>
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctors;
