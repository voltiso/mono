// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function inject<Context extends object, Args extends unknown[], Result>(
	func: (this: Context, ...args: Args[]) => Result,
	context: Context,
): (this: never, ...args: Args[]) => Result {
	return Function.prototype.bind.call(func, context) as never
}
