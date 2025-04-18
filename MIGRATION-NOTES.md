# Migration Notes: Jekyll to Next.js

This document outlines common issues encountered during the migration from Jekyll to Next.js for the Goat Farming Guide project.

## Common Import Issues

### Missing Modules

If you encounter errors like:
- `Cannot find module '../utils/animationUtils' or its corresponding type declarations.`
- `Cannot find module './components/Combinations' or its corresponding type declarations.`

These are likely references to components from the previous personality test application that were not properly removed during migration.

### Solutions:

1. **Create placeholder modules**: We've created placeholder versions of these modules to prevent build errors.
   - `src/utils/animationUtils.ts` - Contains basic animation utilities
   - `src/components/Combinations.tsx` - A placeholder component

2. **Update imports**: If you find components importing these modules, consider updating them to use more appropriate modules for the goat farming guide.

3. **Remove unused components**: Components that heavily depend on these modules from the previous application should be removed or rewritten.

## Path Aliases

We've configured path aliases in `tsconfig.json` to make imports cleaner:

```json
{
  "paths": {
    "@/*": ["src/*"]
  }
}