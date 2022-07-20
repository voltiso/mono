// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import type { RootSchemable } from '../../schema/Schemable.js'
import * as s from '..'
import { isArray } from '../array'
import { _extends } from './_/_extends.js'
import { _extendsArray } from './_/_extendsArray.js'
import type { GetTupleLength } from './_/GetTupleLength.js'
import type { TupleOptions } from './_/TupleOptions.js'
import {
	defaultMutableTupleOptions,
	defaultReadonlyTupleOptions,
} from './_/TupleOptions.js'
import type { CustomTuple } from './CustomTuple.js'
import { IS_TUPLE, isTuple } from './ITuple.js'
import { isUnknownTuple } from './unknown'

export class Tuple__<O extends TupleOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomTuple<O>
{
	readonly [IS_TUPLE] = true

	get isReadonlyTuple(): O['readonlyTuple'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].readonlyTuple
	}

	get getLength(): GetTupleLength<O['elementSchemas']> {
		return this.getElementSchemas.length as never
	}

	get getElementSchemas(): O['elementSchemas'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].elementSchemas
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	get readonlyTuple(): never {
		return this._cloneWithOptions({ readonlyTuple: true }) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (
			(isTuple(other) || isUnknownTuple(other)) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isTuple(other)) return _extends(this, other)
		else if (isUnknownTuple(other)) return true
		else if (isArray(other)) return _extendsArray(this, other)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		if (!Array.isArray(x)) {
			issues.push(
				new s.ValidationIssue({
					name: 'Array.isArray',
					expected: true,
					received: false,
				}),
			)
		} else {
			if (this.getElementSchemas.length !== x.length)
				issues.push(
					new s.ValidationIssue({
						name: 'tuple size',
						expected: this.getElementSchemas.length,
						received: x.length,
					}),
				)

			for (
				let idx = 0;
				idx < Math.min(this.getElementSchemas.length, x.length);
				++idx
			) {
				// eslint-disable-next-line security/detect-object-injection
				const t = this.getElementSchemas[idx]
				// eslint-disable-next-line security/detect-object-injection
				const r = s.schema(t).tryValidate(x[idx])

				if (!r.isValid) {
					for (const issue of r.issues) issue.path = [...issue.path, idx]

					issues = [...issues, ...r.issues]
				}
			}
		}

		return issues
	}
}

//

export class MutableTuple_<T extends RootSchemable[]> extends Tuple__<never> {
	constructor(elementSchemas: T) {
		super({ ...defaultMutableTupleOptions, elementSchemas } as never)
	}
}

export class ReadonlyTuple_<T extends RootSchemable[]> extends Tuple__<never> {
	constructor(elementSchemas: T) {
		super({ ...defaultReadonlyTupleOptions, elementSchemas } as never)
	}
}
