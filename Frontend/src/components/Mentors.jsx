import React from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const InstructorListing = () => {
    const instructors = [
        {
            id: 1,
            name: 'Darrell Steward',
            role: 'UX/UI designer',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            rating: 4.8,
            reviews: '44k reviews',
            image: 'plaid-shirt'
        },
        {
            id: 2,
            name: 'Kathryn Murphy',
            role: 'Data Scientist',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            rating: 4.8,
            reviews: '44k reviews',
            image: 'denim-shirt'
        },
        {
            id: 3,
            name: 'Brooklyn Simmons',
            role: 'Data Analysis',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            rating: 4.8,
            reviews: '44k reviews',
            image: 'office-casual'
        },
        {
            id: 4,
            name: 'Esther Howard',
            role: 'UX/UI designer',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            rating: 4.8,
            reviews: '44k reviews',
            image: 'glasses-casual'
        }
    ];

    // Generate avatar placeholder with initials
    const getAvatarContent = (name, type) => {
        const initials = name.split(' ').map(n => n[0]).join('');

        const avatarStyles = {
            'plaid-shirt': 'bg-gradient-to-br from-red-200 to-red-300',
            'denim-shirt': 'bg-gradient-to-br from-blue-200 to-blue-300',
            'office-casual': 'bg-gradient-to-br from-gray-200 to-gray-300',
            'glasses-casual': 'bg-gradient-to-br from-amber-200 to-amber-300'
        };

        return {
            style: avatarStyles[type] || 'bg-gradient-to-br from-gray-200 to-gray-300',
            initials
        };
    };

    return (
        <div className="w-full flex justify-center my-12 bg-violet-100">
            <div className="max-w-7xl mx-auto p-6 min-h-screen">
                <div className="">
                    <h1 className="text-4xl font-bold text-primary py-12">Meet our professional <br /> mentors.</h1>
                </div>
                {/* Instructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {instructors.map((instructor) => {
                        const avatar = getAvatarContent(instructor.name, instructor.image);

                        return (
                            <div key={instructor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                {/* Instructor Image */}
                                <div className="h-64 bg-gray-100 relative overflow-hidden">
                                    <div className={`w-full h-full ${avatar.style} flex items-center justify-center relative`}>
                                        {/* Simulated person silhouette */}
                                        <div className="absolute bottom-0 w-32 h-32 bg-white bg-opacity-20 rounded-full"></div>
                                        <div className="absolute bottom-8 w-20 h-20 bg-white bg-opacity-30 rounded-full"></div>
                                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white text-opacity-50">
                                            {avatar.initials}
                                        </div>

                                        {/* Add some clothing details based on type */}
                                        {instructor.image === 'plaid-shirt' && (
                                            <div className="absolute bottom-16 w-24 h-16 bg-red-400 bg-opacity-40 rounded-t-full"></div>
                                        )}
                                        {instructor.image === 'denim-shirt' && (
                                            <div className="absolute bottom-16 w-24 h-16 bg-blue-400 bg-opacity-40 rounded-t-full"></div>
                                        )}
                                        {instructor.image === 'office-casual' && (
                                            <div className="absolute bottom-16 w-24 h-16 bg-gray-400 bg-opacity-40 rounded-t-full"></div>
                                        )}
                                        {instructor.image === 'glasses-casual' && (
                                            <>
                                                <div className="absolute bottom-16 w-24 h-16 bg-white bg-opacity-40 rounded-t-full"></div>
                                                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-3 border-2 border-white border-opacity-50 rounded-full"></div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Instructor Content */}
                                <div className="p-6">
                                    {/* Instructor Name */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{instructor.name}</h3>

                                    {/* Role */}
                                    <div className="text-sm text-gray-500 mb-4">{instructor.role}</div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">{instructor.description}</p>

                                    {/* Rating */}
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold text-gray-900 mr-2">{instructor.rating}</span>
                                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-3" />
                                        <span className="text-sm text-gray-500">({instructor.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4">
                    <button className="p-3 rounded-full bg-white hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 rounded-full bg-white hover:bg-gray-50 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorListing;