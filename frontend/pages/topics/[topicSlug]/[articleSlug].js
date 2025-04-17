import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Article.module.css';
import { fetchArticleDetails } from '../../../lib/api';

const Article = () => {
  const router = useRouter();
  const { topicSlug, articleSlug } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (articleSlug) {
      const getArticleDetails = async () => {
        const articleData = await fetchArticleDetails(topicSlug, articleSlug);
        setArticle(articleData);
      };

      getArticleDetails();
    }
  }, [articleSlug]);

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
