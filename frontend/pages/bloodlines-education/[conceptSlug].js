import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/BloodlineConcept.module.css';
import { fetchBloodlineConceptDetails } from '../../lib/api';

const BloodlineConcept = () => {
  const router = useRouter();
  const { conceptSlug } = router.query;
  const [concept, setConcept] = useState(null);

  useEffect(() => {
    if (conceptSlug) {
      const getConceptDetails = async () => {
        const conceptData = await fetchBloodlineConceptDetails(conceptSlug);
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
