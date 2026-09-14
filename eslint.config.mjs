import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

/**
 * Flat config. The previous `FlatCompat`-based version crashed on ESLint 10
 * ("Converting circular structure to JSON") because it loaded the legacy
 * eslintrc shareable config; `eslint-config-next` ships a flat config directly.
 */
const eslintConfig = defineConfig([
	...nextVitals,
	globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
