export type DeleteIt = {
	__deleteIt: true
}

export const deleteIt: DeleteIt = {
	__deleteIt: true,
}

export function isDeleteIt(x: unknown): x is DeleteIt {
	return Boolean((x as DeleteIt | null)?.__deleteIt)
}
