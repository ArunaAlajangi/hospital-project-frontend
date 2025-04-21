import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">All Appointments</h2>

      <div className="bg-gray-50 rounded-xl shadow p-4">
        {/* Header */}
        <div className="grid grid-cols-7 text-center font-semibold py-2 border-b border-gray-300">
          <div>#</div>
          <div>Patient</div>
          <div>Payment</div>
          <div>Age</div>
          <div>Date & Time</div>
          <div>Fees</div>
          <div>Action</div>
        </div>

        {/* Appointments */}
        <div className="divide-y divide-gray-200">
          {appointments.slice().reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 items-center text-center py-3 font-medium hover:bg-white transition"
            >
              {/* Index */}
              <div>{index + 1}</div>

              {/* Patient */}
              <div className="flex items-center justify-center gap-2">
                <img src={item.userData.image} alt="patient" className="w-10 h-10 rounded-full object-cover" />
                <span>{item.userData.name}</span>
              </div>

              {/* Payment */}
              <div className="capitalize">{item.payment ? 'online' : 'cash'}</div>

              {/* Age */}
              <div>{calculateAge(item.userData.dob)}</div>

              {/* Date & Time */}
              <div>
                {slotDateFormat(item.slotDate)}, <br />
                <span className="text-sm text-gray-500">{item.slotTime}</span>
              </div>

              {/* Fees */}
              <div>
                {currency} {item.amount}
              </div>

              {/* Action */}
              <div className="flex justify-center gap-3">
                {item.cancelled ? (
                  <span className="text-red-600">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-600">Completed</span>
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
  );
};

export default DoctorAppointment;
