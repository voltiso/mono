// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

/** Did not find typings... */
module.exports = {
	dev: true,
	filter: '.',
	indent: '  ',
	overrides: true,
	peer: true,
	pnpmOverrides: true,
	prod: true,
	resolutions: true,
	semverGroups: [],
	semverRange: '',

	sortAz: [
		'contributors',
		'dependencies',
		'devDependencies',
		'keywords',
		'peerDependencies',
		'resolutions',
		'scripts',
	],

	sortFirst: ['name', 'description', 'version', 'author'],

	source: [],
	versionGroups: [],
	workspace: true,
}
