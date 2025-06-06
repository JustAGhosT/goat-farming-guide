import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Resources.module.css';

interface Resource {
  id: string | number;
  title: string;
  description: string;
  filename: string;
  type: string;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Downloadable Resources</h1>
        <p>Explore our collection of downloadable resources to aid your goat farming journey.</p>
      </header>
      <section className={styles.resourcesList}>
        {resources.map((resource) => (
          <div key={resource.id} className={styles.resourceCard}>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={`/downloads/${resource.filename}`} download>
              Download {resource.type.toUpperCase()}
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resources;