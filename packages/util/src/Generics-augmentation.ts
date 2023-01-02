import type { PolymorphicGeneric } from './class/PolymorphicGeneric'

const polymorphicGenericId = /* @__PURE__ */ Symbol('PolymorphicGeneric')

export interface Generics<PartialOptions extends {}> {
	[polymorphicGenericId]: PolymorphicGeneric<PartialOptions>
}
