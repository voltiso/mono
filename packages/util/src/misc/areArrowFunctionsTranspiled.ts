// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '../nullish'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const areArrowFunctionsTranspiled = isDefined((() => {}).prototype)
