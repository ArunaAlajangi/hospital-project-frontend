import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  const { cancelAppointment, completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="p-4">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex gap-3 items-center bg-gray-100 border border-gray-300 p-4 rounded-xl shadow-sm w-full sm:w-64">
          <img src={assets.doctor_icon} alt="Doctors" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        <div className="flex gap-3 items-center bg-gray-100 border border-gray-300 p-4 rounded-xl shadow-sm w-full sm:w-64">
          <img src={assets.appointments_icon} alt="Appointments" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        <div className="flex gap-3 items-center bg-gray-100 border border-gray-300 p-4 rounded-xl shadow-sm w-full sm:w-64">
          <img src={assets.patients_icon} alt="Patients" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold">{dashData.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <img src={assets.list_icon} alt="Latest Bookings" className="w-6 h-6" />
          <p className="text-lg font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div className="space-y-4">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
              {/* Doctor Image */}
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Doctor Info */}
              <div className="flex-grow px-4">
                <p className="font-bold text-gray-800">{item.docData.name}</p>
                <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
              </div>

              {/* Status or Actions */}
              {item.cancelled ? (
                <span className="text-red-600 font-medium">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-medium">Completed</span>
              ) : (
                <div className="flex gap-3">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
