// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'
import type { Subscription, UnaryFunction } from 'rxjs'

import type { IObserver } from './IObserver'

export type IOperatorFunction = UnaryFunction<IObservable, IObservable>

export interface IObservable {
	subscribe(observer?: Partial<IObserver>): Subscription
	subscribe(next: BivariantCallable<(value: unknown) => void>): Subscription

	subscribe(
		observerOrNext?:
			| Partial<IObserver>
			| BivariantCallable<(value: unknown) => void>
			| null,
	): Subscription

	forEach(next: BivariantCallable<(value: unknown) => void>): Promise<void>

	pipe(...operations: IOperatorFunction[]): IObservable
}
