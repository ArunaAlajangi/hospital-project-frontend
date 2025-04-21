import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import cancelIcon from "../../assets/cancel_icon.svg";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-primary mb-4">All Appointments</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 text-center font-semibold bg-gray-200 p-3 rounded-t-lg">
          <div>#</div>
          <div>Patient</div>
          <div>Age</div>
          <div>Date & Time</div>
          <div>Doctor</div>
          <div>Fees</div>
          <div>Actions</div>
        </div>
        <div className="divide-y">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 text-center items-center bg-white hover:bg-gray-50 py-3 px-2"
            >
              <div>{index + 1}</div>
              <div className="flex items-center gap-2 justify-center">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.userData.image}
                  alt="User"
                />
                <span>{item.userData.name}</span>
              </div>
              <div>{isNaN(calculateAge(item.userData.dob)) ? "N/A" : calculateAge(item.userData.dob)}</div>
              <div>
                {slotDateFormat(item.slotDate)}, <br /> {item.slotTime}
              </div>
              <div className="flex items-center gap-2 justify-center">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-primary"
                  src={item.docData.image}
                  alt="Doctor"
                />
                <span>{item.docData.name}</span>
              </div>
              <div>
                {currency}
                {item.amount}
              </div>
              <div>
                {item.cancelled ? (
                  <span className="text-red-600 font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 font-semibold">Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={cancelIcon}
                    alt="Cancel"
                    className="w-6 h-6 mx-auto cursor-pointer hover:scale-110 transition-transform"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
