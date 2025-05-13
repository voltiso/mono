// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import type React from 'react'
import type { JSX } from 'react'
import { useState } from 'react'

import { useServerInsertedHTML } from '~/nextJs/_next'
import { WebRenderer } from '~/renderer'

import { RendererContext } from './context'

export const ClientNextStylerRegistry = (props: {
	readonly children: React.ReactNode
}): JSX.Element => {
	// eslint-disable-next-line react/hook-use-state
	const [renderer] = useState(() => new WebRenderer())

	useServerInsertedHTML(() => {
		const ssrStyle = renderer.flushStyle()
		if (!ssrStyle) return null

		return (
			<style
				data-voltiso-ssr=''
				key={renderer.numFlushes}
				/** Cannot use children - it would escape e.g. `>` characters */
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: ssrStyle }}
			/>
		)
	})

	return (
		<RendererContext.Provider value={renderer as never}>
			{props.children}
		</RendererContext.Provider>
	)
}
