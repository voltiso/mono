// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type PromisifyHandlers<H> = H extends (...args: infer Args) => infer R
	? (...args: Args) => Promise<Awaited<R>> & {
			local: Promise<Awaited<R>>
			localOrRemote: Promise<Awaited<R>>
	  }
	: H extends object
	? { [k in keyof H]: PromisifyHandlers<H[k]> }
	: never
