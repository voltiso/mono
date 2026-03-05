// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Typeof<X> = X extends string
	? 'string'
	: X extends number
		? 'number'
		: X extends bigint
			? 'bigint'
			: X extends boolean
				? 'boolean'
				: X extends symbol
					? 'symbol'
					: X extends undefined
						? 'undefined'
						: X extends object
							? 'object'
							: X extends (...args: never[]) => void
								? 'function'
								: never
