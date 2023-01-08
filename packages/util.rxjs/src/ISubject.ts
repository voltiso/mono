// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObservable } from './IObservable'

export interface ISubject {
	closed: boolean
	next(value: unknown): void
	error(error: unknown): void
	complete(): void
	unsubscribe(): void
	get observed(): boolean
	asObservable(): IObservable
}

export interface IBehaviorSubject extends ISubject {
	get value(): unknown
	getValue(): unknown
}
