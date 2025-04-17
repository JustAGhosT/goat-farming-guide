import React from 'react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({ headings }) => {
  return (
    <nav className={styles.toc}>
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
