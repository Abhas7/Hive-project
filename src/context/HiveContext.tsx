import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Client } from '@hiveio/dhive'

interface HiveContextType {
  client: Client
  user: string | null
  login: (username: string) => Promise<boolean>
  logout: () => void
  isLoggedIn: boolean
  postToHive: (title: string, body: string, tags: string[], beneficiaries?: {account: string, weight: number}[]) => Promise<any>
}

const HiveContext = createContext<HiveContextType | undefined>(undefined)

export const useHive = () => {
  const context = useContext(HiveContext)
  if (context === undefined) {
    throw new Error('useHive must be used within a HiveProvider')
  }
  return context
}

interface HiveProviderProps {
  children: ReactNode
}

export const HiveProvider = ({ children }: HiveProviderProps) => {
  const [client, setClient] = useState<Client>(() => {
    const nodes = JSON.parse(import.meta.env.VITE_HIVE_API_NODES || '["https://api.hive.blog"]')
    return new Client(nodes)
  })
  const [user, setUser] = useState<string | null>(localStorage.getItem('hiveUser'))
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('hiveUser'))

  useEffect(() => {
    // Check if Hive Keychain is available
    const checkKeychain = () => {
      return typeof window !== 'undefined' && 'hive_keychain' in window
    }

    if (!checkKeychain()) {
      console.warn('Hive Keychain extension not detected. Some features may not work.')
    }
  }, [])

  const login = async (username: string): Promise<boolean> => {
    try {
      // In a real app, you would verify the user with Hive Keychain
      // For demo purposes, we're just setting the username
      localStorage.setItem('hiveUser', username)
      setUser(username)
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('hiveUser')
    setUser(null)
    setIsLoggedIn(false)
  }

  const postToHive = async (
    title: string, 
    body: string, 
    tags: string[], 
    beneficiaries: {account: string, weight: number}[] = []
  ) => {
    if (!user) throw new Error('User not logged in')
    
    // In a real implementation, this would use Hive Keychain to sign and broadcast
    // For demo purposes, we'll make an API call to our backend
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: user,
          title,
          body,
          tags,
          beneficiaries
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to post to Hive')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error posting to Hive:', error)
      throw error
    }
  }

  const value = {
    client,
    user,
    login,
    logout,
    isLoggedIn,
    postToHive
  }

  return <HiveContext.Provider value={value}>{children}</HiveContext.Provider>
}