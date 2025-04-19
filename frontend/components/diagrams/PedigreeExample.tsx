import React, { useState } from 'react';
import styles from '../../styles/PedigreeExample.module.css';

interface Goat {
  id: number;
  name: string;
  sire?: Goat;
  dam?: Goat;
}

const PedigreeExample: React.FC = () => {
  const [selectedGoat, setSelectedGoat] = useState<Goat | null>(null);

  const goats: Goat[] = [
    { id: 1, name: 'Goat 1' },
    { id: 2, name: 'Goat 2', sire: { id: 1, name: 'Goat 1' } },
    { id: 3, name: 'Goat 3', dam: { id: 1, name: 'Goat 1' } },
    { id: 4, name: 'Goat 4', sire: { id: 2, name: 'Goat 2' }, dam: { id: 3, name: 'Goat 3' } },
  ];

  const handleGoatClick = (goat: Goat) => {
    setSelectedGoat(goat);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Interactive Pedigree Example</h2>
      <div className={styles.pedigreeChart}>
        {goats.map((goat) => (
          <div key={goat.id} className={styles.goat} onClick={() => handleGoatClick(goat)}>
            {goat.name}
          </div>
        ))}
      </div>
      {selectedGoat && (
        <div className={styles.details}>
          <h3>Details for {selectedGoat.name}</h3>
          <p>Sire: {selectedGoat.sire ? selectedGoat.sire.name : 'Unknown'}</p>
          <p>Dam: {selectedGoat.dam ? selectedGoat.dam.name : 'Unknown'}</p>
        </div>
      )}
    </div>
  );
};

export default PedigreeExample;
