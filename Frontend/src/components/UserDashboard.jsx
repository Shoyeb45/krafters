import React, { useState, useEffect } from 'react';
import { User, Edit3, Camera, Phone, Mail, MapPin, Calendar, Award, Brain, Heart, Loader, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log('Fetching user profile :');
                setLoading(true);

                const response = await fetch('http://localhost:4000/api/user/get-profile', {
                    method: 'GET', // Changed to POST as per your API
                    headers: {
                        'Content-Type': 'application/json',
                        // Add authorization header if needed
                        'token': localStorage.getItem('token')
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch user profile');
                }

                // Map API response to dashboard format
                const apiUser = data.user;
                const mappedUser = {
                    name: apiUser.name || "User Name",
                    email: apiUser.email || "No email provided",
                    gender: apiUser.gender || "Not Selected",
                    dob: apiUser.dob || "Not Selected",
                    phone: apiUser.phone || "0000000000",
                    test_score: apiUser.test_score || 0,
                    image: apiUser.image || "",
                    address: {
                        line1: apiUser.address?.line1 || "",
                        line2: apiUser.address?.line2 || ""
                    },
                    // Add default fields that might not be in API
                    inability: apiUser.inability || ["ADHD", "Dyslexia"], // You may need to add this field to your schema
                    joinDate: apiUser.createdAt ? new Date(apiUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : "Recently",
                    lastActive: "Today"
                };

                setUser(mappedUser);
                setError(null);
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to load user profile. Please try again.');
                // Set fallback data for demo purposes
                setUser({
                    name: "Demo User",
                    email: "demo@example.com",
                    gender: "Not Selected",
                    dob: "Not Selected",
                    phone: "0000000000",
                    test_score: 0,
                    image: "",
                    address: { line1: "", line2: "" },
                    inability: ["ADHD", "Dyslexia"],
                    joinDate: "Recently",
                    lastActive: "Today"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
        setLoading(false);
        setError("Please provide a valid user ID to load real data.");
    }
        , []);

    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            // Validate required fields
            if (!user.name || !user.phone || !user.dob || !user.gender) {
                setError("Please fill in all required fields (Name, Phone, Date of Birth, Gender)");
                setLoading(false);
                return;
            }

            // Create FormData for multipart/form-data request
            const formData = new FormData();
            formData.append('userId', user._id);
            formData.append('name', user.name);
            formData.append('gender', user.gender);
            formData.append('dob', user.dob);
            formData.append('phone', user.phone);
            formData.append('address', JSON.stringify(user.address));

            // Add image file if selected
            if (selectedImageFile) {
                formData.append('image', selectedImageFile);
            }

            const response = await fetch('http://localhost:4000/api/user/edit-user', {
                method: 'POST',
                headers: {
                    // Don't set Content-Type for FormData, browser will set it automatically with boundary
                    // Add authorization header if needed
                    'token': localStorage.getItem('token')
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsEditing(false);
                setError(null);
                setSelectedImageFile(null);

                // Update user image if it was uploaded
                if (selectedImageFile) {
                    setUser(prev => ({
                        ...prev,
                        image: imagePreview // Use the preview URL temporarily
                    }));
                }

                console.log('Profile updated successfully:', data.message);

                // Optionally refresh the data from server
                // You could call the fetch function again here

            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getInabilityColor = (inability) => {
        const colors = {
            'ADHD': 'bg-blue-100 text-blue-800',
            'Dyslexia': 'bg-purple-100 text-purple-800',
            'Autism': 'bg-green-100 text-green-800',
            'Anxiety': 'bg-orange-100 text-orange-800'
        };
        return colors[inability] || 'bg-gray-100 text-gray-800';
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">Loading your profile...</h2>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Connection Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg mb-6 p-6 border border-blue-100">
                    {error && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                            <span className="text-yellow-800 text-sm">Using cached data. Some information may not be current.</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-wide">Patient Dashboard</h1>
                                <p className="text-gray-600 text-lg">Personalized Care & Progress Tracking</p>
                            </div>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <Edit3 className="w-5 h-5" />
                            )}
                            <span>
                                {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 text-center">
                            <div className="relative mb-6">
                                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                                    {user.image || imagePreview ? (
                                        <img
                                            src={user.image || imagePreview}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover"
                                        />
                                    ) : (
                                        user.name.charAt(0).toUpperCase()
                                    )}
                                </div>

                                {isEditing && (
                                    <label className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg transition-colors">
                                        <Camera className="w-5 h-5" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            name="image"
                                        />
                                    </label>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                            <p className="text-gray-600 mb-4 text-lg">{user.email}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-center space-x-2 text-gray-700">
                                    <User className="w-5 h-5 text-blue-500" />
                                    <span className="text-lg">{user.gender}</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-gray-700">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    <span className="text-lg">{user.dob}</span>
                                </div>
                            </div>

                            {/* Inability Tags */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Conditions</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {user.inability.map((condition, index) => (
                                        <span
                                            key={index}
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${getInabilityColor(condition)}`}
                                        >
                                            {condition}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Test Score */}
                            <div className={`p-4 rounded-xl ${getScoreColor(user.test_score)} mb-4`}>
                                <div className="flex items-center justify-center space-x-2">
                                    <Award className="w-6 h-6" />
                                    <span className="text-lg font-semibold">Assessment Score</span>
                                </div>
                                <div className="text-3xl font-bold mt-2">{user.test_score}/100</div>
                            </div>

                            <div className="text-sm text-gray-500 space-y-1">
                                <p>Member since: {user.joinDate}</p>
                                <p>Last active: {user.lastActive}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                                <Mail className="w-6 h-6 text-blue-500" />
                                <span>Contact Information</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={user.phone}
                                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                                <Phone className="w-5 h-5 text-blue-500" />
                                                <span className="text-lg">{user.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={user.email}
                                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                            />
                                        ) : (
                                            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                                                <Mail className="w-5 h-5 text-blue-500" />
                                                <span className="text-lg">{user.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    {isEditing ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Address Line 1"
                                                value={user.address.line1}
                                                onChange={(e) => setUser({ ...user, address: { ...user.address, line1: e.target.value } })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Address Line 2"
                                                value={user.address.line2}
                                                onChange={(e) => setUser({ ...user, address: { ...user.address, line2: e.target.value } })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                                            <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                                            <div className="text-lg">
                                                <div>{user.address.line1}</div>
                                                <div className="text-gray-600">{user.address.line2}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Progress & Insights */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                                <Heart className="w-6 h-6 text-red-500" />
                                <span>Health & Progress Insights</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                                    <h4 className="font-semibold text-blue-800 mb-2 text-lg">Current Assessment</h4>
                                    <div className="text-3xl font-bold text-blue-600">{user.test_score}/100</div>
                                    <p className="text-blue-700 text-sm mt-2">
                                        {user.test_score >= 80 ? 'Excellent Progress!' : user.test_score >= 60 ? 'Good Progress' : 'Needs Attention'}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                                    <h4 className="font-semibold text-purple-800 mb-2 text-lg">Active Conditions</h4>
                                    <div className="text-3xl font-bold text-purple-600">{user.inability.length}</div>
                                    <p className="text-purple-700 text-sm mt-2">Conditions being managed</p>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                                    <h4 className="font-semibold text-green-800 mb-2 text-lg">Member Since</h4>
                                    <div className="text-lg font-bold text-green-600">{user.joinDate}</div>
                                    <p className="text-green-700 text-sm mt-2">Continuous care journey</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <h4 className="font-semibold text-yellow-800 mb-2">💡 Personalized Recommendations</h4>
                                <ul className="text-yellow-700 space-y-1 text-sm">
                                    <li>• Consider scheduling your next assessment within 2-3 months</li>
                                    <li>• Regular mindfulness exercises can help with ADHD management</li>
                                    <li>• Reading apps with dyslexia-friendly fonts are available in our resources</li>
                                </ul>
                            </div>

                            {/* Required Fields Notice */}
                            {isEditing && (
                                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">📝 Required Information</h4>
                                    <p className="text-blue-700 text-sm">
                                        Please ensure all required fields are filled: <strong>Name, Phone, Date of Birth, and Gender</strong>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Save Button for Mobile */}
                {isEditing && (
                    <div className="fixed bottom-6 right-6 lg:hidden">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;