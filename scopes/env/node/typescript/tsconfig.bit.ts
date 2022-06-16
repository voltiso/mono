/**
 * ☁ Voltiso 🗲 `tsconfig.bit.js`
 *  - Used as `teambit` base config
 *  - Does not mess with includes, excludes, etc. - things that are really project-specific
 */
export const tsConfigBit = {
	compilerOptions: {
		// "composite": true, // possibly need to overwrite for TSUP builds!
		declaration: true,
		// "emitDeclarationOnly": true,
		// "noEmit": true,
		sourceMap: true,

		//

		/** make things modern by default */
		lib: ['ESNext'],
		// "lib": ["ESNext", "DOM", "DOM.Iterable"],
		module: 'ESNext', // unused - tsup?
		target: 'ESNext',
		moduleResolution: 'node',

		strict: true,
		esModuleInterop: true, // allows `import x from 'x'` where `import x = require('x') would be required otherwise`
		skipLibCheck: true, // ⚡⚡⚡ ! SET TO TRUE FOR FASTER BUILDS ! ⚡⚡⚡
		skipDefaultLibCheck: true,
		forceConsistentCasingInFileNames: true, // assume case-sensitive filesystem

		isolatedModules: true, // required for single-file build tools
		resolveJsonModule: true, // enable importing json
		experimentalDecorators: true, // nice to have
		emitDecoratorMetadata: true, // extra runtime code... not sure if needed - not by Transactor anyway

		allowJs: true,
		checkJs: true,

		jsx: 'react-jsx', // for ts-jest
		// "jsx": "preserve", // for next.js - they implement their own transforms

		disableSizeLimit: true,

		//
		// ______________________ STRICT options _______________________
		alwaysStrict: true,
		strictNullChecks: true,
		strictBindCallApply: true,
		strictFunctionTypes: true,
		strictPropertyInitialization: true,
		noImplicitAny: true,
		noImplicitThis: true,
		useUnknownInCatchVariables: true,
		//
		exactOptionalPropertyTypes: true,
		noImplicitReturns: true,
		noUnusedLocals: true,
		noUnusedParameters: true,
		noFallthroughCasesInSwitch: true,
		noImplicitOverride: true,
		noPropertyAccessFromIndexSignature: true,
		noUncheckedIndexedAccess: true,
		allowUnusedLabels: false, // undefined = warning
		allowUnreachableCode: false, // undefined = warning
		// ______________________ STRICT options _______________________
		//
	},
}
