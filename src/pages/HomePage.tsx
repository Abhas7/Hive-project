import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Hexagon, Award, Users, DollarSign } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Code Hive India Hackathon
              </h1>
              <p className="text-xl mb-8">
                Showcase your skills by solving real-world challenges using Hive Blockchain technology. Build, deploy, and earn.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/projects" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Blockchain Technology" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Participate?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Join the revolution in Web3 development and unlock new opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compete for Prizes</h3>
              <p className="text-gray-600">
                Selected teams will be invited to Tryst 2025, IIT Delhi's Annual Techfest, to present their projects and compete for top prizes.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Network & Connect</h3>
              <p className="text-gray-600">
                Engage with a vibrant blockchain community, make valuable connections, and contribute to the evolution of Web3.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5">
                <DollarSign className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Generate Revenue</h3>
              <p className="text-gray-600">
                Build and deploy projects on Hive Blockchain with the potential to generate real-world revenue and earn money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to participate and showcase your blockchain skills
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-10 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-indigo-600">Register & Form a Team</h3>
                  <p className="mt-2 text-gray-600">
                    Sign up on our platform and create or join a team of up to 4 members.
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold">
                  1
                </div>
                <div className="flex-1 md:pl-10 mt-4 md:mt-0">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Team Registration" 
                    className="rounded-lg shadow-md hidden md:block max-w-xs"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center md:mt-24">
                <div className="flex-1 md:text-right md:pr-10 mb-4 md:mb-0 md:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Project Development" 
                    className="rounded-lg shadow-md hidden md:block max-w-xs ml-auto"
                  />
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold">
                  2
                </div>
                <div className="flex-1 md:pl-10 mt-4 md:mt-0 md:order-0">
                  <h3 className="text-xl font-bold text-indigo-600">Develop Your Project</h3>
                  <p className="mt-2 text-gray-600">
                    Build a decentralized application (dApp) using Hive Blockchain technology.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center md:mt-24">
                <div className="flex-1 md:text-right md:pr-10 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-indigo-600">Submit & Deploy</h3>
                  <p className="mt-2 text-gray-600">
                    Submit your project and deploy it on the Hive Blockchain.
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold">
                  3
                </div>
                <div className="flex-1 md:pl-10 mt-4 md:mt-0">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Project Submission" 
                    className="rounded-lg shadow-md hidden md:block max-w-xs"
                  />
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center md:mt-24">
                <div className="flex-1 md:text-right md:pr-10 mb-4 md:mb-0 md:order-1">
                  <img 
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Presentation" 
                    className="rounded-lg shadow-md hidden md:block max-w-xs ml-auto"
                  />
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold">
                  4
                </div>
                <div className="flex-1 md:pl-10 mt-4 md:mt-0 md:order-0">
                  <h3 className="text-xl font-bold text-indigo-600">Present & Win</h3>
                  <p className="mt-2 text-gray-600">
                    Selected teams will present at Tryst 2025 and compete for prizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to Build the Future of Web3?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join Code Hive India Hackathon today and start your journey towards building innovative blockchain solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
              Register Now
            </Link>
            <Link to="/projects" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600">
              Browse Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage