// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ClientNextStylerRegistry } from '~/client/ClientNextStylerRegistry'

import { rscRenderer } from './rscRenderer'

export const NextStylerRegistry = (props: {
	readonly children: React.ReactNode
}) => {
	// `next dev`
	// console.log('NextStylerRegistry: unflushStyle')
	rscRenderer.unflushStyle()

	return <ClientNextStylerRegistry>{props.children}</ClientNextStylerRegistry>
}
