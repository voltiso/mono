// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ProtoCallableOptions } from './ProtoCallableOptions'

/** @internal Use `ProtoCallable` instead */
export type IProtoCallable = ProtoCallableOptions['call'] &
	ProtoCallableOptions['prototype'] &
	Record<keyof CallableFunction, unknown>

/** @internal Use `ProtoCallable` instead */
export type _ProtoCallable<Options extends ProtoCallableOptions> = [
	Options['call'] &
		Options['prototype'] &
		Record<Exclude<keyof CallableFunction, keyof Options['prototype']>, never>,
][0]
