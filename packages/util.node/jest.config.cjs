'use strict'

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! extraneous require to avoid cyclic deps --- or not?
const jestEsrConfig = require('@voltiso/config.jest')

//! need to create a new unique object!
module.exports = {
	...jestEsrConfig,
}
