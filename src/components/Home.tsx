
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';

// Import your background image and compressed card images
import backgroundImage from './assets/yoyo.jpg'; // Replace with your background image

import VoiceflowBot from './voiceflowBot';
import cardImage1 from './assets/voiceass.png'; // Compressed Image for the first card
import cardImage2 from './assets/math.png'; // Compressed Image for the second card
import cardImage3 from './assets/aptitude.png'; // Compressed Image for the third card
import cardImage4 from './assets/gd.jpg'; // Compressed Image for the fourth card
import cardImage5 from './assets/roadmap.jpg'
import cardImage6 from './assets/th.jpg'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

export default function Home(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            color: '#FFFFFF'
        }}>
            {/* Navbar */}
            <Disclosure as="nav" style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)' }}>
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0">
                                        <h1 className="text-white font-bold text-xl">EduSaathi</h1>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${item.current ? 'bg-gray-900 text-white' : 'text-gray-300'}`}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>

            {/* Main Content */}
            <main style={{ padding: '2rem' }}>
                <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
                    <style>
                    {`
                        @keyframes fadeIn {
                            0% {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `}
                    </style>
                    <h1
                        style={{
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            opacity: 0,
                            transform: 'translateY(20px)',
                            animation: 'fadeIn 1s forwards',
                            animationDelay: '0.5s',
                        }}
                    >
                        Welcome to TechEd
                    </h1>
                    <div style={{ display: 'grid', gap: '1.5rem', margin: '0 auto' }}>
                        <Card 
                            title="Voice Call" 
                            description="Insights into Machine Learning concepts and projects." 
                            buttonLabel="Explore" 
                            image={cardImage1}
                            onButtonClick={() => navigate('/dashboard')}
                        />
                        <Card 
                            title="DSA Practice" 
                            description="Tools and techniques for data-driven decision making." 
                            buttonLabel="Explore" 
                            image={cardImage2}
                            onButtonClick={() => navigate('/dsa')}
                        />
                        <Card 
                            title="Aptitude Test"
                            description="Test your knowledge in DSA with MCQs and view performance metrics."
                            buttonLabel="Start Quiz"
                            image={cardImage3}
                            onButtonClick={() => navigate('/aptitude')} 
                        />
                        <Card 
                            title="Group Discussion" 
                            description="Live Group Discussion" 
                            buttonLabel="Live" 
                            image={cardImage4}
                            onButtonClick={() => navigate('/gd')} 
                        />
                          <Card 
                            title="AI Based Road Map Generator" 
                            description="Road Map" 
                            buttonLabel="Try Now" 
                            image={cardImage5}
                            onButtonClick={() => navigate('/roadmap')} 
                        />

                          <Card 
                            title="Enchaned Resume Convertor" 
                            description="Resume" 
                            buttonLabel="Try Now" 
                            image={cardImage6}
                            onButtonClick={() => navigate('/resume')} 
                        />
                    </div>
                </div>
            </main>
            {/* VoiceflowBot Component */}
            <div style={{ marginBottom: '2rem' }}>
                        <VoiceflowBot />
          </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}

function Card({ title, description, buttonLabel, image, onButtonClick }: { title: string; description: string; buttonLabel: string; image: string; onButtonClick?: () => void }) {
    return (
        <motion.div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)' }}
        >
            <img src={image} alt={title} style={{ width: '45%', borderRadius: '10px' }} />
            <div style={{ padding: '1rem', color: '#FFF', width: '50%' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h2>
                <p>{description}</p>
                <button 
                    onClick={onButtonClick} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                    {buttonLabel}
                </button>
            </div>
        </motion.div>
    );
}

// Footer Component
const Footer: React.FC = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.8), rgba(13, 17, 23, 0.6))',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#FFFFFF',
                padding: '2rem',
                textAlign: 'center',
                marginTop: '2rem',
            }}
        >
            <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About TechEd</h2>
                <p style={{ marginBottom: '1rem' }}>
                    TechEd is your go-to platform for technology education and resources. We provide
                    courses, tutorials, and a community for learners of all levels.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    Our mission is to empower individuals with the skills and knowledge needed to thrive
                    in a rapidly evolving tech landscape.
                </p>
            </div>
            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Follow Us</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF size={24} color="#ffffff" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} color="#ffffff" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn size={24} color="#ffffff" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} color="#ffffff" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} color="#ffffff" />
                    </a>
                </div>
            </div>
        </motion.footer>
    );
};