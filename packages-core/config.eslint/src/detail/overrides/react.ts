// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

export const react = defineEslintConfigOverride({
	files: codeFiles,

	plugins: ['react'],

	rules: {
		'react/boolean-prop-naming': 1,
		'react/button-has-type': 1,
		'react/default-props-match-prop-types': 1,

		'react/destructuring-assignment': 0, // god, why...

		'react/display-name': 1,
		'react/forbid-component-props': 1,
		'react/forbid-dom-props': 1,
		'react/forbid-elements': 1,
		'react/forbid-foreign-prop-types': 1,
		'react/forbid-prop-types': 1,

		'react/function-component-definition': [
			'warn',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],

		'react/hook-use-state': 1,
		'react/iframe-missing-sandbox': 1,
		'react/jsx-boolean-value': 1,
		'react/jsx-child-element-spacing': 1,
		'react/jsx-closing-bracket-location': 1,
		'react/jsx-closing-tag-location': 1,
		'react/jsx-curly-spacing': 1,
		'react/jsx-curly-newline': 1,
		'react/jsx-equals-spacing': 1,

		'react/jsx-filename-extension': [
			'warn',
			{ allow: 'as-needed', extensions: ['.jsx', '.tsx'] },
		],

		'react/jsx-first-prop-new-line': 1,

		'react/jsx-handler-names': 0, // bugged - does not allow `handlers.nameChanged`

		// 'react/jsx-handler-names': [
		// 	'warn',
		// 	{
		// 		eventHandlerPrefix: '',
		// 	},
		// ],

		'react/jsx-indent': 1,
		'react/jsx-indent-props': 1,
		'react/jsx-key': 1,

		'react/jsx-max-depth': 0,

		'react/jsx-max-props-per-line': 1,
		'react/jsx-newline': 1,

		'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],

		'react/jsx-no-comment-textnodes': 1,
		'react/jsx-no-constructed-context-values': 1,
		'react/jsx-no-duplicate-props': 1,
		'react/jsx-no-leaked-render': 1,

		'react/jsx-no-literals': 0,

		'react/jsx-no-script-url': 1,
		'react/jsx-no-target-blank': 1,

		'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],

		'react/jsx-one-expression-per-line': 1,
		'react/jsx-no-undef': 1,
		'react/jsx-curly-brace-presence': 1,
		'react/jsx-pascal-case': 1,
		'react/jsx-fragments': 1,
		'react/jsx-props-no-multi-spaces': 1,

		'react/jsx-props-no-spreading': 0, // spreading is useful

		'react/jsx-sort-default-props': 1,

		'react/jsx-sort-props': 0,

		'react/jsx-space-before-closing': 1,
		'react/jsx-tag-spacing': 1,
		'react/jsx-uses-react': 1,
		'react/jsx-uses-vars': 1,
		'react/jsx-wrap-multilines': 1,
		'react/no-invalid-html-attribute': 1,
		'react/no-access-state-in-setstate': 1,
		'react/no-adjacent-inline-elements': 1,
		'react/no-array-index-key': 1,
		'react/no-arrow-function-lifecycle': 1,
		'react/no-children-prop': 1,
		'react/no-danger': 1,
		'react/no-danger-with-children': 1,
		'react/no-deprecated': 1,
		'react/no-did-mount-set-state': 1,
		'react/no-did-update-set-state': 1,
		'react/no-direct-mutation-state': 1,
		'react/no-find-dom-node': 1,
		'react/no-is-mounted': 1,

		'react/no-multi-comp': 0, // can have several components per file

		'react/no-namespace': 1,
		'react/no-set-state': 1,
		'react/no-string-refs': 1,
		'react/no-redundant-should-component-update': 1,
		'react/no-render-return-value': 1,
		'react/no-this-in-sfc': 1,
		'react/no-typos': 1,
		'react/no-unescaped-entities': 1,
		'react/no-unknown-property': 1,
		'react/no-unsafe': 1,
		'react/no-unstable-nested-components': 1,
		'react/no-unused-class-component-methods': 1,

		'react/no-unused-prop-types': 0, // not using prop-types

		'react/no-unused-state': 1,
		'react/no-will-update-set-state': 1,
		'react/prefer-es6-class': 1,
		'react/prefer-exact-props': 1,
		'react/prefer-read-only-props': 1,
		'react/prefer-stateless-function': 1,

		'react/prop-types': 0, // not using prop-types

		'react/react-in-jsx-scope': 1,

		'react/require-default-props': 0, // not using prop-types

		'react/require-optimization': 0, // hmm
		'react/require-render-return': 1,
		'react/self-closing-comp': 1,
		'react/sort-comp': 1,

		'react/sort-prop-types': 0,

		'react/state-in-constructor': 1,
		'react/static-property-placement': 1,
		'react/style-prop-object': 1,
		'react/void-dom-elements-no-children': 1,
	},
} as const)
