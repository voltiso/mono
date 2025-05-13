// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableLike } from '~/Stylable/IStylable'

interface WithDisplayName {
	displayName: string
}

function hasDisplayName(x: unknown): x is WithDisplayName {
	return typeof (x as WithDisplayName | null)?.displayName === 'string'
}

export function getElementName(element: StylableLike): string {
	if (typeof element === 'string') return element
	else if (hasDisplayName(element)) return element.displayName
	else if (element.name) return element.name
	else return '(unknown-element)' // stringFrom(element)
}
