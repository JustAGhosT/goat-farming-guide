import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Blogs.module.css';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async (): Promise<void> => {
      try {
        const response = await axios.get<Blog[]>('/api/content/getBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogin = (): void => {
    // Hardcoded authentication for now
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  const handleAddEditBlog = async (id?: string): Promise<void> => {
    if (!title || !content || !author) {
      alert('Title, content, and author are required.');
      return;
    }

    try {
      const response = await axios.post<Blog>('/api/content/addEditBlog', {
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
          <form onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleAddEditBlog();
          }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
            />
            <button type="submit">{title ? 'Update' : 'Add'}</button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Blogs;