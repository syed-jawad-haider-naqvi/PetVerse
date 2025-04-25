import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.jpg'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import cat from './cat.png'
import dog from './dog.png'
// import Nutritionist from './Nutritionist.svg'
// import Surgeon from './Surgeon.svg'
// import Neurologist from './Neurologist.svg'
// import Ophthalmologist from './Ophthalmologist.svg'

import General_Veterinarian from './General_physician.png'
import Surgeon from './Surgeon.png'
import Dermatologist from './Dermatologist.png'
import Ophthalmologist from './Ophthalmologist.png'
import Neurologist from './Neurologist.png'
import Nutritionist from './Nutritionist.png'
import VetLogo from './vetlogo.png'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    VetLogo,
    cat,
    dog
}

export const specialityData = [
    {
        speciality: 'General Veterinarian',
        image: General_Veterinarian
    },
    {
        speciality: 'Surgeon',
        image: Surgeon
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Ophthalmologist',
        image: Ophthalmologist
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Nutritionist',
        image: Nutritionist
    },
]

export const doctors = [
    {
        _id: 'vet1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General Veterinarian',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Richard James has extensive experience in providing general healthcare for pets, including vaccinations, regular check-ups, parasite control, and dietary consultations. His compassionate approach ensures that pets receive the best possible preventive and primary care, keeping them happy and healthy.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Veterinary Surgeon',
        degree: 'DVM',
        experience: '3 Years',
        about: 'Dr. Emily Larson specializes in performing both routine and complex surgeries, including orthopedic, soft tissue, and emergency procedures. She is highly skilled in post-operative care, ensuring quick recovery and the best outcomes for pets undergoing surgery.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet3',
        name: 'Dr. Sam Wilson',
        image: doc3,
        speciality: 'Veterinary Dermatologist',
        degree: 'DVM',
        experience: '1 Year',
        about: 'Dr. Wilson focuses on treating various skin conditions in pets, including allergies, fungal infections, and chronic skin disorders. She provides personalized treatment plans to manage skin diseases and improve the overall coat health of pets.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Veterinary Ophthalmologist',
        degree: 'DVM',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is an expert in diagnosing and treating eye conditions in pets, including cataracts, glaucoma, and infections. He performs eye surgeries and prescribes treatments to maintain and restore the vision health of animals.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Veterinary Neurologist',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia specializes in treating neurological disorders such as epilepsy, spinal cord injuries, and nerve disorders in pets. She uses advanced diagnostic techniques and therapeutic approaches to improve mobility and quality of life for pets with neurological conditions.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Veterinary Nutritionist',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Andrew Williams provides expert guidance on pet nutrition, creating customized diet plans for pets with special health conditions such as obesity, diabetes, and kidney disease. He works with pet owners to ensure their pets receive balanced and healthy meals for overall well-being.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'General Veterinarian',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Davis is dedicated to providing comprehensive pet healthcare, from routine check-ups and vaccinations to diagnosing common illnesses. His expertise in preventive medicine helps ensure pets lead long, healthy lives.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Veterinary Surgeon',
        degree: 'DVM',
        experience: '3 Years',
        about: 'Dr. White is an experienced veterinary surgeon who performs a wide range of surgical procedures, from soft tissue repairs to orthopedic surgeries. His precise surgical techniques and post-operative care ensure excellent recovery for pets.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Veterinary Dermatologist',
        degree: 'DVM',
        experience: '1 Year',
        about: 'Dr. Ava Mitchell specializes in diagnosing and treating skin conditions, allergies, and coat health issues in pets. She offers advanced treatments for chronic itching, infections, and hair loss to enhance pet comfort and well-being.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Veterinary Ophthalmologist',
        degree: 'DVM',
        experience: '2 Years',
        about: 'Dr. Jeffrey King focuses on diagnosing and treating various eye diseases in pets, including cataracts and corneal ulcers. He offers both medical and surgical solutions to improve vision and eye health in animals.',
        fees: 40,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Veterinary Neurologist',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly has a strong background in treating conditions such as seizures, nervous system disorders, and mobility issues. She utilizes cutting-edge diagnostics and rehabilitation therapies to enhance pets’ quality of life.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Veterinary Neurologist',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is skilled in diagnosing and managing neurological disorders in pets, including spinal injuries and paralysis. He provides both surgical and non-surgical treatments to improve pet mobility and recovery.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'General Veterinarian',
        degree: 'DVM',
        experience: '4 Years',
        about: 'Dr. Chloe Evans offers compassionate veterinary care, focusing on preventive medicine, vaccinations, and early disease detection. Her gentle approach ensures pets feel comfortable and stress-free during visits.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Veterinary Surgeon',
        degree: 'DVM',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez specializes in performing surgeries for both small and large animals. His expertise includes tumor removal, reconstructive surgery, and orthopedic repairs, ensuring pets regain mobility and health.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        _id: 'vet15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Veterinary Dermatologist',
        degree: 'DVM',
        experience: '1 Year',
        about: 'Dr. Amelia Hill has expertise in treating pet skin diseases, allergies, and coat-related conditions. She provides advanced treatments and skincare plans to ensure pets stay itch-free and comfortable.',
        fees: 30,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    }
];

