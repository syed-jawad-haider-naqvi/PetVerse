import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to <b>Petverse Vet Portal</b>, your dedicated platform for managing veterinary appointments and pet healthcare efficiently. We understand the importance of timely veterinary care and strive to make the process seamless for both pet owners and veterinarians.</p>
          <p>At <b>Petverse Vet Portal</b>, we are committed to leveraging technology to enhance pet healthcare services. Whether you're scheduling a routine check-up, tracking vaccination records, or consulting with a trusted vet, our platform ensures a hassle-free experience for both vets and pet parents.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to bridge the gap between pet owners and veterinarians by providing a user-friendly and accessible platform. We aim to empower vets with the tools they need to offer top-quality care while making it easier for pet parents to access veterinary services effortlessly.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Seamless appointment scheduling and pet record management for vets and pet owners.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ACCESSIBILITY:</b>
          <p>Connect with a network of trusted veterinarians and clinics at your convenience.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-amber-700 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>COMPREHENSIVE CARE:</b>
          <p>Stay informed with pet health reminders, treatment history, and expert vet guidance.</p>
        </div>
      </div>

    </div>
  );
};

export default About;
