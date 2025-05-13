// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyledSubject } from '~/StyledTypeInfo'

import type { CustomStyledComponent } from './CustomStyledComponent'

/** With Element already provided */
export interface StyledComponent<C extends StyledSubject>
	extends CustomStyledComponent<
		C,
		{
			Props: {
				// ref?: C extends NativeElement
				// 	? Ref<C> | undefined
				// 	: C extends JSXElementConstructor<any> | keyof JSX.IntrinsicElements
				// 		? ComponentProps<C>['ref']
				// 		: never
			}
			CustomCss: {}
		}
	> {}
