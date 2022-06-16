export function lazyPromise<T, ARGS extends unknown[]>(
	getPromise: (...args: ARGS) => PromiseLike<T>,
	...args: ARGS
): PromiseLike<T> {
	let promise: PromiseLike<T> | undefined

	return {
		then: (f, r) => {
			if (!promise) promise = getPromise(...args)

			// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			// const currentZone = Zone?.current

			// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			// if (currentZone) {
			// 	// eslint-disable-next-line no-param-reassign
			// 	if (f) f = currentZone.wrap(f, '@voltiso/ts-util/function/lazy')
			// 	// eslint-disable-next-line no-param-reassign
			// 	if (r) r = currentZone.wrap(r, '@voltiso/ts-util/function/lazy')
			// }

			return promise.then(f, r)
		},
	}
}

//
// __proto__ version:
//
// const lazy = <T, ARGS extends unknown[], P extends PromiseLike<T>>(getPromise: (...args: ARGS) => P, ...args: ARGS) => {
// 	const obj = <P & { __proto__: P }>{}
// 	return new Proxy(obj, {
// 		get: (target, p, receiver) => {
// 			console.log('lazy get', target, p, receiver)
// 			if (p === 'then') {
// 				if (obj.__proto__ === Object.prototype) obj.__proto__ = getPromise(...args)
// 				return (x: (arg: unknown) => unknown) => obj.__proto__.then(x)
// 			} else return <unknown>Reflect.get(target, p, receiver)
// 		},
// 	})
// }
