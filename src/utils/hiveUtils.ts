import { Client } from '@hiveio/dhive';

// Initialize Hive client with multiple API nodes for redundancy
const nodes = JSON.parse(import.meta.env.VITE_HIVE_API_NODES || '["https://api.hive.blog"]');
const client = new Client(nodes);

// Check if Hive Keychain extension is available
export const isKeychainAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'hive_keychain' in window;
};

// Get account information
export const getAccount = async (username: string) => {
  try {
    const accounts = await client.database.getAccounts([username]);
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

// Get account balance
export const getAccountBalance = async (username: string) => {
  try {
    const account = await getAccount(username);
    if (!account) return null;
    
    return {
      hive: parseFloat(account.balance.split(' ')[0]),
      hbd: parseFloat(account.hbd_balance.split(' ')[0]),
      savings_hive: parseFloat(account.savings_balance.split(' ')[0]),
      savings_hbd: parseFloat(account.savings_hbd_balance.split(' ')[0]),
      vesting_shares: account.vesting_shares,
      delegated_vesting_shares: account.delegated_vesting_shares,
      received_vesting_shares: account.received_vesting_shares
    };
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
};

// Get trending posts
export const getTrendingPosts = async (tag = '', limit = 10) => {
  try {
    return await client.database.getDiscussions('trending', { tag, limit });
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

// Get post details
export const getPost = async (author: string, permlink: string) => {
  try {
    return await client.database.call('get_content', [author, permlink]);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// Format reputation score
export const formatReputation = (reputation: number | string): number => {
  if (typeof reputation === 'string') {
    reputation = parseInt(reputation);
  }
  
  let rep = Math.log10(Math.abs(reputation));
  rep = Math.max(rep - 9, 0);
  
  if (reputation < 0) {
    rep = -rep;
  }
  
  rep = (rep * 9) + 25;
  return Math.floor(rep);
};

// Calculate estimated account value in USD
export const calculateAccountValue = async (username: string): Promise<number> => {
  try {
    const balance = await getAccountBalance(username);
    if (!balance) return 0;
    
    // In a real implementation, you would fetch current market prices
    // For demo purposes, we'll use fixed prices
    const hivePrice = 0.25; // Example price in USD
    const hbdPrice = 1.00; // HBD is designed to be ~1 USD
    
    const totalValue = 
      (balance.hive * hivePrice) +
      (balance.hbd * hbdPrice) +
      (balance.savings_hive * hivePrice) +
      (balance.savings_hbd * hbdPrice);
      
    return totalValue;
  } catch (error) {
    console.error('Error calculating account value:', error);
    return 0;
  }
};

// Post content to Hive blockchain (client-side with Keychain)
export const postWithKeychain = (
  username: string,
  title: string,
  body: string,
  tags: string[],
  beneficiaries: {account: string, weight: number}[] = []
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!isKeychainAvailable()) {
      reject(new Error('Hive Keychain extension is not installed'));
      return;
    }
    
    const permlink = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 255);
      
    const operations = [];
    
    // Main comment operation
    const commentOp = [
      'comment',
      {
        parent_author: '',
        parent_permlink: tags[0],
        author: username,
        permlink,
        title,
        body,
        json_metadata: JSON.stringify({
          tags,
          app: 'code-hive-india/1.0.0',
        })
      }
    ];
    operations.push(commentOp);
    
    // Comment options operation (for beneficiaries)
    if (beneficiaries.length > 0) {
      const commentOptionsOp = [
        'comment_options',
        {
          author: username,
          permlink,
          max_accepted_payout: '1000000.000 HBD',
          percent_hbd: 10000,
          allow_votes: true,
          allow_curation_rewards: true,
          extensions: [
            [0, {
              beneficiaries
            }]
          ]
        }
      ];
      operations.push(commentOptionsOp);
    }
    
    // Use Hive Keychain to broadcast the operations
    window.hive_keychain.requestBroadcast(
      username,
      operations,
      'posting',
      (response: any) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.message));
        }
      }
    );
  });
};

export default {
  client,
  isKeychainAvailable,
  getAccount,
  getAccountBalance,
  getTrendingPosts,
  getPost,
  formatReputation,
  calculateAccountValue,
  postWithKeychain
};