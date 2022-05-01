// import { IsOptional } from '../IsOptional'

/**
 * A very crude version of `DeepMerge` that allows recursive types
 */
export type DeepReplace2<A, B> = A extends object
	? B extends object
		? {
				[k in keyof A | keyof B]: k extends keyof B ? B[k] : k extends keyof A ? A[k] : never
		  }
		: B
	: B

// export type DeepReplace2<A, B> = A extends object
// 	? B extends object
// 		? {
// 				[k in keyof A | keyof B as IsOptional<A & B, k, k, never>]?: k extends keyof B
// 					? B[k]
// 					: k extends keyof A
// 					? A[k]
// 					: never
// 		  } & {
// 				[k in keyof A | keyof B as IsOptional<A & B, k, never, k>]: k extends keyof B
// 					? B[k]
// 					: k extends keyof A
// 					? A[k]
// 					: never
// 		  }
// 		: B
// 	: B
