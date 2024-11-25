// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Schema, Type } from '~'
import * as s from '~'

describe('object', () => {
	it('complex object - theme', () => {
		const sColor = s.string.maxLength(32) as unknown as Schema<string>
		const sTransition = s.string.maxLength(64) as unknown as Schema<string>

		const sTheme = {
			color: {
				fg: sColor,
				bg: sColor,

				panelBg: sColor,
				panelBorder: sColor,

				adminBg: sColor,
				modalBg: sColor,

				primary: sColor,

				disabled: sColor,
				good: sColor,
				bad: sColor,
				danger: sColor,
			},

			margin: {
				/** `em` */
				1: s.number,
				2: s.number,
				3: s.number,
			},

			font: {
				weight: {
					regular: s.number,
					semiBold: s.number,
					bold: s.number,
				},
			},

			borderRadius: {
				button: s.number,
				panel: s.number,
				table: s.number,
			},

			transition: sTransition,

			adminStripes: {
				width: s.number,
				phase: s.number,
			},
		}

		const sPartialTheme = s.infer(sTheme).deepPartial

		type Theme = Type<typeof sTheme>
		type PartialTheme = Type<typeof sPartialTheme>

		$Assert<
			IsIdentical<
				Theme,
				{
					color: {
						fg: string
						bg: string
						panelBg: string
						panelBorder: string
						adminBg: string
						modalBg: string
						primary: string
						disabled: string
						good: string
						bad: string
						danger: string
					}
					margin: {
						1: number
						2: number
						3: number
					}
					font: {
						weight: {
							regular: number
							semiBold: number
							bold: number
						}
					}
					borderRadius: {
						button: number
						panel: number
						table: number
					}
					transition: string
					adminStripes: {
						width: number
						phase: number
					}
				}
			>
		>()

		$Assert<
			IsIdentical<
				PartialTheme,
				{
					color?: {
						fg?: string
						bg?: string
						panelBg?: string
						panelBorder?: string
						adminBg?: string
						modalBg?: string
						primary?: string
						disabled?: string
						good?: string
						bad?: string
						danger?: string
					}
					margin?: {
						1?: number
						2?: number
						3?: number
					}
					font?: {
						weight?: {
							regular?: number
							semiBold?: number
							bold?: number
						}
					}
					borderRadius?: {
						button?: number
						panel?: number
						table?: number
					}
					transition?: string
					adminStripes?: {
						width?: number
						phase?: number
					}
				}
			>
		>()
	})
})
