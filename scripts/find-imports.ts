import * as fs from 'fs';
import * as path from 'path';

// List of directories to search
const directories: string[] = ['src'];

// Extensions to check
const extensions: string[] = ['.ts', '.tsx', '.js', '.jsx'];

// Function to recursively search directories
function searchDirectory(dir: string): void {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      searchDirectory(filePath);
    } else if (extensions.includes(path.extname(file))) {
      checkImports(filePath);
    }
  });
}

// Function to check imports in a file
function checkImports(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
  
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    // Skip node_modules and relative imports that start with @/
    if (importPath.startsWith('@/') || !importPath.startsWith('.')) {
      continue;
    }
    
    // Check if the imported file exists
    try {
      const basedir = path.dirname(filePath);
      require.resolve(importPath, { paths: [basedir] });
    } catch (error) {
      console.log(`In file ${filePath}:`);
      console.log(`  Missing import: ${importPath}`);
    }
  }
}

// Start the search
directories.forEach(searchDirectory);

console.log('Import check completed.');