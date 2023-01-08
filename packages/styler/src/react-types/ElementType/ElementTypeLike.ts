// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicElementLike } from '~/Stylable'

export type ReactElementLike<P = any> = {
	type: any
	props: P
	key: any
}

export type FunctionComponentLike<P = any> = {
	(props: any): ReactElementLike<P> | null
}

export type ComponentLike<P = any> = {
	render(): any
	readonly props: Readonly<P>
}

export type ComponentClassLike<P = any> = {
	new (props: P, context?: any): ComponentLike<P>
}

export type ElementTypeLike =
	| IntrinsicElementLike
	| ComponentClassLike
	| FunctionComponentLike
