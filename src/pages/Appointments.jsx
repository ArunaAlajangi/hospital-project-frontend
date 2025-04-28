import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, backendUrl, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetching Doctor Info
  const fetchDocInfo = async () => {
    let doc = doctors.find((doc) => doc._id === docId);

    if (!doc) {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctors/${docId}`);
        if (data.success) {
          doc = data.doctor;
        }
      } catch (error) {
        console.log("Error fetching doctor info:", error);
      }
    }

    setDocInfo(doc);
  };

  // Fetching Available Slots
  const getAvailableSlots = () => {
    if (!docInfo) return;
    
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked?.[slotDate]
            ? !docInfo.slots_booked[slotDate].includes(slotTime)
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0]?.datetime;

      if (!date) {
        toast.error('No available slots.');
        return;
      }

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId,doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    <div className="container mx-auto mt-8">
      {docInfo && (
        <>
          <div className="flex gap-8">
            <div className="w-full md:w-1/3 text-center">
              <img
                src={docInfo.image}
                alt="Doctor"
                className="rounded-lg shadow-lg mb-4 w-full max-h-[420px] object-cover bg-blue-200"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="border border-gray-300 rounded-lg shadow-lg p-6">
                <h3 className="font-bold flex items-center gap-2 text-xl">
                  {docInfo.name}
                  <img src={assets.logo3} alt="Verified" className="w-8" />
                </h3>
                <p className="text-gray-500">{docInfo.degree} - {docInfo.speciality}</p>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-full mb-3">
                  {docInfo.experience} years experience
                </button>
                <h4 className="font-semibold flex items-center gap-2">
                  About <img src={assets.logo3} alt="Info" className="w-8" />
                </h4>
                <p className="text-gray-700">{docInfo.about}</p>
                <p className="text-lg font-semibold">
                  Appointment fee: <span className="text-blue-600">{currencySymbol}{docInfo.fees}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="font-bold text-2xl mb-5">Booking Slots</h4>
            <div className="flex gap-4 flex-wrap">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`text-center p-2 rounded-lg cursor-pointer shadow-lg ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-400'}`}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap mt-5">
              {docSlots.length > 0 &&
                docSlots[slotIndex]?.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-4 py-2 rounded-lg cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'border border-gray-400 text-gray-700'}`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))}
            </div>

            <button onClick={bookAppointment} className="bg-blue-600 text-white px-6 py-3 mt-6 w-full rounded-lg">
              Book an Appointment
            </button>
          </div>

          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </>
      )}
    </div>
  );
};

export default Appointments;
