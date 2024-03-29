// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentProps, JSXElementConstructor, Ref } from 'react'

import type { StylableLike } from '~/Stylable'

import type { CustomStyledComponent } from './CustomStyledComponent'
import type { NativeElement } from './GetStyledComponent'

/** With Element already provided */
export interface StyledComponent<C extends StylableLike | NativeElement>
	extends CustomStyledComponent<
		C,
		{
			Props: {
				ref?: C extends NativeElement
					? Ref<C> | undefined
					: C extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements
						? ComponentProps<C>['ref']
						: never
			}
			CustomCss: {}
		}
	> {}
