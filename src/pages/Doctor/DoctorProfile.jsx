import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboards = () => {
  const {
    dashData,
    getDashData,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="p-6">
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Earnings */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full sm:w-64">
            <img src={assets.earning_icon} alt="earnings" className="w-10 h-10" />
            <div>
              <p className="text-lg font-bold">
                {currency} {dashData.earnings}
              </p>
              <p className="text-sm text-gray-600">Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full sm:w-64">
            <img src={assets.appointments_icon} alt="appointments" className="w-10 h-10" />
            <div>
              <p className="text-lg font-bold">{dashData.appointments}</p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full sm:w-64">
            <img src={assets.patients_icon} alt="patients" className="w-10 h-10" />
            <div>
              <p className="text-lg font-bold">{dashData.patients}</p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={assets.list_icon} alt="list" className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Latest Bookings</h3>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-white transition"
              >
                {/* Image */}
                <img
                  src={item.userData.image}
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex-1 mx-4">
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status or Action */}
                <div className="flex gap-3">
                  {item.cancelled ? (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <>
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        onClick={() => cancelAppointment(item._id)}
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                      <img
                        src={assets.tick_icon}
                        alt="Complete"
                        onClick={() => completeAppointment(item._id)}
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboards;
