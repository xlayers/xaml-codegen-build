/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 * @abstract
 */
export class CodeGenVisitor {
    /**
     * Generates a string template by visiting the tree
     * @param {?} ast The Sketch AST
     * @return {?}
     */
    generateTemplate(ast) {
        /** @type {?} */
        const template = [];
        this.visit(ast, template, 2);
        return template.join('\n');
    }
    /**
     * @protected
     * @param {?} ast
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    visit(ast, template = [], depth = 0) {
        if (ast.layers && Array.isArray(ast.layers)) {
            ast.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => this.visitLayer(layer, template, depth)));
        }
        else {
            if (((/** @type {?} */ (ast)))._class === 'text') {
                return this.visitText(ast);
            }
            else if (((/** @type {?} */ (ast)))._class === 'bitmap') {
                return this.visitBitmap(ast);
            }
            else if (((/** @type {?} */ (ast))).shape) {
                return this.visitShape(ast);
            }
            else {
                return this.visitOther(ast);
            }
        }
    }
    /**
     * @protected
     * @param {?} layer
     * @param {?} template
     * @param {?} depth
     * @return {?}
     */
    visitLayer(layer, template, depth) {
        /** @type {?} */
        const content = this.visit(layer, template, depth + 1);
        if (content) {
            template.push(content);
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitShape(ast) {
        return ((/** @type {?} */ (ast))).shape;
    }
    /**
     * @protected
     * @param {?} color
     * @return {?}
     */
    colorRatioToHex(color) {
        return ('#' +
            Math.round(color.red * 255)
                .toString(16)
                .padStart(2, '0') +
            Math.round(color.green * 255)
                .toString(16)
                .padStart(2, '0') +
            Math.round(color.blue * 255)
                .toString(16)
                .padStart(2, '0'));
    }
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    checkLayersForBorder(ast) {
        /** @type {?} */
        let border = false;
        for (const layer of ast.layers) {
            border = this.checkForBorder(ast, layer);
            if (border !== false) {
                return border;
            }
        }
        return border;
    }
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    checkForBorder(parent, ast) {
        if (ast.frame.x === 0 &&
            ast.frame.y === 0 &&
            parent.frame.width === ast.frame.width &&
            parent.frame.height === ast.frame.height &&
            !!ast.style.borders) {
            ((/** @type {?} */ (ast))).shapeVisited = true;
            return this.colorRatioToHex(ast.style.borders[0].color);
        }
        return false;
    }
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    checkLayersForBackground(ast) {
        /** @type {?} */
        let background = false;
        for (const layer of ast.layers) {
            background = this.checkForBackground(ast, layer);
            if (background !== false) {
                return background;
            }
        }
        return background;
    }
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    checkForBackground(parent, ast) {
        if (ast.frame.x === 0 &&
            ast.frame.y === 0 &&
            parent.frame.width === ast.frame.width &&
            parent.frame.height === ast.frame.height &&
            !!ast.style.fills &&
            ast.style.fills[0].color.alpha !== 0) {
            ((/** @type {?} */ (ast))).shapeVisited = true;
            return this.colorRatioToHex(ast.style.fills[0].color);
        }
        return false;
    }
}
if (false) {
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitText = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitBitmap = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitOther = function (ast) { };
    /**
     * @abstract
     * @protected
     * @param {?} tag
     * @return {?}
     */
    CodeGenVisitor.prototype.openTag = function (tag) { };
    /**
     * @abstract
     * @protected
     * @param {?} tag
     * @return {?}
     */
    CodeGenVisitor.prototype.closeTag = function (tag) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWdlbnZpc2l0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3hhbWwtY29kZWdlbi8iLCJzb3VyY2VzIjpbImxpYi9jb2RlZ2VudmlzaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sT0FBZ0IsY0FBYzs7Ozs7O0lBS2xDLGdCQUFnQixDQUFDLEdBQWtCOztjQUMzQixRQUFRLEdBQWtCLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7OztJQUVTLEtBQUssQ0FDYixHQUFrQixFQUNsQixXQUFxQixFQUFFLEVBQ3ZCLFFBQWdCLENBQUM7UUFFakIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztZQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUM7U0FDdEU7YUFBTTtZQUNMLElBQUksQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsS0FB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Q25CO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7OztJQUdPLGtCQUFrQixDQUN4QixNQUFxQixFQUNyQixHQUFrQjtRQUVsQixJQUNFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ3hDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQ3BDO1lBQ0EsQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7Ozs7Ozs7O0lBakZDLHdEQUF5RDs7Ozs7OztJQUN6RCwwREFBMkQ7Ozs7Ozs7SUFDM0QseURBQTBEOzs7Ozs7O0lBQzFELHNEQUFnRDs7Ozs7OztJQUNoRCx1REFBaUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVmlzaXRvci1saWtlIHBhdHRlcm4gdXNlZCBmb3IgY29kZSBnZW5lcmF0aW9uIHB1cnBvc2VzLCBieSBpdGVyYXRpbmcgdGhyb3VnaCBhbiBBU1QgYW5kXHJcbiAqIGRlbGVnYXRpbmcgdGhlIGNvZGVnZW4gdG8gaXRzIHN1YmNsYXNzZXMuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29kZUdlblZpc2l0b3Ige1xyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlcyBhIHN0cmluZyB0ZW1wbGF0ZSBieSB2aXNpdGluZyB0aGUgdHJlZVxyXG4gICAqIEBwYXJhbSBhc3QgVGhlIFNrZXRjaCBBU1RcclxuICAgKi9cclxuICBnZW5lcmF0ZVRlbXBsYXRlKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgdGhpcy52aXNpdChhc3QsIHRlbXBsYXRlLCAyKTtcclxuICAgIHJldHVybiB0ZW1wbGF0ZS5qb2luKCdcXG4nKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdChcclxuICAgIGFzdDogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSA9IFtdLFxyXG4gICAgZGVwdGg6IG51bWJlciA9IDBcclxuICApOiBzdHJpbmcge1xyXG4gICAgaWYgKGFzdC5sYXllcnMgJiYgQXJyYXkuaXNBcnJheShhc3QubGF5ZXJzKSkge1xyXG4gICAgICBhc3QubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gdGhpcy52aXNpdExheWVyKGxheWVyLCB0ZW1wbGF0ZSwgZGVwdGgpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgoYXN0IGFzIGFueSkuX2NsYXNzID09PSAndGV4dCcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFRleHQoYXN0KTtcclxuICAgICAgfSBlbHNlIGlmICgoYXN0IGFzIGFueSkuX2NsYXNzID09PSAnYml0bWFwJykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0Qml0bWFwKGFzdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoKGFzdCBhcyBhbnkpLnNoYXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRTaGFwZShhc3QpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0T3RoZXIoYXN0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0TGF5ZXIoXHJcbiAgICBsYXllcjogU2tldGNoTVNMYXllcixcclxuICAgIHRlbXBsYXRlOiBzdHJpbmdbXSxcclxuICAgIGRlcHRoOiBudW1iZXJcclxuICApIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnZpc2l0KGxheWVyLCB0ZW1wbGF0ZSwgZGVwdGggKyAxKTtcclxuICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2goY29udGVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRTaGFwZShhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChhc3QgYXMgYW55KS5zaGFwZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB2aXNpdFRleHQoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nO1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB2aXNpdEJpdG1hcChhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZpc2l0T3RoZXIoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nO1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvcGVuVGFnKHRhZzogc3RyaW5nKTogc3RyaW5nO1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjbG9zZVRhZyh0YWc6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbiAgcHJvdGVjdGVkIGNvbG9yUmF0aW9Ub0hleChjb2xvcjogU2tldGNoTVNDb2xvcikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJyMnICtcclxuICAgICAgTWF0aC5yb3VuZChjb2xvci5yZWQgKiAyNTUpXHJcbiAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgIC5wYWRTdGFydCgyLCAnMCcpICtcclxuICAgICAgTWF0aC5yb3VuZChjb2xvci5ncmVlbiAqIDI1NSlcclxuICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgLnBhZFN0YXJ0KDIsICcwJykgK1xyXG4gICAgICBNYXRoLnJvdW5kKGNvbG9yLmJsdWUgKiAyNTUpXHJcbiAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgIC5wYWRTdGFydCgyLCAnMCcpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gcmV0dXJuIGNvbG9yaGV4OiBzdHJpbmcgb3IgZmFsc2VcclxuICBwcm90ZWN0ZWQgY2hlY2tMYXllcnNGb3JCb3JkZXIoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHwgYm9vbGVhbiB7XHJcbiAgICBsZXQgYm9yZGVyOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IGxheWVyIG9mIGFzdC5sYXllcnMpIHtcclxuICAgICAgYm9yZGVyID0gdGhpcy5jaGVja0ZvckJvcmRlcihhc3QsIGxheWVyKTtcclxuICAgICAgaWYgKGJvcmRlciAhPT0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gYm9yZGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9yZGVyO1xyXG4gIH1cclxuXHJcbiAgLy8gcmV0dXJuIGNvbG9yaGV4OiBzdHJpbmcgb3IgZmFsc2VcclxuICBwcml2YXRlIGNoZWNrRm9yQm9yZGVyKFxyXG4gICAgcGFyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgYXN0OiBTa2V0Y2hNU0xheWVyXHJcbiAgKTogc3RyaW5nIHwgYm9vbGVhbiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGFzdC5mcmFtZS54ID09PSAwICYmXHJcbiAgICAgIGFzdC5mcmFtZS55ID09PSAwICYmXHJcbiAgICAgIHBhcmVudC5mcmFtZS53aWR0aCA9PT0gYXN0LmZyYW1lLndpZHRoICYmXHJcbiAgICAgIHBhcmVudC5mcmFtZS5oZWlnaHQgPT09IGFzdC5mcmFtZS5oZWlnaHQgJiZcclxuICAgICAgISFhc3Quc3R5bGUuYm9yZGVyc1xyXG4gICAgKSB7XHJcbiAgICAgIChhc3QgYXMgYW55KS5zaGFwZVZpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmJvcmRlcnNbMF0uY29sb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gcmV0dXJuIGNvbG9yaGV4OiBzdHJpbmcgb3IgZmFsc2VcclxuICBwcm90ZWN0ZWQgY2hlY2tMYXllcnNGb3JCYWNrZ3JvdW5kKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB8IGJvb2xlYW4ge1xyXG4gICAgbGV0IGJhY2tncm91bmQ6IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgYXN0LmxheWVycykge1xyXG4gICAgICBiYWNrZ3JvdW5kID0gdGhpcy5jaGVja0ZvckJhY2tncm91bmQoYXN0LCBsYXllcik7XHJcbiAgICAgIGlmIChiYWNrZ3JvdW5kICE9PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBiYWNrZ3JvdW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmFja2dyb3VuZDtcclxuICB9XHJcblxyXG4gIC8vIHJldHVybiBjb2xvcmhleDogc3RyaW5nIG9yIGZhbHNlXHJcbiAgcHJpdmF0ZSBjaGVja0ZvckJhY2tncm91bmQoXHJcbiAgICBwYXJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBhc3Q6IFNrZXRjaE1TTGF5ZXJcclxuICApOiBzdHJpbmcgfCBib29sZWFuIHtcclxuICAgIGlmIChcclxuICAgICAgYXN0LmZyYW1lLnggPT09IDAgJiZcclxuICAgICAgYXN0LmZyYW1lLnkgPT09IDAgJiZcclxuICAgICAgcGFyZW50LmZyYW1lLndpZHRoID09PSBhc3QuZnJhbWUud2lkdGggJiZcclxuICAgICAgcGFyZW50LmZyYW1lLmhlaWdodCA9PT0gYXN0LmZyYW1lLmhlaWdodCAmJlxyXG4gICAgICAhIWFzdC5zdHlsZS5maWxscyAmJlxyXG4gICAgICBhc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IuYWxwaGEgIT09IDBcclxuICAgICkge1xyXG4gICAgICAoYXN0IGFzIGFueSkuc2hhcGVWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIHRoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5maWxsc1swXS5jb2xvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==