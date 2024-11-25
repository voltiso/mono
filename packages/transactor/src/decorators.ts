// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'

import type { $$Doc } from './Doc'
import * as h from './Doc/_/triggerCreators'
import type { DocDerivedData } from './DocConstructor'
import { TransactorError } from './error'
import type { Method } from './Method'
import type {
	AfterTrigger,
	OnGetTrigger,
	Trigger,
	TriggerReturn,
} from './Trigger'

interface MethodDecorator<
	Cls extends object = object,
	Method extends (...args: any) => unknown = (...args: any) => unknown,
> {
	/** Stage 3 - esbuild 0.24.0 */
	(originalMethod: Method, context: ClassMethodDecoratorContext): void

	/** Stage 2 - not supported */
	// (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void

	/** Stage 1 - esbuild 0.17.19 */
	(cls: Cls, methodName: string): void
}

function createMethodDecorator<
	Doc extends $$Doc,
	Method extends (...args: any) => unknown,
>(
	decoratorImplementation: (
		mutableMetadata: DocDerivedData,
		name: string,
		implementation: Method,
	) => void,
): MethodDecorator<Doc, Method> {
	function decorator(
		...args:
			| [(...args: unknown[]) => unknown, ClassMethodDecoratorContext]
			| [parent: { constructor: { _: DocDerivedData } }, methodName: string]
	) {
		if (typeof args[1] === 'string') {
			// assume [class, methodName]
			// eslint-disable-next-line sonarjs/destructuring-assignment-syntax
			const name = args[1]
			const cls = args[0]
			$AssumeType<{ constructor: { _: DocDerivedData } }>(cls)
			const mutableMetadata = cls.constructor._
			const implementation = cls[
				name as keyof typeof cls
			] as unknown as () => Promise<TriggerReturn<$$Doc>>
			decoratorImplementation(mutableMetadata, name, implementation as never)
		} else if (
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			args[1] &&
			typeof args[1] === 'object' &&
			typeof args[1].name === 'string'
		) {
			const mutableMetadata = args[1].metadata as {
				methods?: {}
				onGets?: []
				afters?: []
				beforeCommits?: []
			}
			mutableMetadata.methods ??= {}
			mutableMetadata.onGets ??= []
			mutableMetadata.afters ??= []
			mutableMetadata.beforeCommits ??= []
			const name = args[1].name
			const implementation = args[0] as () => Promise<TriggerReturn<$$Doc>>
			decoratorImplementation(
				mutableMetadata as never,
				name,
				implementation as never,
			)
		} else throw new TransactorError('Unknown decorator arguments')
	}

	return decorator as never
}

function _method<
	Method extends (...args: any) => unknown,
	Name extends string = string,
>(mutableMetadata: DocDerivedData, name: Name, implementation: Method): void {
	$AssumeType<{ methods: Record<Name, Method> }>(mutableMetadata)
	mutableMetadata.methods[name] = implementation
}

export const method: MethodDecorator<$$Doc, Method> = createMethodDecorator<
	$$Doc,
	Method
>(_method)

//

export const afterCreateOrUpdate: MethodDecorator<
	$$Doc,
	AfterTrigger<$$Doc, boolean, true>
> = createMethodDecorator<$$Doc, AfterTrigger<$$Doc, boolean, true>>(
	h.createAfterCreateOrUpdateTrigger as never,
)

export const afterCreate: MethodDecorator<
	$$Doc,
	AfterTrigger<$$Doc, false, true>
> = createMethodDecorator<$$Doc, AfterTrigger<$$Doc, false, true>>(
	h.createAfterCreateTrigger as never,
)

export const afterDelete: MethodDecorator<
	$$Doc,
	AfterTrigger<$$Doc, true, false>
> = createMethodDecorator<$$Doc, AfterTrigger<$$Doc, true, false>>(
	h.createAfterDeleteTrigger as never,
)

export const afterUpdate: MethodDecorator<
	$$Doc,
	AfterTrigger<$$Doc, true, true>
> = createMethodDecorator<$$Doc, AfterTrigger<$$Doc, true, true>>(
	h.createAfterUpdateTrigger as never,
)

export const after: MethodDecorator<
	$$Doc,
	AfterTrigger<$$Doc>
> = createMethodDecorator<$$Doc, AfterTrigger<$$Doc>>(
	h.createAfterTrigger as never,
)

export const beforeCommit: MethodDecorator<
	$$Doc,
	Trigger.BeforeCommit<$$Doc>
> = createMethodDecorator<$$Doc, Trigger.BeforeCommit<$$Doc>>(
	h.createBeforeCommitTrigger as never,
)

export const onGet: MethodDecorator<
	$$Doc,
	OnGetTrigger<$$Doc>
> = createMethodDecorator<$$Doc, OnGetTrigger<$$Doc>>(
	h.createOnGetTrigger as never,
)
