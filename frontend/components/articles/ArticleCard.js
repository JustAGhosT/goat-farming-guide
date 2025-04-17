import React from 'react';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.card}>
      <Link href={`/topics/${article.topicId}/${article.slug}`}>
        <a>
          <img src={`/images/${article.featuredImage}`} alt={article.title} className={styles.image} />
          <div className={styles.content}>
            <h3 className={styles.title}>{article.title}</h3>
            <p className={styles.excerpt}>{article.excerpt}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ArticleCard;
