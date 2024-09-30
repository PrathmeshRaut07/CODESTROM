import React from 'react';

const ProfileCardsMentor = () => {
    const profiles = [
        {
            name: 'Heer Parekh',
            title: 'Company Secretary | LLB | Assistant Manager: Compliance - Godrej Capital',
            image: 'path_to_image1.jpg', // Add your image paths here
            borderColor: 'border-pink-300'
        },
        {
            name: 'Aanchal Jain',
            title: 'Mass Media | Jai Hind College | Assistant Director: Freelance',
            image: 'path_to_image2.jpg',
            borderColor: 'border-purple-300'
        },
        {
            name: 'Jainil Mehta',
            title: 'Chartered Accountant | CFA | Manager: PwC India',
            image: 'path_to_image3.jpg',
            borderColor: 'border-yellow-300'
        },
        {
            name: 'Parth Shah',
            title: 'Electrical & Electronics Engineer | IIT Bombay | Digital Design Verification Engineer: TI',
            image: 'path_to_image4.jpg',
            borderColor: 'border-pink-300'
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {profiles.map((profile, index) => (
                    <div key={index} className={`bg-white shadow-md rounded-lg p-6 text-center ${profile.borderColor}`}>
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
                        <p className="mt-2 text-sm text-gray-600">{profile.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCardsMentor;
