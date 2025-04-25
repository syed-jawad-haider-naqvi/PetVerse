import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  console.log(speciality)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
       <p className='text-gray-600'>Browse through the doctors specialist.</p>
       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
         <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-blue-700 text-white' : ''}`}>Filters</button>
         <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
         <p onClick={() => speciality === 'General Veterinarian' ? navigate('/vets') : navigate('/vets/General Veterinarian')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General Veterinarian' ? 'bg-[#E2E5FF] text-black ' : ''}`}>General Veterinarian</p>
         <p onClick={() => speciality === 'Veterinary Surgeon' ? navigate('/vets') : navigate('/vets/Veterinary Surgeon')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Veterinary Surgeon' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Veterinary Surgeon</p>
         <p onClick={() => speciality === 'Veterinary Dermatologist' ? navigate('/vets') : navigate('/vets/Veterinary Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Veterinary Dermatologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Veterinary Dermatologist</p>
         <p onClick={() => speciality === 'Veterinary Ophthalmologist' ? navigate('/vets') : navigate('/vets/Veterinary Ophthalmologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Veterinary Ophthalmologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Veterinary Ophthalmologist</p>
         <p onClick={() => speciality === 'Veterinary Neurologist' ? navigate('/vets') : navigate('/vets/Veterinary Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Veterinary Neurologist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Veterinary Neurologist</p>
         <p onClick={() => speciality === 'Veterinary Nutritionist' ? navigate('/vets') : navigate('/vets/Veterinary Nutritionist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Veterinary Nutritionist' ? 'bg-[#E2E5FF] text-black ' : ''}`}>Veterinary Nutritionist</p>

         </div>
         <div className='w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6'>
           {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-[#EAEFFF]' src={item.image} alt="" />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors