// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useContext } from 'react'

import { RscStyleContext } from './serverContext'

/** `string` to be passed to client over network */
export const useServerComponentsStyle = () => useContext(RscStyleContext)
