import { Assert } from "@voltiso/stester";
import type { SyncerSwitch } from "./SyncerSwitch.js";

describe("UniAsyncSwitch", () => {
	it("generic", <X>() => {
		expect.assertions(0);

		Assert.is<SyncerSwitch<X>, SyncerSwitch>();
	});

	it("type", () => {
		expect.assertions(0);

		Assert.is<
			{ sync: () => 0; async: () => Promise<Promise<0>> },
			SyncerSwitch
		>();
	});
});
