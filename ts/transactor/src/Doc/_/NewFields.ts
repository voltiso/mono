// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, $$SchemableObject } from '@voltiso/schemar'

import { sAutoId, sRef } from '~/schemas'

// ! jsdoc link hack

void sAutoId

void sRef

export interface $$PartialDocOptions {
	// tag?: DocTag // ! temporarily disable to clean up lib API

	/**
	 * 🧙‍♂️ Custom ID schema
	 *
	 * - Useful when your document IDs have special meaning
	 * - Hint: use default auto-generated IDs for main collections. Use custom IDs
	 *   for supporting collections to enforce unique fields - e.g.:
	 *
	 *   - `article` collection with default ID
	 *   - `articleSlug` collection keyed by slug value, and referencing `article`
	 *       using {@link sRef}
	 *
	 * @defaultValue Auto ID schema {@link sAutoId}
	 */
	id?: $$Schemable

	/**
	 * 🧙‍♂️ Can be written only at creation, or via _methods_ or _triggers_
	 *
	 * - Useful for **constant values** that should not change during lifetime of
	 *   the document, **or** if mutating them requires special handling like
	 *   **private** fields
	 */
	publicOnCreation?: $$SchemableObject

	/**
	 * 🧙‍♂️ Can be written using regular update operations
	 *
	 * - That's fine if you're not able to violate your DB constraints this way
	 */
	public?: $$SchemableObject

	/**
	 * 🧙‍♂️ Can be written only via _methods_ or _triggers_
	 *
	 * - Keep your magic data here - **protect from accidental changes**
	 * - Implement **triggers** and **methods** to handle mutations properly
	 */
	private?: $$SchemableObject

	/**
	 * ⚠️ All aggregates schemas **must be defaulted** to a non-`undefined` value
	 * (and serializable into database)
	 */
	aggregates?: Record<string, $$Schemable>
	// aggregates?: Record<string, $$Schema & { [OPTIONS]: { hasDefault: true } }>
}
