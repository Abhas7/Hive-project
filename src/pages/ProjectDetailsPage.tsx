import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHive } from '../context/HiveContext'
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, Calendar, User, Tag, ExternalLink } from 'lucide-react'

// Mock project data - in a real app, this would come from the Hive blockchain
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Hive Social Media Analytics',
    description: 'A platform that analyzes social media trends on the Hive blockchain and provides insights for content creators.',
    fullDescription: `
      ## Overview
      
      Hive Social Media Analytics is a comprehensive platform designed to help content creators understand their audience and optimize their content strategy on the Hive blockchain.
      
      ## Features
      
      - Real-time analytics dashboard
      - Content performance metrics
      - Audience demographics and insights
      - Competitor analysis
      - Trend identification and prediction
      - Customizable reports and alerts
      
      ## Technology Stack
      
      - Frontend: React.js with Tailwind CSS
      - Backend: Node.js with Express
      - Blockchain Integration: Hive JavaScript API
      - Data Processing: Apache Kafka and Spark
      - Database: MongoDB
      
      ## Revenue Model
      
      The platform operates on a freemium model:
      
      1. **Free Tier**: Basic analytics with limited historical data
      2. **Pro Tier ($9.99/month)**: Full analytics suite with 6 months of historical data
      3. **Enterprise Tier ($29.99/month)**: Advanced analytics, API access, and custom reports
      
      Payment is accepted in HIVE, HBD, or major cryptocurrencies.
    `,
    author: 'blockchain_dev',
    authorProfile: 'https://peakd.com/@blockchain_dev',
    tags: ['analytics', 'social-media', 'dashboard'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    createdAt: '2025-01-15',
    upvotes: 42,
    comments: 15,
    demoUrl: 'https://hive-analytics-demo.com',
    githubUrl: 'https://github.com/blockchain_dev/hive-analytics',
    blockchainUrl: 'https://hiveblocks.com/tx/abcdef123456',
  }
]

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { isLoggedIn, user } = useHive()
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [hasBookmarked, setHasBookmarked] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch project details
    setIsLoading(true)
    setTimeout(() => {
      const foundProject = MOCK_PROJECTS.find(p => p.id === id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        setError('Project not found')
      }
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleUpvote = () => {
    if (!isLoggedIn) {
      alert('Please log in to upvote this project')
      return
    }
    
    setHasUpvoted(!hasUpvoted)
    if (!hasUpvoted) {
      setProject({...project, upvotes: project.upvotes + 1})
    } else {
      setProject({...project, upvotes: project.upvotes - 1})
    }
  }

  const handleBookmark = () => {
    if (!isLoggedIn) {
      alert('Please log in to bookmark this project')
      return
    }
    
    setHasBookmarked(!hasBookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Project not found'}</h2>
        <Link to="/projects" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/projects" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Link>
        </div>
        
        {/* Project Header */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="h-64 overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{project.title}</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={handleUpvote}
                  className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    hasUpvoted 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 mr-1 ${hasUpvoted ? 'fill-indigo-800' : ''}`} />
                  {project.upvotes}
                </button>
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    hasBookmarked 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 mr-1 ${hasBookmarked ? 'fill-indigo-800' : ''}`} />
                  Save
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                <a 
                  href={project.authorProfile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600"
                >
                  @{project.author}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
                <span>{project.comments} comments</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.blockchainUrl && (
                <a 
                  href={project.blockchainUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Hexagon className="h-4 w-4 mr-2" />
                  View on Blockchain
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Description</h2>
            <div className="prose max-w-none">
              {project.fullDescription.split('\n').map((paragraph: string, index: number) => {
                if (paragraph.trim().startsWith('##')) {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace('##', '').trim()}</h3>
                } else if (paragraph.trim().startsWith('-')) {
                  return <li key={index} className="ml-6">{paragraph.replace('-', '').trim()}</li>
                } else if (paragraph.trim().startsWith('1.')) {
                  return <div key={index} className="ml-6 mb-2"><strong>{paragraph.split(')')[0]})</strong> {paragraph.split(')')[1]}</div>
                } else if (paragraph.trim()) {
                  return <p key={index} className="mb-4">{paragraph}</p>
                }
                return null
              })}
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments ({project.comments})</h2>
            
            {isLoggedIn ? (
              <div className="mb-8">
                <textarea
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Share your thoughts about this project..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md mb-8">
                <p className="text-gray-600">
                  Please <Link to="/login" className="text-indigo-600 hover:text-indigo-800">log in</Link> to leave a comment.
                </p>
              </div>
            )}
            
            {/* Sample comments - would be loaded from the blockchain in a real app */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">@crypto_enthusiast</div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
                <p className="text-gray-700">
                  This is an impressive project! I especially like the analytics dashboard and how it integrates with the Hive blockchain. Looking forward to seeing how this evolves.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">@web3_developer</div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
                <p className="text-gray-700">
                  Great work on the UI/UX! Have you considered adding support for other blockchains in the future? I think this could be valuable for cross-chain analytics.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">@blockchain_dev</div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
                <p className="text-gray-700">
                  Thanks for the feedback! Yes, we're planning to add support for other blockchains in the next phase of development. Our priority is to perfect the Hive integration first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage