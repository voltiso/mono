// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as Checkbox from '@radix-ui/react-checkbox'
import { describe, expect, it } from 'vitest'

import { style } from '~'

describe('radix', () => {
	it('type', () => {
		expect.assertions(0)

		const MyCheckbox = style(Checkbox.Root)

		// type A = ComponentProps<typeof MyCheckbox>
		// type B = ComponentPropsWithRef<typeof MyCheckbox>
		// type C = ComponentPropsWithoutRef<typeof MyCheckbox>

		// @ts-expect-error no such prop!
		;() => <Checkbox.Root doesNotExist={() => {}} />

		//
		;() => <Checkbox.Root onCheckedChange={_checked => {}} />

		// @ts-expect-error no such prop!
		;() => <MyCheckbox doesNotExist={1} />

		// @ts-expect-error wrong type
		;() => <MyCheckbox onCheckedChange={1} />

		//
		;() => <MyCheckbox onCheckedChange={_checked => {}} />
	})
})
