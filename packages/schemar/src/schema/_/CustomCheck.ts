export type CustomCheck<InputType = never> = {
	checkIfValid(x: unknown): boolean
	expectedDescription?: string | ((x: InputType) => string)
}
