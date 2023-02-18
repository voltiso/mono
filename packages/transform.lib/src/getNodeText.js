// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀
export function getNodeText(ctx, node) {
    try {
        return node.getText(ctx.sourceFile).replace(/\s+/gu, ' ');
    }
    catch {
        return undefined;
    }
}
