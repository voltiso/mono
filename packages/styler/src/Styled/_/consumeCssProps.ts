// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries, tryGetProperty } from '@voltiso/util'

import type { IndexedCssProps } from '~/_/CssProps'
import type { Css } from '~/Css/Css'
import type { IndexedProps } from '~/react-types'

import { prepare } from './prepare'

export function consumeCssProps(p: {
	props: IndexedProps
	consumed: IndexedCssProps
	all: IndexedCssProps
	styles: Css[]
	theme: object
}) {
	for (const [prop, value] of getEntries(p.props)) {
		const list = tryGetProperty(p.all, prop) || []

		for (const entry of [...list].reverse()) {
			if (typeof entry === 'function') {
				if (entry.length > 0 || Boolean(value))
					p.styles.push(prepare(entry(value as never), p.theme))
			} else if (value) p.styles.push(prepare(entry, p.theme) as never)
		}
	}
}
