
import {
    Disclosure,
    DisclosureButton,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

// Import your background image
import backgroundImage from './assets/yech2.jpg'; // Replace with your image file name

interface User {
    name: string;
    email: string;
}

const user: User = {
    name: 'Tom Cook',
    email: 'tom@example.com',
};

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function classNames(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export default function Home(): JSX.Element {
    const navigate = useNavigate();
    
    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundImage: `url(${backgroundImage})`, // Use the imported image
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            color: '#FFFFFF' // Optional: Set text color for better readability
        }}>
            <Disclosure as="nav" style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)' }}>
                {({ open }) => (
                    <>
                        <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 1rem' }}>
                            <div style={{ display: 'flex', height: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h1 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginRight: '1rem', display: 'none', md: 'block' }}>
                                        Home Page
                                    </h1>
                                    <div style={{ display: 'none', md: 'block' }}>
                                        <div style={{ marginLeft: '2.5rem', display: 'flex', gap: '1rem' }}>
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (item.href === '/dashboard') {
                                                            navigate('/dashboard');
                                                        }
                                                    }}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    style={{
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem 0.75rem',
                                                        fontSize: '0.875rem',
                                                        fontWeight: '500',
                                                        color: item.current ? '#fff' : '#D1D5DB',
                                                        backgroundColor: item.current ? '#1F2937' : 'transparent',
                                                        transition: 'all 0.3s ease-in-out',
                                                        textDecoration: 'none',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#374151'; e.currentTarget.style.color = '#fff'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = item.current ? '#1F2937' : 'transparent'; e.currentTarget.style.color = item.current ? '#fff' : '#D1D5DB'; }}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ marginRight: '-0.5rem', display: 'flex', md: 'none' }}>
                                        <Disclosure.Button style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '0.375rem',
                                            backgroundColor: '#1F2937',
                                            padding: '0.5rem',
                                            color: '#9CA3AF',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            transition: 'background-color 0.3s ease',
                                        }}>
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel style={{ display: 'block', md: 'none' }}>
                            <div style={{ padding: '0.5rem 0', marginBottom: '1rem' }}>
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (item.href === '/dashboard') {
                                                navigate('/dashboard');
                                            }
                                        }}
                                        aria-current={item.current ? 'page' : undefined}
                                        style={{
                                            display: 'block',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem 0.75rem',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            color: item.current ? '#fff' : '#D1D5DB',
                                            backgroundColor: item.current ? '#1F2937' : 'transparent',
                                            transition: 'all 0.3s ease-in-out',
                                            textDecoration: 'none',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#374151'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = item.current ? '#1F2937' : 'transparent'; e.currentTarget.style.color = item.current ? '#fff' : '#D1D5DB'; }}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <header style={{ backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: 'none' }}>
                <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '1.5rem 1rem' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
                        Home Page
                    </h1>
                </div>
            </header>

            <main>
                <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '1.5rem 1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <Card title="Voice Call" description="Insights into Machine Learning concepts and projects." buttonLabel="Explore ML" onButtonClick={() => navigate('/dashboard')} />
                        <Card title="Find Places" description="Tools and techniques for data-driven decision making." buttonLabel="Explore Data" />
                        <Card title="Aptitude" description="Best practices and projects in Python development." buttonLabel="Learn Python" />
                        <Card title="Resources" description="Best practices and projects in Python development." buttonLabel="Learn Python" />
                    </div>
                </div>
            </main>
        </div>
    );
}

function Card({ title, description, buttonLabel, onButtonClick }: { title: string; description: string; buttonLabel: string; onButtonClick?: () => void }) {
    return (
        <div
            style={{
                overflow: 'hidden',
                borderRadius: '0.5rem',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#111827' }}>{title}</h3>
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>{description}</div>
                <button
                    style={{
                        marginTop: '1rem',
                        borderRadius: '0.375rem',
                        backgroundColor: '#4F46E5',
                        padding: '0.5rem 1rem',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4338CA'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#4F46E5'; e.currentTarget.style.transform = 'scale(1)'; }}
                    onClick={onButtonClick}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}
