// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isCallable } from '@voltiso/util'

import type { NestedSubject } from './_/NestedSubject'
import { NestedSubjectImpl } from './NestedSubjectImpl'

export function createNestedSubject<T>(
	getInitialValue?: (() => T) | undefined,
): NestedSubject<T>

export function createNestedSubject<T>(
	initialValue?: T | undefined,
): NestedSubject<T>

export function createNestedSubject<T>(
	initialValue?: T | (() => T) | undefined,
): NestedSubject<T>

// eslint-disable-next-line rxjs/finnish
export function createNestedSubject<T>(
	x?: T | (() => T) | undefined,
): NestedSubject<T> {
	const initialValue = isCallable(x) ? x() : x
	return new NestedSubjectImpl({ initialValue }) as never
}
