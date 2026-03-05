// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ComponentPropsWithRef_,
	FastMergeProps_,
	Props,
} from '~/react-types'
import type { OuterProps } from '~/Stylable'
import type { StyledSubject } from '~/StyledTypeInfo'

import type { CustomStyledComponent } from './CustomStyledComponent'

export type StyledComponentProps<
	C extends StyledSubject,
	P extends object,
	CustomCss extends object,
> = // C extends NativeElement
	// ? P & OuterProps<CustomCss>
	// :
	// _<
	FastMergeProps_<ComponentPropsWithRef_<C>, P & OuterProps<CustomCss>>
// >

/** With Element already provided */
export interface StyledComponentWithProps<
	C extends StyledSubject,
	P extends Props,
> extends CustomStyledComponent<
		C,
		{
			Props: P
			CustomCss: {}
		}
	> {}
