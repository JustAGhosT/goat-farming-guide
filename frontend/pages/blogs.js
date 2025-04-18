import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Blogs.module.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/content/getBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogin = () => {
    // Hardcoded authentication for now
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddEditBlog = async (id) => {
    if (!title || !content || !author) {
      alert('Title, content, and author are required.');
      return;
    }

    try {
      const response = await axios.post('/api/content/addEditBlog', {
        id,
        title,
        content,
        author,
      }, {
        headers: {
          Authorization: 'Bearer hardcoded-token',
        },
      });

      if (id) {
        setBlogs(blogs.map(blog => (blog.id === id ? response.data : blog)));
      } else {
        setBlogs([...blogs, response.data]);
      }

      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding or editing blog:', error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Blogs</h1>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </header>
      <section className={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.blogCard}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author}</p>
            {isAuthenticated && (
              <button onClick={() => {
                setTitle(blog.title);
                setContent(blog.content);
                setAuthor(blog.author);
                handleAddEditBlog(blog.id);
              }}>Edit</button>
            )}
          </div>
        ))}
      </section>
      {isAuthenticated && (
        <section className={styles.addEditBlog}>
          <h2>{title ? 'Edit Blog' : 'Add Blog'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddEditBlog();
          }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <button type="submit">{title ? 'Update' : 'Add'}</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Blogs;
