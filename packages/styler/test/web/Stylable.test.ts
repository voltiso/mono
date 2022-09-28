// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, Is } from '@voltiso/util'
import type { ChangeEvent, FC, RefObject } from 'react'

import type { IStylable, Stylable } from '~'
import type { Props } from '~/react-types'

describe('Stylable', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<Stylable<P>, IStylable>()
		Assert.is<Stylable<P>, Stylable>()
	})

	it('type', () => {
		expect.assertions(0)

		// Assert(Is<FC<{ a?: 'aa' }>>().not.subtypeOf<Stylable>())

		Assert.is<FC<{ className?: string }>, IStylable>()
		Assert.is<FC<{ className?: string | undefined; a?: 'aa' }>, Stylable>()
		Assert.is<FC<{ className: string; a?: 'aa' }>, Stylable>()
		Assert.is<FC<{ readonly className: string; a?: 'aa' }>, Stylable>()

		Assert.is<'input', Stylable>()
		Assert.is<
			'input',
			Stylable<{ value?: string | readonly string[] | number | undefined }>
		>()
	})

	it('complex', () => {
		expect.assertions(0)

		type TextProps = {
			id?: string | undefined
			ref?:
				| undefined
				| null
				| RefObject<HTMLInputElement>
				| ((inst: HTMLInputElement) => void)
			value?: string | number | readonly string[] | undefined
			onChange?: undefined | ((e: ChangeEvent<HTMLInputElement>) => void)

			// validationResult?: s.ValidationResult | undefined
		}

		Assert.is<'input', Stylable<TextProps>>()

		type CustomTextProps = TextProps & {
			magic?: boolean | undefined
		}

		// do not allow unknown DOM attributes
		Assert(Is<'input'>().not.subtypeOf<Stylable<CustomTextProps>>())

		type CustomRequiredTextProps = CustomTextProps & {
			requiredMagic: boolean
		}

		Assert(Is<'input'>().not.subtypeOf<Stylable<CustomRequiredTextProps>>())

		// type BadTextProps = CustomTextProps & {
		// 	checked?: boolean
		// }

		// Assert(Is<'input'>().not.subtypeOf<Stylable<BadTextProps>>()) // missing undefined... should pass?
	})

	it('playground', () => {
		expect.assertions(0)

		type WithClassName = <
			P extends { className: string; [k: string]: unknown },
		>(
			props: P,
		) => void

		type WithMaybeClassName = <
			P extends { className?: string | undefined; [k: string]: unknown },
		>(
			props: P,
		) => void

		// Assert.is<(props: { a?: 'aa' }) => void, WithClassName>()
		// Assert.is<(props: { a?: 'aa' }) => void, WithMaybeClassName>()

		//

		Assert.is<
			(props: { className?: string | undefined }) => void,
			WithClassName
		>()

		Assert.is<
			(props: { className?: string | undefined }) => void,
			WithMaybeClassName
		>()

		//

		Assert.is<
			(props: { className?: string | undefined; a?: 'a' }) => void,
			WithClassName
		>()

		Assert.is<
			(props: { className?: string | undefined; a?: 'a' }) => void,
			WithMaybeClassName
		>()

		//

		// Assert.is<
		// 	(props: { className?: string | undefined; a: 'a' }) => void,
		// 	WithClassName
		// >()

		// Assert.is<
		// 	(props: { className?: string | undefined; a: 'a' }) => void,
		// 	WithMaybeClassName
		// >()
	})
})
