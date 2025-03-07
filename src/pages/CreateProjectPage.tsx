import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHive } from '../context/HiveContext'
import { Upload, AlertCircle, Info } from 'lucide-react'

const CreateProjectPage = () => {
  const { isLoggedIn, user, postToHive } = useHive()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    tags: '',
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    beneficiaries: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  
  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.fullDescription) {
        throw new Error('Please fill in all required fields')
      }
      
      // Parse tags
      const tags = formData.tags.split(',').map(tag => tag.trim().toLowerCase())
      if (tags.length === 0) {
        throw new Error('Please add at least one tag')
      }
      
      // Parse beneficiaries (optional)
      let beneficiaries: {account: string, weight: number}[] = []
      if (formData.beneficiaries) {
        try {
          const beneficiaryEntries = formData.beneficiaries.split(',')
          beneficiaries = beneficiaryEntries.map(entry => {
            const [account, weightStr] = entry.split(':')
            const weight = parseInt(weightStr.trim())
            if (!account || isNaN(weight) || weight <= 0 || weight > 100) {
              throw new Error('Invalid beneficiary format')
            }
            return { account: account.trim(), weight: weight * 100 } // Convert to basis points (100% = 10000)
          })
        } catch (err) {
          throw new Error('Invalid beneficiary format. Use format: account:percentage, account2:percentage')
        }
      }
      
      // Create markdown content for Hive
      const markdownContent = `
# ${formData.title}

${formData.description}

![Project Image](${formData.imageUrl || 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'})

## Project Details

${formData.fullDescription}

## Links

${formData.demoUrl ? `- [Live Demo](${formData.demoUrl})` : ''}
${formData.githubUrl ? `- [GitHub Repository](${formData.githubUrl})` : ''}

---

*This project was submitted to the Code Hive India Hackathon.*
      `
      
      // In a real implementation, this would post to the Hive blockchain
      // For demo purposes, we'll simulate a successful post
      // await postToHive(formData.title, markdownContent, tags, beneficiaries)
      
      console.log('Project submitted successfully', {
        title: formData.title,
        content: markdownContent,
        tags,
        beneficiaries
      })
      
      // Redirect to projects page
      setTimeout(() => {
        navigate('/projects')
      }, 1000)
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit project')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (!isLoggedIn) {
    return null // Will redirect to login
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Project</h1>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Posting as: <span className="font-medium">@{user}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
            
            {previewMode ? (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{formData.title || 'Project Title'}</h2>
                <p className="mb-4">{formData.description || 'Project description will appear here.'}</p>
                
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Project Preview" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
                    }}
                  />
                )}
                
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Project Details</h3>
                  <div className="whitespace-pre-line">
                    {formData.fullDescription || 'Full project description will appear here.'}
                  </div>
                  
                  {(formData.demoUrl || formData.githubUrl) && (
                    <>
                      <h3 className="text-xl font-semibold mt-4 mb-2">Links</h3>
                      <ul>
                        {formData.demoUrl && (
                          <li>
                            <a href={formData.demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                              Live Demo
                            </a>
                          </li>
                        )}
                        {formData.githubUrl && (
                          <li>
                            <a href={formData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                              GitHub Repository
                            </a>
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
                
                {formData.tags && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {formData.beneficiaries && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Beneficiaries</h3>
                    <div className="text-sm text-gray-600">
                      {formData.beneficiaries.split(',').map((beneficiary, index) => {
                        const [account, weight] = beneficiary.split(':')
                        return (
                          <div key={index}>
                            @{account.trim()}: {weight.trim()}%
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="A brief summary of your project (1-2 sentences)"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700">
                      Full Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="fullDescription"
                      name="fullDescription"
                      rows={10}
                      value={formData.fullDescription}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Provide a detailed description of your project, including features, technology stack, and how it uses the Hive blockchain."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., defi, social-media, marketplace (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                      Project Image URL
                    </label>
                    <input
                      type="url"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Leave empty to use a default image
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700">
                        Demo URL
                      </label>
                      <input
                        type="url"
                        id="demoUrl"
                        name="demoUrl"
                        value={formData.demoUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://your-demo-site.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700">
                      Beneficiaries
                    </label>
                    <input
                      type="text"
                      id="beneficiaries"
                      name="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="e.g., account1:10, account2:5 (account:percentage, comma separated)"
                    />
                    <div className="mt-1 flex items-start">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        Optional. Specify accounts that will receive a percentage of the rewards. Format: account:percentage (e.g., codehive:10). Total percentage cannot exceed 100%.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => navigate('/projects')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Submit Project
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProjectPage