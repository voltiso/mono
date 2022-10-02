// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomStyledComponent, NativeElement } from '~'
import type {
	ComponentPropsWithRef_,
	FastMergeProps_,
	Props,
} from '~/react-types'
import type { OuterProps, StylableLike } from '~/Stylable'

export type StyledComponentProps<
	C extends StylableLike | NativeElement,
	P extends Props,
	CP extends object,
> = C extends NativeElement
	? P & OuterProps<CP>
	: FastMergeProps_<ComponentPropsWithRef_<C>, P & OuterProps<CP>>

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
