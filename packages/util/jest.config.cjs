'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! extraneous require to avoid cyclic deps
// eslint-disable-next-line n/no-extraneous-require
const jestEsrConfig = require('@voltiso/config.jest.esr')

module.exports = {
	...jestEsrConfig,
}
