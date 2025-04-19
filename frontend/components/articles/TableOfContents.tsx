import React from 'react';
import styles from './TableOfContents.module.css';

interface Heading {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  return (
    <nav className={styles.toc}>
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} className={styles[`level${heading.level}`]}>
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
