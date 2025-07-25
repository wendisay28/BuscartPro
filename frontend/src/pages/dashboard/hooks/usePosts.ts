import { useState } from 'react';
import { Post } from '../types';

export const usePosts = (initialPosts: Post[] = []) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<'all' | 'micro' | 'blog'>('all');

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.type === activeTab;
  });

  const addPost = (newPost: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'author'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      author: {
        id: 'current-user',
        firstName: 'Usuario',
        lastName: 'Actual',
        userType: 'general'
      }
    };
    setPosts(prev => [post, ...prev]);
  };

  return {
    posts: filteredPosts,
    activeTab,
    setActiveTab,
    addPost,
  };
};
