/** https://stackoverflow.com/a/50375286/1123898 */
export type IntersectionFromUnion<U> = (
	U extends any ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never
