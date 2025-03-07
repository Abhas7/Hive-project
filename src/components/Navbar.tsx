import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHive } from '../context/HiveContext'
import { Menu, X, Code, Hexagon } from 'lucide-react'

const Navbar = () => {
  const { isLoggedIn, user, logout } = useHive()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Hexagon className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Code Hive India</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:text-white">
                Home
              </Link>
              <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:text-white">
                Projects
              </Link>
              {isLoggedIn && (
                <Link to="/create-project" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:text-white">
                  Create Project
                </Link>
              )}
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 hover:text-white">
                    Profile ({user})
                  </Link>
                  <button 
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium bg-green-500 hover:bg-green-600">
                  Login
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            {isLoggedIn && (
              <Link 
                to="/create-project" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Project
              </Link>
            )}
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile ({user})
                </Link>
                <button 
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-green-500 hover:bg-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar