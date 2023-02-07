// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useServerInsertedHTML } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'

import { WebRenderer } from '~/renderer'

import { RendererContext } from './context'

export const ClientNextStylerRegistry = (props: {
	children: React.ReactNode
}) => {
	// eslint-disable-next-line react/hook-use-state
	const [renderer] = useState(() => new WebRenderer())

	useServerInsertedHTML(() => {
		const ssrStyle = renderer.flushStyle()
		if (!ssrStyle) return null

		return (
			<style data-voltiso-ssr='' key={renderer.numFlushes}>
				{ssrStyle}
			</style>
		)
	})

	return (
		<RendererContext.Provider value={renderer as never}>
			{props.children}
		</RendererContext.Provider>
	)
}
