import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHive } from '../context/HiveContext'
import { Edit, Trash2, Plus, ExternalLink, AlertCircle } from 'lucide-react'

// Mock user data - in a real app, this would come from the Hive blockchain
const MOCK_USER_DATA = {
  username: 'blockchain_dev',
  displayName: 'Blockchain Developer',
  bio: 'Web3 enthusiast and blockchain developer. Building decentralized applications on Hive and other blockchains.',
  location: 'Bangalore, India',
  website: 'https://hive.io/',
  joinDate: '2023-05-15',
  reputation: 72,
  followers: 128,
  following: 75,
  projects: [
    {
      id: '1',
      title: 'Hive Social Media Analytics',
      description: 'A platform that analyzes social media trends on the Hive blockchain and provides insights for content creators.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      createdAt: '2025-01-15',
      upvotes: 42
    },
    {
      id: '3',
      title: 'Hive Content Monetization',
      description: 'A solution for content creators to monetize their work through the Hive blockchain with micropayments.',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      createdAt: '2025-01-05',
      upvotes: 27
    }
  ],
  earnings: {
    hive: 1250.75,
    hbd: 450.25,
    estimatedValue: 2150.50
  }
}

const ProfilePage = () => {
  const { isLoggedIn, user, logout } = useHive()
  const navigate = useNavigate()
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])
  
  // Fetch user data
  useEffect(() => {
    if (isLoggedIn && user) {
      // Simulate API call to fetch user data
      setIsLoading(true)
      setTimeout(() => {
        // In a real app, we would fetch this from the Hive blockchain
        setUserData({
          ...MOCK_USER_DATA,
          username: user
        })
        setIsLoading(false)
      }, 500)
    }
  }, [isLoggedIn, user])
  
  if (!isLoggedIn) {
    return null // Will redirect to login
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }
  
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Failed to load user data. Please try again later.</p>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-end -mt-16">
              <div className="md:mr-6">
                <div className="bg-white p-2 rounded-full inline-block shadow-lg">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                    {userData.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData.displayName}
                    </h1>
                    <p className="text-gray-600">@{userData.username}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <Link
                      to="/create-project"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font- medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Link>
                    <button
                      onClick={logout}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-4">{userData.bio}</p>
                <div className="flex flex-wrap gap-y-2">
                  {userData.location && (
                    <div className="w-full sm:w-1/2 flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.website && (
                    <div className="w-full sm:w-1/2 flex items-center text-gray-600">
                      <ExternalLink className="h-5 w-5 mr-2 text-gray-400" />
                      <a 
                        href={userData.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {userData.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  <div className="w-full sm:w-1/2 flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Joined {new Date(userData.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full sm:w-1/2 flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Reputation: {userData.reputation}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Hive Earnings</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">HIVE</div>
                    <div className="text-xl font-bold text-gray-900">{userData.earnings.hive.toFixed(2)}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">HBD</div>
                    <div className="text-xl font-bold text-gray-900">{userData.earnings.hbd.toFixed(2)}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Est. Value ($)</div>
                    <div className="text-xl font-bold text-gray-900">${userData.earnings.estimatedValue.toFixed(2)}</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Followers:</span> <span className="font-medium">{userData.followers}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Following:</span> <span className="font-medium">{userData.following}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
                  <Link
                    to="/create-project"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    New Project
                  </Link>
                </div>
                
                {userData.projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.projects.map((project: any) => (
                      <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              {new Date(project.createdAt).toLocaleDateString()} • {project.upvotes} upvotes
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-indigo-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                    <p className="text-gray-500 mb-4">Create your first project to showcase your skills</p>
                    <Link
                      to="/create-project"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <div className="text-sm text-gray-500 mb-1">2 days ago</div>
                    <p className="text-gray-800">
                      You received 15 upvotes on your project <span className="font-medium">Hive Social Media Analytics</span>
                    </p>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <div className="text-sm text-gray-500 mb-1">3 days ago</div>
                    <p className="text-gray-800">
                      You commented on <span className="font-medium">@web3_developer</span>'s project
                    </p>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <div className="text-sm text-gray-500 mb-1">5 days ago</div>
                    <p className="text-gray-800">
                      You created a new project <span className="font-medium">Hive Content Monetization</span>
                    </p>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <div className="text-sm text-gray-500 mb-1">1 week ago</div>
                    <p className="text-gray-800">
                      You received 25 HIVE as rewards for your contributions
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      defaultValue={userData.displayName}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      defaultValue={userData.bio}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={userData.location}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        defaultValue={userData.website}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage