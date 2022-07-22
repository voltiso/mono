// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { IRootSchema } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import { getConstructorName } from './_/getConstructorName.js'
import type { InstanceOptions } from './_/InstanceOptions.js'
import { defaultInstanceOptions } from './_/InstanceOptions.js'
import type { CustomInstance } from './CustomInstance.js'
import { IS_INSTANCE, isInstance } from './IInstance.js'

export class Instance__<O extends InstanceOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomInstance<O>
{
	readonly [IS_INSTANCE] = true as const

	get getConstructor(): O['constructor'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].constructor
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: IRootSchema): boolean {
		if (isInstance(other)) return this.getConstructor === other.getConstructor
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!(x instanceof this.getConstructor)) {
			issues.push(
				new s.ValidationIssue({
					name: 'instanceof',
					expected: this.getConstructor.name,
					received: getConstructorName(x),
				}),
			)
		}

		return issues
	}
}

export class Instance_<T extends object> extends Instance__<never> {
	constructor(constructor: abstract new (...args: never[]) => T) {
		super({ ...defaultInstanceOptions, constructor } as never)
	}
}
