import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        // console.log(data.appointments)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <p className="text-2xl font-bold mb-2">My Appointments</p>
      <hr className="mb-8 border-gray-300" />
      <div className="space-y-8">
        {appointments.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-6 p-6 shadow-md rounded-lg border border-gray-200">
            <div className="w-full md:w-1/3 flex justify-center">
              <img src={item.docData.image} alt="" className="w-64 h-64 object-cover rounded-lg bg-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-xl">{item.docData.name}</p>
              <p className="text-gray-600">{item.docData.speciality}</p>
              <p className="font-semibold mt-2">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-2"><span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className="flex flex-col gap-4">
              {!item.cancelled && !item.isCompleted && (
                <>
                  <button 
                    onClick={() => alert("Payment functionality is not available in this project.")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Pay Online
                  </button>
                  <button 
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Cancel Appointment
                  </button>
                </>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-md" disabled>
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md" disabled>
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
