// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PolymorphicGeneric } from './class/PolymorphicGeneric'

const polymorphicGenericId = /* @__PURE__ */ Symbol.for(
	'@voltiso/util/PolymorphicGeneric',
)

export interface Generics<PartialOptions extends {}> {
	[polymorphicGenericId]: PolymorphicGeneric<PartialOptions>
}
