// // src/components/ProfileCards.tsx
// import React from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { motion } from 'framer-motion';
// import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'; // Additional icons
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// // Customized profile data with roles related to Data Science and AI/ML
// const profiles = [
//     {
//         name: 'Dr. Heer Parekh',
//         title: 'Data Science Mentor | PhD in AI | Lead Data Scientist at Tech Innovations',
//         image: './assets/20.jpg', // Placeholder image (replace with your image path)
//         borderColor: 'border-pink-300',
//         github: 'https://github.com',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         name: 'Alice Johnson',
//         title: 'AI/ML Instructor | AI Researcher at AI Hub',
//         image: 'https://via.placeholder.com/150', // Placeholder image (replace with your image path)
//         borderColor: 'border-blue-300',
//         github: 'https://github.com',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         name: 'Dr. James Smith',
//         title: 'Data Science Educator | Machine Learning Engineer at DataWorks',
//         image: 'https://via.placeholder.com/150', // Placeholder image (replace with your image path)
//         borderColor: 'border-green-300',
//         github: 'https://github.com',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         name: 'Prof. Sarah Davis',
//         title: 'Computer Science Teacher | AI Ethics Specialist',
//         image: 'https://via.placeholder.com/150', // Placeholder image (replace with your image path)
//         borderColor: 'border-purple-300',
//         github: 'https://github.com',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//     },
//     {
//         name: 'Mark Thompson',
//         title: 'Data Analyst | Big Data Consultant',
//         image: 'https://via.placeholder.com/150', // Placeholder image (replace with your image path)
//         borderColor: 'border-red-300',
//         github: 'https://github.com',
//         linkedin: 'https://linkedin.com',
//         twitter: 'https://twitter.com',
//         instagram: 'https://instagram.com',
//     },
// ];

// // Framer Motion animation variants
// const cardVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
// };

// const navigation = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
//     { name: 'Reports', href: '#', current: false },
// ];

// const user = {
//     name: 'Tom Cook',
//     email: 'tom@example.com',
//     imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };

// const userNavigation = [
//     { name: 'Your Profile', href: '#' },
//     { name: 'Settings', href: '#' },
//     { name: 'Sign out', href: '#' },
// ];

// // Classnames function for conditional class names
// function classNames(...classes: (string | undefined | false)[]): string {
//     return classes.filter(Boolean).join(' ');
// }

// // Main component
// export default function ProfileCards(): JSX.Element {
//     return (
//         <>
//             <div className="min-h-full">
//                 <Disclosure as="nav" className="bg-gray-800">
//                     {({ open }) => (
//                         <>
//                             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                                 <div className="flex h-16 items-center justify-between">
//                                     <div className="flex items-center">
//                                         <div className="flex-shrink-0">
//                                             <img
//                                                 className="h-8 w-8"
//                                                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                                                 alt="Your Company"
//                                             />
//                                         </div>
//                                         <div className="hidden md:block">
//                                             <div className="ml-10 flex items-baseline space-x-4">
//                                                 {navigation.map((item) => (
//                                                     <a
//                                                         key={item.name}
//                                                         href={item.href}
//                                                         aria-current={item.current ? 'page' : undefined}
//                                                         className={classNames(
//                                                             item.current
//                                                                 ? 'bg-gray-900 text-white'
//                                                                 : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                                             'rounded-md px-3 py-2 text-sm font-medium',
//                                                         )}
//                                                     >
//                                                         {item.name}
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="hidden md:block">
//                                         <div className="ml-4 flex items-center md:ml-6">
//                                             <button
//                                                 type="button"
//                                                 className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                             >
//                                                 <span className="sr-only">View notifications</span>
//                                                 <BellIcon className="h-6 w-6" aria-hidden="true" />
//                                             </button>

//                                             {/* Profile dropdown */}
//                                             <Menu as="div" className="relative ml-3">
//                                                 <div>
//                                                     <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                                         <span className="sr-only">Open user menu</span>
//                                                         <img
//                                                             className="h-8 w-8 rounded-full"
//                                                             src={user.imageUrl}
//                                                             alt=""
//                                                         />
//                                                     </Menu.Button>
//                                                 </div>
//                                                 <Transition
//                                                     enter="transition ease-out duration-100"
//                                                     enterFrom="transform opacity-0 scale-95"
//                                                     enterTo="transform opacity-100 scale-100"
//                                                     leave="transition ease-in duration-75"
//                                                     leaveFrom="transform opacity-100 scale-100"
//                                                     leaveTo="transform opacity-0 scale-95"
//                                                 >
//                                                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                                         {userNavigation.map((item) => (
//                                                             <Menu.Item key={item.name}>
//                                                                 {({ active }) => (
//                                                                     <a
//                                                                         href={item.href}
//                                                                         className={classNames(
//                                                                             active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                                                                             'block px-4 py-2 text-sm',
//                                                                         )}
//                                                                     >
//                                                                         {item.name}
//                                                                     </a>
//                                                                 )}
//                                                             </Menu.Item>
//                                                         ))}
//                                                     </Menu.Items>
//                                                 </Transition>
//                                             </Menu>
//                                         </div>
//                                     </div>
//                                     <div className="-mr-2 flex md:hidden">
//                                         <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
//                                             <span className="sr-only">Open main menu</span>
//                                             {open ? (
//                                                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                                             ) : (
//                                                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                                             )}
//                                         </Disclosure.Button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Disclosure.Panel className="md:hidden">
//                                 <div className="space-y-1 px-2 pb-3 pt-2">
//                                     {navigation.map((item) => (
//                                         <Disclosure.Button
//                                             key={item.name}
//                                             as="a"
//                                             href={item.href}
//                                             className={classNames(
//                                                 item.current
//                                                     ? 'bg-gray-900 text-white'
//                                                     : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                                 'block rounded-md px-3 py-2 text-base font-medium',
//                                             )}
//                                         >
//                                             {item.name}
//                                         </Disclosure.Button>
//                                     ))}
//                                 </div>
//                             </Disclosure.Panel>
//                         </>
//                     )}
//                 </Disclosure>

//                 <main>
//                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                         <div className="py-10">
//                             <h1 className="text-3xl font-bold text-gray-900">Profile Cards</h1>
//                             <div className="mt-6 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:grid-cols-3">
//                                 {profiles.map((profile) => (
//                                     <Link to="/video" key={profile.name}> {/* Wrap the card with Link */}
//                                         <motion.div
//                                             className={`border-4 rounded-lg overflow-hidden shadow-lg ${profile.borderColor} hover:shadow-2xl transition-shadow duration-300`}
//                                             initial="hidden"
//                                             whileInView="visible"
//                                             variants={cardVariants}
//                                         >
//                                             <img
//                                                 src={profile.image}
//                                                 alt={`${profile.name}'s profile`}
//                                                 className="h-40 w-full object-cover transition-transform duration-300 transform hover:scale-105"
//                                             />
//                                             <div className="p-6 text-center">
//                                                 <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
//                                                 <p className="mt-2 text-base text-gray-500">{profile.title}</p>
//                                                 <div className="mt-4 flex justify-center space-x-4">
//                                                     <a
//                                                         href={profile.github}
//                                                         className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200"
//                                                         aria-label={`Visit ${profile.name}'s GitHub`}
//                                                     >
//                                                         <FaGithub className="h-5 w-5" />
//                                                     </a>
//                                                     <a
//                                                         href={profile.linkedin}
//                                                         className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200"
//                                                         aria-label={`Visit ${profile.name}'s LinkedIn`}
//                                                     >
//                                                         <FaLinkedin className="h-5 w-5" />
//                                                     </a>
//                                                     <a
//                                                         href={profile.twitter}
//                                                         className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200"
//                                                         aria-label={`Visit ${profile.name}'s Twitter`}
//                                                     >
//                                                         <FaTwitter className="h-5 w-5" />
//                                                     </a>
//                                                     <a
//                                                         href={profile.instagram}
//                                                         className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200"
//                                                         aria-label={`Visit ${profile.name}'s Instagram`}
//                                                     >
//                                                         <FaInstagram className="h-5 w-5" />
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// }
import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Import icon images for mentors
import MathIcon from './assets/f1.png';
import AIIcon from './assets/m1.jpeg';
import MLIcon from './assets/m2.jpg';
import EthicsIcon from './assets/f2.jpeg';
import DataIcon from './assets/m3.jpeg';

// Add new images for additional mentors
import MentorIcon1 from './assets/m4.jpeg';
import MentorIcon2 from './assets/m1.jpeg';
import MentorIcon3 from './assets/f2.jpeg';
import MentorIcon4 from './assets/f3.jpeg';
import MentorIcon5 from './assets/m1.jpeg';
import MentorIcon6 from './assets/f3.jpeg';
import MentorIcon7 from './assets/m4.jpeg';
import MentorIcon8 from './assets/m1.jpeg';
import MentorIcon9 from './assets/m3.jpeg';
import MentorIcon10 from './assets/m2.jpg';
import MentorIcon11 from './assets/m3.jpeg';
import MentorIcon12 from './assets/m2.jpg';
import MentorIcon13 from './assets/f1.png';
import MentorIcon14 from './assets/m3.jpeg';
import MentorIcon15 from './assets/m4.jpeg';

// Customized profile data with 20 mentor profiles
const profiles = [
    {
        name: 'Dr. Heer Parekh',
        title: 'Data Science Mentor | PhD in AI | Lead Data Scientist at Tech Innovations',
        image: MathIcon,
        borderColor: 'border-pink-300',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    },
    {
        name: 'Alice Johnson',
        title: 'AI/ML Instructor | AI Researcher at AI Hub',
        image: AIIcon,
        borderColor: 'border-blue-300',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    },
    {
        name: 'Dr. James Smith',
        title: 'Data Science Educator | Machine Learning Engineer at DataWorks',
        image: MLIcon,
        borderColor: 'border-green-300',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    },
    {
        name: 'Prof. Sarah Davis',
        title: 'Computer Science Teacher | AI Ethics Specialist',
        image: EthicsIcon,
        borderColor: 'border-purple-300',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    },
    {
        name: 'Mark Thompson',
        title: 'Data Analyst | Big Data Consultant',
        image: DataIcon,
        borderColor: 'border-red-300',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    },
    {
            name: 'John Doe',
            title: 'Senior Data Scientist | AI and NLP Expert | Data Labs',
            image: MentorIcon1,
            borderColor: 'border-yellow-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Emily Stone',
            title: 'Machine Learning Engineer | Deep Learning Specialist | AI Innovations',
            image: MentorIcon2,
            borderColor: 'border-indigo-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Michael Harris',
            title: 'Senior Data Analyst | Big Data | Insights Specialist | Analytica',
            image: MentorIcon3,
            borderColor: 'border-teal-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Sophia Evans',
            title: 'AI Researcher | NLP and Vision AI Specialist | AI Labs',
            image: MentorIcon4,
            borderColor: 'border-orange-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'David Lee',
            title: 'Computer Engineer | Cloud Computing Expert | CloudMasters',
            image: MentorIcon5,
            borderColor: 'border-gray-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Isabella Brown',
            title: 'Data Science Engineer | DataOps Enthusiast | NextGen Tech',
            image: MentorIcon6,
            borderColor: 'border-lime-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Ethan Johnson',
            title: 'Senior Machine Learning Engineer | MLOps Specialist | TechX',
            image: MentorIcon7,
            borderColor: 'border-blue-500',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Grace Anderson',
            title: 'Data Scientist | Predictive Analytics | AI for Healthcare',
            image: MentorIcon8,
            borderColor: 'border-purple-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Jacob Martinez',
            title: 'AI Architect | Autonomous Systems Developer | AI Tech Labs',
            image: MentorIcon9,
            borderColor: 'border-green-500',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Ava Carter',
            title: 'Computer Vision Engineer | Self-Driving Technology | AutoAI',
            image: MentorIcon10,
            borderColor: 'border-red-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Oliver Wilson',
            title: 'AI Engineer | Robotics and Automation Expert | RoboTech',
            image: MentorIcon11,
            borderColor: 'border-yellow-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Emma King',
            title: 'Data Science Consultant | AI-driven Solutions | ConsultAI',
            image: MentorIcon12,
            borderColor: 'border-pink-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Liam Hall',
            title: 'Machine Learning Developer | AI Software Engineer | AIStack',
            image: MentorIcon13,
            borderColor: 'border-indigo-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Charlotte White',
            title: 'Data Engineer | Scalable Data Solutions | DataFlow Inc.',
            image: MentorIcon14,
            borderColor: 'border-cyan-300',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        },
        {
            name: 'Lucas Scott',
            title: 'Cloud Data Architect | Big Data and Analytics | CloudNet',
            image: MentorIcon15,
            borderColor: 'border-emerald-400',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com',
        }
    ];
    

// Framer Motion animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, type: 'spring' },
    }),
};

const hoverVariants = {
    hover: { scale: 1.1, rotate: 5, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' },
};
const handleRedirectToVideo = () => {
    window.location.href = 'http://localhost:5173/video';
};

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
];

export default function MentorsPage() {
    return (
        <div className="bg-gradient-to-br from-blue-200 via-blue-400 to-blue-600 min-h-screen flex flex-col">
            {/* Navigation bar */}
            <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg p-4 rounded-b-lg">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo or brand name */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300 transition duration-200">
                            Mentor Connect
                        </Link>
                    </div>
                    {/* Navigation links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/dashboard" className="text-white text-lg hover:text-blue-300 transition duration-200">
                            Dashboard
                        </Link>
                        <Link to="/mentors" className="text-white text-lg hover:text-blue-300 transition duration-200">
                            Mentors
                        </Link>
                        <Link to="/projects" className="text-white text-lg hover:text-blue-300 transition duration-200">
                            Projects
                        </Link>
                    </div>
                    {/* Profile icon and welcome message */}
                    <div className="flex items-center space-x-4">
                        <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="Profile" />
                        <p className="text-white">Welcome, Shobit</p>
                    </div>
                </div>
            </nav>

            {/* Cards Container */}
            <motion.div
                className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 mt-8"
                initial="hidden"
                animate="visible"
            >
                {profiles.map((profile, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white border-2 ${profile.borderColor} p-6 rounded-lg shadow-lg max-w-xs text-center transition-transform duration-300 transform hover:scale-105`}
                        custom={index}
                        variants={cardVariants}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.img
                            className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-white shadow-md"
                            src={profile.image}
                            alt={profile.name}
                            variants={hoverVariants}
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h2>
                        <p className="text-gray-600 mb-4">{profile.title}</p>
                        <div className="flex justify-center space-x-4 mb-4">
                            <a href={profile.github} className="text-gray-400 hover:text-blue-600 transition duration-200">
                                <FaGithub size={22} />
                            </a>
                            <a href={profile.linkedin} className="text-blue-500 hover:text-blue-600 transition duration-200">
                                <FaLinkedin size={22} />
                            </a>
                            <a href={profile.twitter} className="text-blue-400 hover:text-blue-600 transition duration-200">
                                <FaTwitter size={22} />
                            </a>
                            <a href={profile.instagram} className="text-pink-500 hover:text-pink-600 transition duration-200">
                                <FaInstagram size={22} />
                            </a>
                        </div>
                        {/* Button to redirect to video page */}
                        <button
                            onClick={handleRedirectToVideo}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Have Live Interview Call
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

