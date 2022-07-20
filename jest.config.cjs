'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const fs = require('node:fs')

/* eslint-disable n/no-sync */
/* eslint-disable github/unescaped-html-literal */

// eslint-disable-next-line n/no-unpublished-require
const { defineJestConfig } = require('@voltiso/config.jest.lib')

const allPackages = fs
	.readdirSync('./packages/')
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	.filter(p => fs.existsSync(`./packages/${p}/jest.config.cjs`))

module.exports = defineJestConfig({
	projects: allPackages.map(p => `<rootDir>/packages/${p}`),
})
