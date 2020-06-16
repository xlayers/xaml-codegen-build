/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CodeGenVisitor } from './codegenvisitor.service';
/**
 * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
 * @abstract
 */
var /**
 * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
 * @abstract
 */
XmlCodeGenVisitor = /** @class */ (function (_super) {
    tslib_1.__extends(XmlCodeGenVisitor, _super);
    function XmlCodeGenVisitor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.indentationSymbol = '  '; // 2 spaces ftw
        return _this;
    }
    // 2 spaces ftw
    /**
     * @protected
     * @param {?} tag
     * @param {?=} attributes
     * @param {?=} autoclose
     * @return {?}
     */
    XmlCodeGenVisitor.prototype.openTag = 
    // 2 spaces ftw
    /**
     * @protected
     * @param {?} tag
     * @param {?=} attributes
     * @param {?=} autoclose
     * @return {?}
     */
    function (tag, attributes, autoclose) {
        if (attributes === void 0) { attributes = []; }
        if (autoclose === void 0) { autoclose = false; }
        return "<" + tag + (attributes.length !== 0 ? ' ' + attributes.join(' ') : '') + (autoclose ? ' /' : '') + ">";
    };
    /**
     * @protected
     * @param {?} tag
     * @return {?}
     */
    XmlCodeGenVisitor.prototype.closeTag = /**
     * @protected
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        return "</" + tag + ">";
    };
    /**
     * @protected
     * @param {?} n
     * @param {?} content
     * @return {?}
     */
    XmlCodeGenVisitor.prototype.indent = /**
     * @protected
     * @param {?} n
     * @param {?} content
     * @return {?}
     */
    function (n, content) {
        /** @type {?} */
        var indentation = !!n ? this.indentationSymbol.repeat(n) : '';
        return indentation + content.split('\n').join('\n' + indentation);
    };
    return XmlCodeGenVisitor;
}(CodeGenVisitor));
/**
 * @see CodeGenVisitor implementation that can be used to generate code in an XML-based representation.
 * @abstract
 */
export { XmlCodeGenVisitor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    XmlCodeGenVisitor.prototype.indentationSymbol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sY29kZWdlbnZpc2l0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3hhbWwtY29kZWdlbi8iLCJzb3VyY2VzIjpbImxpYi94bWxjb2RlZ2VudmlzaXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQU0xRDs7Ozs7SUFBZ0QsNkNBQWM7SUFBOUQ7UUFBQSxxRUFpQkM7UUFoQlMsdUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsZUFBZTs7SUFnQm5ELENBQUM7Ozs7Ozs7OztJQWRXLG1DQUFPOzs7Ozs7Ozs7SUFBakIsVUFBa0IsR0FBVyxFQUFFLFVBQWUsRUFBRSxTQUFpQjtRQUFsQywyQkFBQSxFQUFBLGVBQWU7UUFBRSwwQkFBQSxFQUFBLGlCQUFpQjtRQUMvRCxPQUFPLE1BQUksR0FBRyxJQUNaLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUN4RCxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFHLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRVMsb0NBQVE7Ozs7O0lBQWxCLFVBQW1CLEdBQVc7UUFDNUIsT0FBTyxPQUFLLEdBQUcsTUFBRyxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFUyxrQ0FBTTs7Ozs7O0lBQWhCLFVBQWlCLENBQVMsRUFBRSxPQUFlOztZQUNuQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMvRCxPQUFPLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUFnRCxjQUFjLEdBaUI3RDs7Ozs7Ozs7Ozs7SUFoQkMsOENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29kZUdlblZpc2l0b3IgfSBmcm9tICcuL2NvZGVnZW52aXNpdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSb3V0ZUNvbmZpZ0xvYWRFbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuLyoqXHJcbiAqIEBzZWUgQ29kZUdlblZpc2l0b3IgaW1wbGVtZW50YXRpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBnZW5lcmF0ZSBjb2RlIGluIGFuIFhNTC1iYXNlZCByZXByZXNlbnRhdGlvbi5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBYbWxDb2RlR2VuVmlzaXRvciBleHRlbmRzIENvZGVHZW5WaXNpdG9yIHtcclxuICBwcml2YXRlIGluZGVudGF0aW9uU3ltYm9sID0gJyAgJzsgLy8gMiBzcGFjZXMgZnR3XHJcblxyXG4gIHByb3RlY3RlZCBvcGVuVGFnKHRhZzogc3RyaW5nLCBhdHRyaWJ1dGVzID0gW10sIGF1dG9jbG9zZSA9IGZhbHNlKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgPCR7dGFnfSR7XHJcbiAgICAgIGF0dHJpYnV0ZXMubGVuZ3RoICE9PSAwID8gJyAnICsgYXR0cmlidXRlcy5qb2luKCcgJykgOiAnJ1xyXG4gICAgfSR7YXV0b2Nsb3NlID8gJyAvJyA6ICcnfT5gO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNsb3NlVGFnKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgPC8ke3RhZ30+YDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbmRlbnQobjogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaW5kZW50YXRpb24gPSAhIW4gPyB0aGlzLmluZGVudGF0aW9uU3ltYm9sLnJlcGVhdChuKSA6ICcnO1xyXG4gICAgcmV0dXJuIGluZGVudGF0aW9uICsgY29udGVudC5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIGluZGVudGF0aW9uKTtcclxuICB9XHJcbn1cclxuIl19