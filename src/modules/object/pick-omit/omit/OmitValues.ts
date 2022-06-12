export type OmitValues<O, V> = {
	[k in keyof O as O[k] extends V ? never : k]: O[k]
}
