import { codeFiles } from '../files'

export const cssOverride = {
	files: [...codeFiles, '*.css'],

	plugins: ['css'],

	extends: [
		// 'plugin:css/recommended',
		'plugin:css/all',
	],

	settings: {
		css: {
			target: {
				attributes: [
					'css', // The plugin will also parse `css` attribute.
				],
			},
		},
	},
}
