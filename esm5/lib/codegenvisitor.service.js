/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 * @abstract
 */
var /**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 * @abstract
 */
CodeGenVisitor = /** @class */ (function () {
    function CodeGenVisitor() {
    }
    /**
     * Generates a string template by visiting the tree
     * @param ast The Sketch AST
     */
    /**
     * Generates a string template by visiting the tree
     * @param {?} ast The Sketch AST
     * @return {?}
     */
    CodeGenVisitor.prototype.generateTemplate = /**
     * Generates a string template by visiting the tree
     * @param {?} ast The Sketch AST
     * @return {?}
     */
    function (ast) {
        /** @type {?} */
        var template = [];
        this.visit(ast, template, 2);
        return template.join('\n');
    };
    /**
     * @protected
     * @param {?} ast
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    CodeGenVisitor.prototype.visit = /**
     * @protected
     * @param {?} ast
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    function (ast, template, depth) {
        var _this = this;
        if (template === void 0) { template = []; }
        if (depth === void 0) { depth = 0; }
        if (ast.layers && Array.isArray(ast.layers)) {
            ast.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) { return _this.visitLayer(layer, template, depth); }));
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
    };
    /**
     * @protected
     * @param {?} layer
     * @param {?} template
     * @param {?} depth
     * @return {?}
     */
    CodeGenVisitor.prototype.visitLayer = /**
     * @protected
     * @param {?} layer
     * @param {?} template
     * @param {?} depth
     * @return {?}
     */
    function (layer, template, depth) {
        /** @type {?} */
        var content = this.visit(layer, template, depth + 1);
        if (content) {
            template.push(content);
        }
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.visitShape = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        return ((/** @type {?} */ (ast))).shape;
    };
    /**
     * @protected
     * @param {?} color
     * @return {?}
     */
    CodeGenVisitor.prototype.colorRatioToHex = /**
     * @protected
     * @param {?} color
     * @return {?}
     */
    function (color) {
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
    };
    // return colorhex: string or false
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.checkLayersForBorder = 
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        var e_1, _a;
        /** @type {?} */
        var border = false;
        try {
            for (var _b = tslib_1.__values(ast.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layer = _c.value;
                border = this.checkForBorder(ast, layer);
                if (border !== false) {
                    return border;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return border;
    };
    // return colorhex: string or false
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.checkForBorder = 
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    function (parent, ast) {
        if (ast.frame.x === 0 &&
            ast.frame.y === 0 &&
            parent.frame.width === ast.frame.width &&
            parent.frame.height === ast.frame.height &&
            !!ast.style.borders) {
            ((/** @type {?} */ (ast))).shapeVisited = true;
            return this.colorRatioToHex(ast.style.borders[0].color);
        }
        return false;
    };
    // return colorhex: string or false
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.checkLayersForBackground = 
    // return colorhex: string or false
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        var e_2, _a;
        /** @type {?} */
        var background = false;
        try {
            for (var _b = tslib_1.__values(ast.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layer = _c.value;
                background = this.checkForBackground(ast, layer);
                if (background !== false) {
                    return background;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return background;
    };
    // return colorhex: string or false
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    CodeGenVisitor.prototype.checkForBackground = 
    // return colorhex: string or false
    /**
     * @private
     * @param {?} parent
     * @param {?} ast
     * @return {?}
     */
    function (parent, ast) {
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
    };
    return CodeGenVisitor;
}());
/**
 * Visitor-like pattern used for code generation purposes, by iterating through an AST and
 * delegating the codegen to its subclasses.
 * @abstract
 */
export { CodeGenVisitor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWdlbnZpc2l0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3hhbWwtY29kZWdlbi8iLCJzb3VyY2VzIjpbImxpYi9jb2RlZ2VudmlzaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFJQTs7Ozs7O0lBQUE7SUErSEEsQ0FBQztJQTlIQzs7O09BR0c7Ozs7OztJQUNILHlDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsR0FBa0I7O1lBQzNCLFFBQVEsR0FBa0IsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7O0lBRVMsOEJBQUs7Ozs7Ozs7SUFBZixVQUNFLEdBQWtCLEVBQ2xCLFFBQXVCLEVBQ3ZCLEtBQWlCO1FBSG5CLGlCQWtCQztRQWhCQyx5QkFBQSxFQUFBLGFBQXVCO1FBQ3ZCLHNCQUFBLEVBQUEsU0FBaUI7UUFFakIsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUF2QyxDQUF1QyxFQUFDLENBQUM7U0FDdEU7YUFBTTtZQUNMLElBQUksQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM3QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7OztJQUVTLG1DQUFVOzs7Ozs7O0lBQXBCLFVBQ0UsS0FBb0IsRUFDcEIsUUFBa0IsRUFDbEIsS0FBYTs7WUFFUCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBSSxPQUFPLEVBQUU7WUFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7O0lBRVMsbUNBQVU7Ozs7O0lBQXBCLFVBQXFCLEdBQWtCO1FBQ3JDLE9BQU8sQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFRUyx3Q0FBZTs7Ozs7SUFBekIsVUFBMEIsS0FBb0I7UUFDNUMsT0FBTyxDQUNMLEdBQUc7WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUN4QixRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUNaLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7aUJBQzFCLFFBQVEsQ0FBQyxFQUFFLENBQUM7aUJBQ1osUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDekIsUUFBUSxDQUFDLEVBQUUsQ0FBQztpQkFDWixRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVELG1DQUFtQzs7Ozs7OztJQUN6Qiw2Q0FBb0I7Ozs7Ozs7SUFBOUIsVUFBK0IsR0FBa0I7OztZQUMzQyxNQUFNLEdBQXFCLEtBQUs7O1lBQ3BDLEtBQW9CLElBQUEsS0FBQSxpQkFBQSxHQUFHLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO2dCQUEzQixJQUFNLEtBQUssV0FBQTtnQkFDZCxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtvQkFDcEIsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELG1DQUFtQzs7Ozs7Ozs7SUFDM0IsdUNBQWM7Ozs7Ozs7O0lBQXRCLFVBQ0UsTUFBcUIsRUFDckIsR0FBa0I7UUFFbEIsSUFDRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN4QyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQ25CO1lBQ0EsQ0FBQyxtQkFBQSxHQUFHLEVBQU8sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsbUNBQW1DOzs7Ozs7O0lBQ3pCLGlEQUF3Qjs7Ozs7OztJQUFsQyxVQUFtQyxHQUFrQjs7O1lBQy9DLFVBQVUsR0FBcUIsS0FBSzs7WUFDeEMsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTNCLElBQU0sS0FBSyxXQUFBO2dCQUNkLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7b0JBQ3hCLE9BQU8sVUFBVSxDQUFDO2lCQUNuQjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsbUNBQW1DOzs7Ozs7OztJQUMzQiwyQ0FBa0I7Ozs7Ozs7O0lBQTFCLFVBQ0UsTUFBcUIsRUFDckIsR0FBa0I7UUFFbEIsSUFDRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN4QyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUNwQztZQUNBLENBQUMsbUJBQUEsR0FBRyxFQUFPLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2RDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQS9IRCxJQStIQzs7Ozs7Ozs7Ozs7Ozs7SUFqRkMsd0RBQXlEOzs7Ozs7O0lBQ3pELDBEQUEyRDs7Ozs7OztJQUMzRCx5REFBMEQ7Ozs7Ozs7SUFDMUQsc0RBQWdEOzs7Ozs7O0lBQ2hELHVEQUFpRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBWaXNpdG9yLWxpa2UgcGF0dGVybiB1c2VkIGZvciBjb2RlIGdlbmVyYXRpb24gcHVycG9zZXMsIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGFuIEFTVCBhbmRcclxuICogZGVsZWdhdGluZyB0aGUgY29kZWdlbiB0byBpdHMgc3ViY2xhc3Nlcy5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb2RlR2VuVmlzaXRvciB7XHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGVzIGEgc3RyaW5nIHRlbXBsYXRlIGJ5IHZpc2l0aW5nIHRoZSB0cmVlXHJcbiAgICogQHBhcmFtIGFzdCBUaGUgU2tldGNoIEFTVFxyXG4gICAqL1xyXG4gIGdlbmVyYXRlVGVtcGxhdGUoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRlbXBsYXRlOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICB0aGlzLnZpc2l0KGFzdCwgdGVtcGxhdGUsIDIpO1xyXG4gICAgcmV0dXJuIHRlbXBsYXRlLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0KFxyXG4gICAgYXN0OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdID0gW10sXHJcbiAgICBkZXB0aDogbnVtYmVyID0gMFxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBpZiAoYXN0LmxheWVycyAmJiBBcnJheS5pc0FycmF5KGFzdC5sYXllcnMpKSB7XHJcbiAgICAgIGFzdC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB0aGlzLnZpc2l0TGF5ZXIobGF5ZXIsIHRlbXBsYXRlLCBkZXB0aCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKChhc3QgYXMgYW55KS5fY2xhc3MgPT09ICd0ZXh0Jykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2l0VGV4dChhc3QpO1xyXG4gICAgICB9IGVsc2UgaWYgKChhc3QgYXMgYW55KS5fY2xhc3MgPT09ICdiaXRtYXAnKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRCaXRtYXAoYXN0KTtcclxuICAgICAgfSBlbHNlIGlmICgoYXN0IGFzIGFueSkuc2hhcGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52aXNpdFNoYXBlKGFzdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRPdGhlcihhc3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRMYXllcihcclxuICAgIGxheWVyOiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdLFxyXG4gICAgZGVwdGg6IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMudmlzaXQobGF5ZXIsIHRlbXBsYXRlLCBkZXB0aCArIDEpO1xyXG4gICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgdGVtcGxhdGUucHVzaChjb250ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdFNoYXBlKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKGFzdCBhcyBhbnkpLnNoYXBlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZpc2l0VGV4dChhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZpc2l0Qml0bWFwKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZztcclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgdmlzaXRPdGhlcihhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IG9wZW5UYWcodGFnOiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNsb3NlVGFnKHRhZzogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgY29sb3JSYXRpb1RvSGV4KGNvbG9yOiBTa2V0Y2hNU0NvbG9yKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnIycgK1xyXG4gICAgICBNYXRoLnJvdW5kKGNvbG9yLnJlZCAqIDI1NSlcclxuICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgLnBhZFN0YXJ0KDIsICcwJykgK1xyXG4gICAgICBNYXRoLnJvdW5kKGNvbG9yLmdyZWVuICogMjU1KVxyXG4gICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAucGFkU3RhcnQoMiwgJzAnKSArXHJcbiAgICAgIE1hdGgucm91bmQoY29sb3IuYmx1ZSAqIDI1NSlcclxuICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgLnBhZFN0YXJ0KDIsICcwJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyByZXR1cm4gY29sb3JoZXg6IHN0cmluZyBvciBmYWxzZVxyXG4gIHByb3RlY3RlZCBjaGVja0xheWVyc0ZvckJvcmRlcihhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcgfCBib29sZWFuIHtcclxuICAgIGxldCBib3JkZXI6IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgYXN0LmxheWVycykge1xyXG4gICAgICBib3JkZXIgPSB0aGlzLmNoZWNrRm9yQm9yZGVyKGFzdCwgbGF5ZXIpO1xyXG4gICAgICBpZiAoYm9yZGVyICE9PSBmYWxzZSkge1xyXG4gICAgICAgIHJldHVybiBib3JkZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBib3JkZXI7XHJcbiAgfVxyXG5cclxuICAvLyByZXR1cm4gY29sb3JoZXg6IHN0cmluZyBvciBmYWxzZVxyXG4gIHByaXZhdGUgY2hlY2tGb3JCb3JkZXIoXHJcbiAgICBwYXJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBhc3Q6IFNrZXRjaE1TTGF5ZXJcclxuICApOiBzdHJpbmcgfCBib29sZWFuIHtcclxuICAgIGlmIChcclxuICAgICAgYXN0LmZyYW1lLnggPT09IDAgJiZcclxuICAgICAgYXN0LmZyYW1lLnkgPT09IDAgJiZcclxuICAgICAgcGFyZW50LmZyYW1lLndpZHRoID09PSBhc3QuZnJhbWUud2lkdGggJiZcclxuICAgICAgcGFyZW50LmZyYW1lLmhlaWdodCA9PT0gYXN0LmZyYW1lLmhlaWdodCAmJlxyXG4gICAgICAhIWFzdC5zdHlsZS5ib3JkZXJzXHJcbiAgICApIHtcclxuICAgICAgKGFzdCBhcyBhbnkpLnNoYXBlVmlzaXRlZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuYm9yZGVyc1swXS5jb2xvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyByZXR1cm4gY29sb3JoZXg6IHN0cmluZyBvciBmYWxzZVxyXG4gIHByb3RlY3RlZCBjaGVja0xheWVyc0ZvckJhY2tncm91bmQoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHwgYm9vbGVhbiB7XHJcbiAgICBsZXQgYmFja2dyb3VuZDogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZm9yIChjb25zdCBsYXllciBvZiBhc3QubGF5ZXJzKSB7XHJcbiAgICAgIGJhY2tncm91bmQgPSB0aGlzLmNoZWNrRm9yQmFja2dyb3VuZChhc3QsIGxheWVyKTtcclxuICAgICAgaWYgKGJhY2tncm91bmQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhY2tncm91bmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBiYWNrZ3JvdW5kO1xyXG4gIH1cclxuXHJcbiAgLy8gcmV0dXJuIGNvbG9yaGV4OiBzdHJpbmcgb3IgZmFsc2VcclxuICBwcml2YXRlIGNoZWNrRm9yQmFja2dyb3VuZChcclxuICAgIHBhcmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGFzdDogU2tldGNoTVNMYXllclxyXG4gICk6IHN0cmluZyB8IGJvb2xlYW4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBhc3QuZnJhbWUueCA9PT0gMCAmJlxyXG4gICAgICBhc3QuZnJhbWUueSA9PT0gMCAmJlxyXG4gICAgICBwYXJlbnQuZnJhbWUud2lkdGggPT09IGFzdC5mcmFtZS53aWR0aCAmJlxyXG4gICAgICBwYXJlbnQuZnJhbWUuaGVpZ2h0ID09PSBhc3QuZnJhbWUuaGVpZ2h0ICYmXHJcbiAgICAgICEhYXN0LnN0eWxlLmZpbGxzICYmXHJcbiAgICAgIGFzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYSAhPT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIChhc3QgYXMgYW55KS5zaGFwZVZpc2l0ZWQgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19