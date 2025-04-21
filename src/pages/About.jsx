import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-[250px] h-[270px] object-cover rounded-full"
          src={assets.head01}
          alt="Healthcare Staff"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Healthcare billing often needs to be clarified for patients. Many
            patients walk away from a medical service not knowing what they owe
            or when it’s due. Texting can help resolve this confusion about
            payment.
          </p>
          <p>
            Text messages can notify patients when a new billing statement is
            available and remind them to pay. They can also be used to promote
            various payment plans for patients.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision is to enhance communication between patients and
            providers. One of the top benefits of text messaging in healthcare
            is its ability to improve two-way communication. Often, patients
            don’t have a simple or convenient way to contact their healthcare
            teams quickly. Texting solves this by offering a fast and reliable
            method for both parties to stay connected.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 cursor-pointer">
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 cursor-pointer">
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 hover:text-white hover:bg-blue-500 transition-all duration-300 cursor-pointer">
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
