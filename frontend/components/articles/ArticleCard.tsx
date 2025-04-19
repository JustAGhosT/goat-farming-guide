import Link from 'next/link';
import React from 'react';
import styles from './ArticleCard.module.css';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  topicId: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className={styles.card}>
      <Link href={`/topics/${article.topicId}/${article.slug}`}>
        <img src={`/images/${article.featuredImage}`} alt={article.title} className={styles.image} />
        <div className={styles.content}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <p className={styles.author}>By {article.author}</p>
          <p className={styles.publishedDate}>{new Date(article.publishedDate).toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
