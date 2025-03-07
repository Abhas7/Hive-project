import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ArrowUpRight } from 'lucide-react'

// Mock project data - in a real app, this would come from the Hive blockchain
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Hive Social Media Analytics',
    description: 'A platform that analyzes social media trends on the Hive blockchain and provides insights for content creators.',
    author: 'blockchain_dev',
    tags: ['analytics', 'social-media', 'dashboard'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2025-01-15',
    upvotes: 42
  },
  {
    id: '2',
    title: 'Decentralized Marketplace',
    description: 'A peer-to-peer marketplace built on Hive blockchain for buying and selling digital products with cryptocurrency.',
    author: 'crypto_trader',
    tags: ['marketplace', 'ecommerce', 'defi'],
    imageUrl: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2025-01-10',
    upvotes: 38
  },
  {
    id: '3',
    title: 'Hive Content Monetization',
    description: 'A solution for content creators to monetize their work through the Hive blockchain with micropayments.',
    author: 'content_creator',
    tags: ['monetization', 'content', 'payments'],
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2025-01-05',
    upvotes: 27
  },
  {
    id: '4',
    title: 'Decentralized Identity Verification',
    description: 'A secure identity verification system using Hive blockchain for authentication and authorization.',
    author: 'security_expert',
    tags: ['identity', 'security', 'authentication'],
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2025-01-01',
    upvotes: 31
  },
  {
    id: '5',
    title: 'Hive NFT Marketplace',
    description: 'A platform for creating, buying, and selling NFTs on the Hive blockchain with low transaction fees.',
    author: 'nft_enthusiast',
    tags: ['nft', 'marketplace', 'art'],
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    createdAt: '2024-12-28',
    upvotes: 45
  },
  {
    id: '6',
    title: 'Decentralized Voting System',
    description: 'A transparent and secure voting system built on Hive blockchain for organizational decision-making.',
    author: 'governance_pro',
    tags: ['voting', 'governance', 'dao'],
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2024-12-20',
    upvotes: 29
  }
]

const ProjectsPage = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(MOCK_PROJECTS.flatMap(project => project.tags))
  )

  // Filter and sort projects
  useEffect(() => {
    let filteredProjects = [...MOCK_PROJECTS]
    
    // Apply search filter
    if (searchTerm) {
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply tag filter
    if (selectedTag) {
      filteredProjects = filteredProjects.filter(project => 
        project.tags.includes(selectedTag)
      )
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === 'popular') {
      filteredProjects.sort((a, b) => b.upvotes - a.upvotes)
    }
    
    setProjects(filteredProjects)
  }, [searchTerm, selectedTag, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Projects
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover innovative projects built on the Hive blockchain by talented developers from around the world.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative inline-block text-left">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">All Categories</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <div className="relative inline-block text-left">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {project.upvotes} upvotes
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      By <span className="font-medium">{project.author}</span>
                    </div>
                    <Link 
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View Details
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedTag('')
                setSortBy('newest')
              }}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage