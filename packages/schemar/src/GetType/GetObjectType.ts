// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, HasIndexSignature } from '@voltiso/util'

import type { SchemaOptions } from '~'

import type { GetType_, GetTypeOptions } from '.'
import type { GetOptions } from './GetOptions'

type GetObjectTypeNoSignature<
	T,
	O extends Record<keyof T, SchemaOptions>,
	IO extends GetTypeOptions,
> = Finalize<
	{
		[k in keyof T as O[k]['isReadonly'] extends false
			? IsOptional<O[k], IO, never, k>
			: never]: T[k]
	} & {
		[k in keyof T as O[k]['isReadonly'] extends false ? k : never]?: T[k]
	} & {
		readonly [k in keyof T as IsOptional<O[k], IO> extends false
			? k
			: never]: T[k]
	} & {
		readonly [k in keyof T]?: T[k]
	},
	IO
>

export type GetObjectType_<
	T extends object,
	IO extends GetTypeOptions,
> = HasIndexSignature<T> extends true
	? {
			[k in keyof T]: GetType_<T[k], IO>
	  }
	: HasIndexSignature<T> extends false
	? GetObjectTypeNoSignature<
			{
				[k in keyof T]: GetType_<T[k], IO>
			},
			{
				[k in keyof T]: GetOptions<T[k]>
			},
			IO
	  >
	: never

type IsOptional<
	O extends SchemaOptions,
	IO extends GetTypeOptions,
	T = true,
	F = false,
> = O['isOptional'] extends true
	? T
	: O['isStrictOptional'] extends true
	? T
	: O['hasDefault'] extends false
	? // : [O['default']] extends [undefined]
	  F
	: IO['kind'] extends 'in'
	? T
	: IO['kind'] extends 'out'
	? F
	: never

type Finalize<T, IO extends GetTypeOptions> = IO['kind'] extends 'in'
	? _<
			{
				[k in keyof T as object extends T[k] ? never : k]: T[k]
			} & {
				[k in keyof T as object extends T[k] ? k : never]?: T[k]
			}
	  >
	: IO['kind'] extends 'out'
	? _<T>
	: never
