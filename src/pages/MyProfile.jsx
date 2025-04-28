import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          {isEdit ? (
            <label htmlFor="image" className="relative group cursor-pointer">
              <img 
                src={image ? URL.createObjectURL(image) : userData.image} 
                alt="Profile" 
                className="w-40 h-40 object-cover rounded-full border-4 border-blue-400 shadow-md transition duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-sm">Change Photo</span>
              </div>
              <input 
                type="file" 
                id="image" 
                hidden 
                onChange={(e) => setImage(e.target.files[0])} 
              />
            </label>
          ) : (
            <img 
              src={userData.image} 
              alt="Profile" 
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-md"
            />
          )}
        </div>

        {/* Name */}
        <div className="text-center mb-6">
          {isEdit ? (
            <input 
              type="text" 
              value={userData.name} 
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
              className="text-2xl font-bold text-center border-b-2 focus:outline-none w-full"
            />
          ) : (
            <h1 className="text-2xl font-bold">{userData.name}</h1>
          )}
        </div>

        {/* Contact and Basic Information */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Email */}
          <div>
            <p className="text-gray-600 font-semibold">Email</p>
            <p className="text-blue-500">{userData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-gray-600 font-semibold">Phone</p>
            {isEdit ? (
              <input 
                type="text" 
                value={userData.phone} 
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="text-gray-600 font-semibold">Address</p>
            {isEdit ? (
              <>
                <input 
                  type="text" 
                  placeholder="Line 1" 
                  value={userData.address?.line1 || ''} 
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                  className="border p-2 rounded w-full mb-2"
                />
                <input 
                  type="text" 
                  placeholder="Line 2" 
                  value={userData.address?.line2 || ''} 
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                  className="border p-2 rounded w-full"
                />
              </>
            ) : (
              <p>
                {userData.address?.line1 || 'No address'}<br />
                {userData.address?.line2 || ''}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="text-gray-600 font-semibold">Gender</p>
            {isEdit ? (
              <select 
                value={userData.gender} 
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                className="border p-2 rounded w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <p className="text-gray-600 font-semibold">Birthday</p>
            {isEdit ? (
              <input 
                type="date" 
                value={userData.dob} 
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          {
          isEdit ? (
            <button 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition"
              onClick={updateUserProfileData}
            >
              Save Changes
            </button>
          ) : (
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyProfile;
