// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/require-template */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import type {
	ComponentPropsWithRef_,
	FastMergeProps_,
	Props,
} from '~/react-types'
import type { OuterProps, StylableLike } from '~/Stylable'

import type { CustomStyledComponent } from './CustomStyledComponent'
import type { NativeElement } from './GetStyledComponent'

export type StyledComponentProps<
	C extends StylableLike | NativeElement,
	P extends object,
	CustomCss extends object,
> = // C extends NativeElement
	//? P & OuterProps<CustomCss>
	// :
	// _<
	FastMergeProps_<
		ComponentPropsWithRef_<C>,
		P & OuterProps<CustomCss>
	>
// >

/** With Element already provided */
export interface StyledComponentWithProps<
	C extends StylableLike | NativeElement,
	P extends Props,
> extends CustomStyledComponent<
		C,
		{
			Props: P
			CustomCss: {}
		}
	> {}
