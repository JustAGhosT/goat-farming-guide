import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchArticleDetails } from '../../../lib/api';
import styles from '../../../styles/Article.module.css';

interface ArticleData {
  title: string;
  excerpt: string;
  featuredImage: string;
  content: string;
}

const Article: React.FC = () => {
  const router = useRouter();
  const { topicSlug, articleSlug } = router.query;
  const [article, setArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    if (articleSlug && topicSlug) {
      const getArticleDetails = async () => {
        const articleData = await fetchArticleDetails(
          topicSlug as string, 
          articleSlug as string
        );
        setArticle(articleData);
      };

      getArticleDetails();
    }
  }, [articleSlug, topicSlug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
      </header>
      <section className={styles.content}>
        <img src={`/images/${article.featuredImage}`} alt={article.title} className={styles.featuredImage} />
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </section>
    </div>
  );
};

export default Article;