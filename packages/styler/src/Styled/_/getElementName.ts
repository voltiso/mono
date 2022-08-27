// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '@voltiso/util'

import type { StylableLike } from '~/Stylable/IStylable'

type WithDisplayName = {
	displayName: string
}

function hasDisplayName(x: unknown): x is WithDisplayName {
	return typeof (x as WithDisplayName | null)?.displayName === 'string'
}

export function getElementName(element: StylableLike): string {
	if (typeof element === 'string') return element
	else if (hasDisplayName(element)) return element.displayName
	else if (element.name) return element.name
	else return stringFrom(element)
}
