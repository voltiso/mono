'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const { defineEslintConfig } = require('@voltiso/config.eslint.lib')

module.exports = defineEslintConfig({
	ignorePatterns: ['test/'],
})
