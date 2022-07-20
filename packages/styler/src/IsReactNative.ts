// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '@voltiso/util'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore this will fail under react-native (no `dom` lib)
type Document = typeof document

/** Determine environment - assumes `react-native` if there's no global `document` object */
export type IsReactNative = IsAny<Document>
