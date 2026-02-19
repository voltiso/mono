// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

/** @internal */
export interface _LessEqual<True = true, False = false> {
	[0]: {
		[0]: True
		[1]: True
		[2]: True
		[3]: True
		[4]: True
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[1]: {
		[0]: False
		[1]: True
		[2]: True
		[3]: True
		[4]: True
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[2]: {
		[0]: False
		[1]: False
		[2]: True
		[3]: True
		[4]: True
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[3]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: True
		[4]: True
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[4]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: True
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[5]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: True
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[6]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: False
		[6]: True
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[7]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: False
		[6]: False
		[7]: True
		[8]: True
		[9]: True
		[10]: True
	}

	[8]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: False
		[6]: False
		[7]: False
		[8]: True
		[9]: True
		[10]: True
	}

	[9]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: False
		[6]: False
		[7]: False
		[8]: False
		[9]: True
		[10]: True
	}

	[10]: {
		[0]: False
		[1]: False
		[2]: False
		[3]: False
		[4]: False
		[5]: False
		[6]: False
		[7]: False
		[8]: False
		[9]: False
		[10]: True
	}
}

export type LessEqual<
	a extends number,
	b extends number,
	True = true,
	False = false,
> = a extends keyof _LessEqual<True, False>
	? b extends keyof _LessEqual<True, False>[a]
		? _LessEqual<True, False>[a][b]
		: number
	: number
