import {
    Disclosure,
    DisclosureButton,
} 
from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
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
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
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
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Home Page</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-2 text-sm text-gray-500">{description}</div>
                <button
                    className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    onClick={onButtonClick}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}
