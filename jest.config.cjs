'use strict'

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// const fs = require('node:fs')

const { defineJestConfig } = require('@voltiso/config.jest.lib')

// const allPackages = fs
// 	.readdirSync('./packages/')
// 	// eslint-disable-next-line security/detect-non-literal-fs-filename
// 	.filter(p => fs.existsSync(`./packages/${p}/jest.config.cjs`))

// // eslint-disable-next-line no-console
// console.log('jest config: allPackages:', allPackages)

module.exports = defineJestConfig({
	// projects: allPackages.map(p => `<rootDir>/packages/${p}`),

	projects: [
		'packages/*/jest.config.cjs',
		//
	],
})
