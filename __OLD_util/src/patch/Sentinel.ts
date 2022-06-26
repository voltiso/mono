import { DeleteIt, isDeleteIt } from "./deleteIt.js";
import { isReplaceIt, ReplaceIt } from "./replaceIt.js";

type PatchSentinel = DeleteIt | ReplaceIt;

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return isDeleteIt(x) || isReplaceIt(x);
}
