// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Have to default-import to get rid of the Next warning:
 *
 * `Attempted import error: 'createContext' is not exported from 'react'`
 */
import React from 'react'

// eslint-disable-next-line import/no-named-as-default-member
export const isServerComponent: boolean = !React.createContext
