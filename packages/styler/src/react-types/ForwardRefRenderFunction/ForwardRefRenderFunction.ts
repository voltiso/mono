// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicElement } from '~/Stylable'
import type { NativeElement } from '~/StyledComponent'

import type { GetNativeElement } from './GetNativeElement'

export type ForwardRefRenderFunction<
	T extends NativeElement | IntrinsicElement,
	P = T extends NativeElement
		? {}
		: T extends IntrinsicElement
		? JSX.IntrinsicElements[T]
		: never,
> = React.ForwardRefRenderFunction<GetNativeElement<T>, P>
