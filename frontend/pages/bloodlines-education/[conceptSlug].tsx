import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchBloodlineConceptDetails } from '../../lib/api';
import styles from '../../styles/BloodlineConcept.module.css';

interface ConceptData {
  title: string;
  excerpt: string;
  featuredImage: string;
  content: string;
}

const BloodlineConcept: React.FC = () => {
  const router = useRouter();
  const { conceptSlug } = router.query;
  const [concept, setConcept] = useState<ConceptData | null>(null);

  useEffect(() => {
    if (conceptSlug) {
      const getConceptDetails = async () => {
        const conceptData = await fetchBloodlineConceptDetails(conceptSlug as string);
        setConcept(conceptData);
      };

      getConceptDetails();
    }
  }, [conceptSlug]);

  if (!concept) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{concept.title}</h1>
        <p>{concept.excerpt}</p>
      </header>
      <section className={styles.content}>
        <img src={`/images/${concept.featuredImage}`} alt={concept.title} className={styles.featuredImage} />
        <div dangerouslySetInnerHTML={{ __html: concept.content }} />
      </section>
    </div>
  );
};

export default BloodlineConcept;