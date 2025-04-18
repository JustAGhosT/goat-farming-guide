import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Glossary.module.css';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms: string[];
  relatedArticles: string[];
}

const Glossary: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);

  useEffect(() => {
    const fetchTerms = async (): Promise<void> => {
      try {
        const response = await axios.get<GlossaryTerm[]>('/api/content/getGlossary');
        setTerms(response.data);
      } catch (error) {
        console.error('Error fetching glossary terms:', error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Farming Terminology Glossary</h1>
        <p>Learn the essential terms and definitions related to goat farming.</p>
      </header>
      <section className={styles.termsList}>
        {terms.map((term) => (
          <div key={term.id} className={styles.termCard}>
            <h2>{term.term}</h2>
            <p>{term.definition}</p>
            {term.relatedTerms.length > 0 && (
              <div className={styles.relatedTerms}>
                <h3>Related Terms:</h3>
                <ul>
                  {term.relatedTerms.map((relatedTerm) => (
                    <li key={relatedTerm}>{relatedTerm}</li>
                  ))}
                </ul>
              </div>
            )}
            {term.relatedArticles.length > 0 && (
              <div className={styles.relatedArticles}>
                <h3>Related Articles:</h3>
                <ul>
                  {term.relatedArticles.map((relatedArticle) => (
                    <li key={relatedArticle}>{relatedArticle}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Glossary;