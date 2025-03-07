import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@hiveio/dhive';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Hive client
const hiveClient = new Client(
  JSON.parse(process.env.VITE_HIVE_API_NODES || '["https://api.hive.blog"]')
);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Get Hive account information
app.get('/api/account/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const accounts = await hiveClient.database.getAccounts([username]);
    
    if (accounts.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    res.json(accounts[0]);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account information' });
  }
});

// Post content to Hive blockchain
app.post('/api/post', async (req, res) => {
  try {
    const { author, title, body, tags, beneficiaries = [] } = req.body;
    
    // Validate required fields
    if (!author || !title || !body || !tags) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // In a real implementation, this would use the private key to post
    // For demo purposes, we'll just return a success response
    
    // Note: In production, you would use:
    // 1. Either Hive Keychain browser extension for client-side signing
    // 2. Or server-side signing with a secure private key (not recommended for security reasons)
    
    console.log('Would post to Hive blockchain:', { author, title, tags });
    
    // Simulate a successful post
    res.json({
      success: true,
      post_id: `${author}/${title.toLowerCase().replace(/\s+/g, '-')}`,
      timestamp: new Date(),
      message: 'Content posted successfully (simulated)'
    });
  } catch (error) {
    console.error('Error posting content:', error);
    res.status(500).json({ error: 'Failed to post content to Hive blockchain' });
  }
});

// Get trending posts from Hive
app.get('/api/trending', async (req, res) => {
  try {
    const { limit = 10, tag = '' } = req.query;
    const posts = await hiveClient.database.getDiscussions('trending', {
      tag,
      limit: parseInt(limit)
    });
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    res.status(500).json({ error: 'Failed to fetch trending posts' });
  }
});

// Get post details
app.get('/api/post/:author/:permlink', async (req, res) => {
  try {
    const { author, permlink } = req.params;
    const post = await hiveClient.database.call('get_content', [author, permlink]);
    
    if (!post || !post.author) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post details' });
  }
});

// Get account history (transactions, rewards, etc.)
app.get('/api/history/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { limit = 10 } = req.query;
    
    const history = await hiveClient.database.getAccountHistory(
      username,
      -1,
      parseInt(limit)
    );
    
    res.json(history);
  } catch (error) {
    console.error('Error fetching account history:', error);
    res.status(500).json({ error: 'Failed to fetch account history' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/health`);
});