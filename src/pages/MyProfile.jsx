import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 text-sm p-4">
      <div>
        {isEdit ? (
          <label htmlFor="image" className="relative inline-block w-36">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
              className="w-36 h-36 object-cover rounded-full border"
            />
            {!image && (
              <img
                src={assets.upload_icon}
                alt="upload"
                className="absolute bottom-2 right-2 w-8 h-8 bg-white p-1 rounded-full shadow cursor-pointer"
              />
            )}
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 object-cover rounded-full border"
            src={userData.image}
            alt="profile"
          />
        )}
      </div>

      <div>
        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-semibold rounded px-2 py-1 max-w-sm"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-3xl font-semibold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="border-t border-gray-300" />

      <div>
        <p className="text-gray-500 font-medium underline">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-700">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 rounded px-2 py-1 max-w-xs"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-100 rounded px-2 py-1"
                type="text"
                value={userData.address?.line1 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-100 rounded px-2 py-1"
                type="text"
                value={userData.address?.line2 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-600">
              {userData.address?.line1 || 'No address'}
              <br />
              {userData.address?.line2 || ''}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-gray-500 font-medium underline">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-gray-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 rounded px-2 py-1 max-w-xs"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 rounded px-2 py-1 max-w-xs"
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {isEdit ? (
          <button
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
