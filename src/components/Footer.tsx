import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Hexagon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Hexagon className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Code Hive India</span>
            </div>
            <p className="mt-4 text-gray-300">
              A platform for Web3 enthusiasts to showcase their skills by solving real-world challenges using Hive Blockchain technology.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://developers.hive.io/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  Hive Documentation
                </a>
              </li>
              <li>
                <a href="https://peakd.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  PeakD
                </a>
              </li>
              <li>
                <a href="https://hive.blog/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  Hive Blog
                </a>
              </li>
              <li>
                <a href="https://hiveprojects.io/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  Hive Projects
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Code Hive India Hackathon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer