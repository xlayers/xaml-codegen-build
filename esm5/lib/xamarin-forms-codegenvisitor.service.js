/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { XmlCodeGenVisitor } from './xmlcodegenvisitor.service';
import { Shape } from './shape.service';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/svg-codegen";
/**
 * @see XmlCodeGenVisitor implementation that can be used to generate Xamarin.Forms code.
 */
var XamarinFormsCodeGenVisitor = /** @class */ (function (_super) {
    tslib_1.__extends(XamarinFormsCodeGenVisitor, _super);
    function XamarinFormsCodeGenVisitor(svgCodeGen) {
        var _this = _super.call(this) || this;
        _this.svgCodeGen = svgCodeGen;
        _this.fileList = [];
        return _this;
    }
    /**
     * @protected
     * @param {?} layer
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitLayer = /**
     * @protected
     * @param {?} layer
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    function (layer, template, depth) {
        if (template === void 0) { template = []; }
        if (depth === void 0) { depth = 0; }
        /** @type {?} */
        var content;
        if (((/** @type {?} */ (layer)))._class === 'group') {
            template.push(this.indent(depth, this.openGroup(layer)));
            content = this.visit(layer, template, depth + 1);
            template.push(this.indent(depth + 1, this.closeTag('AbsoluteLayout')));
            template.push(this.indent(depth, this.closeTag('Frame')));
        }
        else {
            content = this.visit(layer, template, depth + 1);
        }
        if (content) {
            template.push(this.indent(depth + 1, content));
        }
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitBitmap = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        return "<Image Source=\"" + ((/** @type {?} */ (ast))).image._ref + "\">";
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitText = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        /** @type {?} */
        var attr = {};
        /** @type {?} */
        var string = ast.attributedString;
        /** @type {?} */
        var fontAttribute = string.attributes[0].attributes.MSAttributedStringFontAttribute
            .attributes;
        /** @type {?} */
        var colorAttribute = ((/** @type {?} */ (string.attributes[0].attributes)))
            .MSAttributedStringColorAttribute;
        attr.Text = string.string;
        attr.FontSize = fontAttribute.size;
        attr.FontFamily = fontAttribute.name;
        attr.TextColor = this.colorRatioToHex(colorAttribute);
        attr.Opacity = colorAttribute.alpha;
        attr['AbsoluteLayout.LayoutBounds'] = Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", " + Math.round(ast.frame.height);
        return ('<Label ' +
            Object.keys(attr)
                .map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return key + '="' + attr[key] + '"';
            }))
                .join('\n' + ' '.repeat(7)) +
            '/>');
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitShape = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        /** @type {?} */
        var a = new Shape(((/** @type {?} */ (ast))).points);
        if (a.isRound()) {
            return this.visitRound(ast);
        }
        else if (a.isRectangle()) {
            return this.visitRectangle(ast);
        }
        else if (a.isLine()) {
            return this.visitLine(ast);
        }
        else {
            return this.visitSvg(ast);
        }
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitOther = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        if (((/** @type {?} */ (ast)))._class === 'oval' ||
            (((/** @type {?} */ (ast)))._class === 'rectangle' &&
                (!!ast.style.fills || !!ast.style.borders))) {
            return ("<Frame " +
                this.generateAbsoluteLayout(ast) +
                (" CornerRadius=\"" + (((/** @type {?} */ (ast)))._class === 'oval' ? ast.frame.width / 2 : '0') + "\"") +
                (!!ast.style.fills
                    ? ' BackgroundColor="' +
                        this.colorRatioToHex(ast.style.fills[0].color) +
                        '" Opacity="' +
                        ast.style.fills[0].color.alpha +
                        '"'
                    : ' BackgroundColor="Transparent"') +
                (!!ast.style.borders
                    ? ' BorderColor="' +
                        this.colorRatioToHex(ast.style.borders[0].color) +
                        '"'
                    : '') +
                ' HasShadow="false" />');
        }
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitRound = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        return ("<Frame " +
            this.generateAbsoluteLayout(ast) +
            (" CornerRadius=\"" + ast.frame.width / 2 + "\"") +
            (!!ast.style.fills
                ? ' BackgroundColor="' +
                    this.colorRatioToHex(ast.style.fills[0].color) +
                    '" Opacity="' +
                    ast.style.fills[0].color.alpha +
                    '"'
                : ' BackgroundColor="Transparent"') +
            (!!ast.style.borders
                ? ' BorderColor="' +
                    this.colorRatioToHex(ast.style.borders[0].color) +
                    '"'
                : '') +
            ' HasShadow="false" />');
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitRectangle = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        if (!!ast.style.borders) {
            return ("<Frame " +
                this.generateAbsoluteLayout(ast) +
                " CornerRadius=\"0\"" +
                (" BorderColor=\"" + this.colorRatioToHex(ast.style.borders[0].color) + "\"") +
                (!!ast.style.fills
                    ? " BackgroundColor=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"" + (" Opacity=\"" + ast.style.fills[0].color.alpha + "\"")
                    : " BackgroundColor=\"Transparent\"") +
                " HasShadow=\"false\" />");
        }
        else if (!!ast.style.fills) {
            return ("<BoxView " +
                this.generateAbsoluteLayout(ast) +
                (" Color=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"") +
                (" Opacity=\"" + ast.style.fills[0].color.alpha + "\" />"));
        }
        else {
            return '';
        }
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitLine = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        return ("<BoxView AbsoluteLayout.LayoutBounds=\"" + Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", 1\"" +
            (!!ast.style.fills
                ? " Color=\"" + this.colorRatioToHex(ast.style.fills[0].color) + "\"" +
                    (" Opacity=\"" + ast.style.fills[0].color.alpha + "\" />")
                : " Color=\"" + this.colorRatioToHex(ast.style.borders[0].color) + "\"" +
                    (" Opacity=\"" + ast.style.borders[0].color.alpha + "\" />")));
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.visitSvg = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        /** @type {?} */
        var svgFileName = this.sanitizeSvgFileName(ast.do_objectID);
        this.fileList.push(tslib_1.__assign({}, this.svgCodeGen.aggregate(ast)[0], { uri: svgFileName, kind: 'xamarinForms' }));
        return ("<ffSvg:SvgCachedImage Source=\"resource://xLayers.path.to." + svgFileName + "\"" +
            "\n" +
            " ".repeat(22) +
            this.generateAbsoluteLayout(ast) +
            "/>");
    };
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.openGroup = /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        /** @type {?} */
        var border = this.checkLayersForBorder(ast);
        /** @type {?} */
        var background = this.checkLayersForBackground(ast);
        return ("<Frame " +
            this.generateAbsoluteLayout(ast) +
            " CornerRadius=\"0\" Padding=\"0\"" +
            (border !== false ? ' BorderColor="' + border + '"' : '') +
            ' BackgroundColor="' +
            (background !== false ? background : 'Transparent') +
            '"' +
            " HasShadow=\"false\">" +
            "\n  <AbsoluteLayout>");
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.sanitizeSvgFileName = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return '_' + name.toLowerCase().replace(/[^a-z0-9\_]/g, '_') + '.svg';
    };
    /**
     * @private
     * @param {?} ast
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.generateAbsoluteLayout = /**
     * @private
     * @param {?} ast
     * @return {?}
     */
    function (ast) {
        return "AbsoluteLayout.LayoutBounds=\"" + Math.round(ast.frame.x) + ", " + Math.round(ast.frame.y) + ", " + Math.round(ast.frame.width) + ", " + Math.round(ast.frame.height) + "\"";
    };
    /**
     * @return {?}
     */
    XamarinFormsCodeGenVisitor.prototype.consumeFileList = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tempFileList = this.fileList;
        this.fileList = [];
        return tempFileList;
    };
    XamarinFormsCodeGenVisitor.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    XamarinFormsCodeGenVisitor.ctorParameters = function () { return [
        { type: SvgCodeGenService }
    ]; };
    /** @nocollapse */ XamarinFormsCodeGenVisitor.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function XamarinFormsCodeGenVisitor_Factory() { return new XamarinFormsCodeGenVisitor(i0.ɵɵinject(i1.SvgCodeGenService)); }, token: XamarinFormsCodeGenVisitor, providedIn: "root" });
    return XamarinFormsCodeGenVisitor;
}(XmlCodeGenVisitor));
export { XamarinFormsCodeGenVisitor };
if (false) {
    /** @type {?} */
    XamarinFormsCodeGenVisitor.prototype.fileList;
    /**
     * @type {?}
     * @private
     */
    XamarinFormsCodeGenVisitor.prototype.svgCodeGen;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGFtYXJpbi1mb3Jtcy1jb2RlZ2VudmlzaXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMveGFtbC1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3hhbWFyaW4tZm9ybXMtY29kZWdlbnZpc2l0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7QUFLekQ7SUFHZ0Qsc0RBQWlCO0lBQy9ELG9DQUE2QixVQUE2QjtRQUExRCxZQUNFLGlCQUFPLFNBQ1I7UUFGNEIsZ0JBQVUsR0FBVixVQUFVLENBQW1CO1FBSTFELGNBQVEsR0FBRyxFQUFFLENBQUM7O0lBRmQsQ0FBQzs7Ozs7Ozs7SUFJUywrQ0FBVTs7Ozs7OztJQUFwQixVQUNFLEtBQW9CLEVBQ3BCLFFBQXVCLEVBQ3ZCLEtBQWlCO1FBRGpCLHlCQUFBLEVBQUEsYUFBdUI7UUFDdkIsc0JBQUEsRUFBQSxTQUFpQjs7WUFFYixPQUFPO1FBRVgsSUFBSSxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtZQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0s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QXNCOzs7OztJQUE5QixVQUErQixHQUFrQjtRQUMvQyxPQUFPLG1DQUFnQyxJQUFJLENBQUMsS0FBSyxDQUMvQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDWixVQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBSyxJQUFJLENBQUMsS0FBSyxDQUMxQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDaEIsVUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQUcsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsb0RBQWU7OztJQUFmOztZQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUTtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztnQkFsT0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFQUSxpQkFBaUI7OztxQ0FIMUI7Q0EyT0MsQUFuT0QsQ0FHZ0QsaUJBQWlCLEdBZ09oRTtTQWhPWSwwQkFBMEI7OztJQUtyQyw4Q0FBYzs7Ozs7SUFKRixnREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFhtbENvZGVHZW5WaXNpdG9yIH0gZnJvbSAnLi94bWxjb2RlZ2VudmlzaXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuL3NoYXBlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdmdDb2RlR2VuU2VydmljZSB9IGZyb20gJ0B4bGF5ZXJzL3N2Zy1jb2RlZ2VuJztcclxuXHJcbi8qKlxyXG4gKiBAc2VlIFhtbENvZGVHZW5WaXNpdG9yIGltcGxlbWVudGF0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2VuZXJhdGUgWGFtYXJpbi5Gb3JtcyBjb2RlLlxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgWGFtYXJpbkZvcm1zQ29kZUdlblZpc2l0b3IgZXh0ZW5kcyBYbWxDb2RlR2VuVmlzaXRvciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzdmdDb2RlR2VuOiBTdmdDb2RlR2VuU2VydmljZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGZpbGVMaXN0ID0gW107XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdExheWVyKFxyXG4gICAgbGF5ZXI6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nW10gPSBbXSxcclxuICAgIGRlcHRoOiBudW1iZXIgPSAwXHJcbiAgKSB7XHJcbiAgICBsZXQgY29udGVudDtcclxuXHJcbiAgICBpZiAoKGxheWVyIGFzIGFueSkuX2NsYXNzID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2godGhpcy5pbmRlbnQoZGVwdGgsIHRoaXMub3Blbkdyb3VwKGxheWVyKSkpO1xyXG4gICAgICBjb250ZW50ID0gdGhpcy52aXNpdChsYXllciwgdGVtcGxhdGUsIGRlcHRoICsgMSk7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2godGhpcy5pbmRlbnQoZGVwdGggKyAxLCB0aGlzLmNsb3NlVGFnKCdBYnNvbHV0ZUxheW91dCcpKSk7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2godGhpcy5pbmRlbnQoZGVwdGgsIHRoaXMuY2xvc2VUYWcoJ0ZyYW1lJykpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnRlbnQgPSB0aGlzLnZpc2l0KGxheWVyLCB0ZW1wbGF0ZSwgZGVwdGggKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29udGVudCkge1xyXG4gICAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuaW5kZW50KGRlcHRoICsgMSwgY29udGVudCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0Qml0bWFwKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYDxJbWFnZSBTb3VyY2U9XCIkeyhhc3QgYXMgYW55KS5pbWFnZS5fcmVmfVwiPmA7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRUZXh0KGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBhdHRyOiBhbnkgPSB7fTtcclxuICAgIGNvbnN0IHN0cmluZyA9IGFzdC5hdHRyaWJ1dGVkU3RyaW5nO1xyXG4gICAgY29uc3QgZm9udEF0dHJpYnV0ZSA9XHJcbiAgICAgIHN0cmluZy5hdHRyaWJ1dGVzWzBdLmF0dHJpYnV0ZXMuTVNBdHRyaWJ1dGVkU3RyaW5nRm9udEF0dHJpYnV0ZVxyXG4gICAgICAgIC5hdHRyaWJ1dGVzO1xyXG4gICAgY29uc3QgY29sb3JBdHRyaWJ1dGUgPSAoc3RyaW5nLmF0dHJpYnV0ZXNbMF0uYXR0cmlidXRlcyBhcyBhbnkpXHJcbiAgICAgIC5NU0F0dHJpYnV0ZWRTdHJpbmdDb2xvckF0dHJpYnV0ZTtcclxuXHJcbiAgICBhdHRyLlRleHQgPSBzdHJpbmcuc3RyaW5nO1xyXG4gICAgYXR0ci5Gb250U2l6ZSA9IGZvbnRBdHRyaWJ1dGUuc2l6ZTtcclxuICAgIGF0dHIuRm9udEZhbWlseSA9IGZvbnRBdHRyaWJ1dGUubmFtZTtcclxuICAgIGF0dHIuVGV4dENvbG9yID0gdGhpcy5jb2xvclJhdGlvVG9IZXgoY29sb3JBdHRyaWJ1dGUpO1xyXG4gICAgYXR0ci5PcGFjaXR5ID0gY29sb3JBdHRyaWJ1dGUuYWxwaGE7XHJcbiAgICBhdHRyWydBYnNvbHV0ZUxheW91dC5MYXlvdXRCb3VuZHMnXSA9IGAke01hdGgucm91bmQoXHJcbiAgICAgIGFzdC5mcmFtZS54XHJcbiAgICApfSwgJHtNYXRoLnJvdW5kKGFzdC5mcmFtZS55KX0sICR7TWF0aC5yb3VuZChcclxuICAgICAgYXN0LmZyYW1lLndpZHRoXHJcbiAgICApfSwgJHtNYXRoLnJvdW5kKGFzdC5mcmFtZS5oZWlnaHQpfWA7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgJzxMYWJlbCAnICtcclxuICAgICAgT2JqZWN0LmtleXMoYXR0cilcclxuICAgICAgICAubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgcmV0dXJuIGtleSArICc9XCInICsgYXR0cltrZXldICsgJ1wiJztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKCdcXG4nICsgJyAnLnJlcGVhdCg3KSkgK1xyXG4gICAgICAnLz4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0U2hhcGUoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIGlmICgoYXN0IGFzIGFueSkuc2hhcGVWaXNpdGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGEgPSBuZXcgU2hhcGUoKGFzdCBhcyBhbnkpLnBvaW50cyk7XHJcbiAgICBpZiAoYS5pc1JvdW5kKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzaXRSb3VuZChhc3QpO1xyXG4gICAgfSBlbHNlIGlmIChhLmlzUmVjdGFuZ2xlKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzaXRSZWN0YW5nbGUoYXN0KTtcclxuICAgIH0gZWxzZSBpZiAoYS5pc0xpbmUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy52aXNpdExpbmUoYXN0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0U3ZnKGFzdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRPdGhlcihhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKChhc3QgYXMgYW55KS5zaGFwZVZpc2l0ZWQgPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoYXN0IGFzIGFueSkuX2NsYXNzID09PSAnb3ZhbCcgfHxcclxuICAgICAgKChhc3QgYXMgYW55KS5fY2xhc3MgPT09ICdyZWN0YW5nbGUnICYmXHJcbiAgICAgICAgKCEhYXN0LnN0eWxlLmZpbGxzIHx8ICEhYXN0LnN0eWxlLmJvcmRlcnMpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgYDxGcmFtZSBgICtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlQWJzb2x1dGVMYXlvdXQoYXN0KSArXHJcbiAgICAgICAgYCBDb3JuZXJSYWRpdXM9XCIke1xyXG4gICAgICAgICAgKGFzdCBhcyBhbnkpLl9jbGFzcyA9PT0gJ292YWwnID8gYXN0LmZyYW1lLndpZHRoIC8gMiA6ICcwJ1xyXG4gICAgICAgIH1cImAgK1xyXG4gICAgICAgICghIWFzdC5zdHlsZS5maWxsc1xyXG4gICAgICAgICAgPyAnIEJhY2tncm91bmRDb2xvcj1cIicgK1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IpICtcclxuICAgICAgICAgICAgJ1wiIE9wYWNpdHk9XCInICtcclxuICAgICAgICAgICAgYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yLmFscGhhICtcclxuICAgICAgICAgICAgJ1wiJ1xyXG4gICAgICAgICAgOiAnIEJhY2tncm91bmRDb2xvcj1cIlRyYW5zcGFyZW50XCInKSArXHJcbiAgICAgICAgKCEhYXN0LnN0eWxlLmJvcmRlcnNcclxuICAgICAgICAgID8gJyBCb3JkZXJDb2xvcj1cIicgK1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuYm9yZGVyc1swXS5jb2xvcikgK1xyXG4gICAgICAgICAgICAnXCInXHJcbiAgICAgICAgICA6ICcnKSArXHJcbiAgICAgICAgJyBIYXNTaGFkb3c9XCJmYWxzZVwiIC8+J1xyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0Um91bmQoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGA8RnJhbWUgYCArXHJcbiAgICAgIHRoaXMuZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3QpICtcclxuICAgICAgYCBDb3JuZXJSYWRpdXM9XCIke2FzdC5mcmFtZS53aWR0aCAvIDJ9XCJgICtcclxuICAgICAgKCEhYXN0LnN0eWxlLmZpbGxzXHJcbiAgICAgICAgPyAnIEJhY2tncm91bmRDb2xvcj1cIicgK1xyXG4gICAgICAgICAgdGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yKSArXHJcbiAgICAgICAgICAnXCIgT3BhY2l0eT1cIicgK1xyXG4gICAgICAgICAgYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yLmFscGhhICtcclxuICAgICAgICAgICdcIidcclxuICAgICAgICA6ICcgQmFja2dyb3VuZENvbG9yPVwiVHJhbnNwYXJlbnRcIicpICtcclxuICAgICAgKCEhYXN0LnN0eWxlLmJvcmRlcnNcclxuICAgICAgICA/ICcgQm9yZGVyQ29sb3I9XCInICtcclxuICAgICAgICAgIHRoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5ib3JkZXJzWzBdLmNvbG9yKSArXHJcbiAgICAgICAgICAnXCInXHJcbiAgICAgICAgOiAnJykgK1xyXG4gICAgICAnIEhhc1NoYWRvdz1cImZhbHNlXCIgLz4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0UmVjdGFuZ2xlKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBpZiAoISFhc3Quc3R5bGUuYm9yZGVycykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGA8RnJhbWUgYCArXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUFic29sdXRlTGF5b3V0KGFzdCkgK1xyXG4gICAgICAgIGAgQ29ybmVyUmFkaXVzPVwiMFwiYCArXHJcbiAgICAgICAgYCBCb3JkZXJDb2xvcj1cIiR7dGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmJvcmRlcnNbMF0uY29sb3IpfVwiYCArXHJcbiAgICAgICAgKCEhYXN0LnN0eWxlLmZpbGxzXHJcbiAgICAgICAgICA/IGAgQmFja2dyb3VuZENvbG9yPVwiJHt0aGlzLmNvbG9yUmF0aW9Ub0hleChcclxuICAgICAgICAgICAgICBhc3Quc3R5bGUuZmlsbHNbMF0uY29sb3JcclxuICAgICAgICAgICAgKX1cImAgKyBgIE9wYWNpdHk9XCIke2FzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYX1cImBcclxuICAgICAgICAgIDogYCBCYWNrZ3JvdW5kQ29sb3I9XCJUcmFuc3BhcmVudFwiYCkgK1xyXG4gICAgICAgIGAgSGFzU2hhZG93PVwiZmFsc2VcIiAvPmBcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoISFhc3Quc3R5bGUuZmlsbHMpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBgPEJveFZpZXcgYCArXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUFic29sdXRlTGF5b3V0KGFzdCkgK1xyXG4gICAgICAgIGAgQ29sb3I9XCIke3RoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5maWxsc1swXS5jb2xvcil9XCJgICtcclxuICAgICAgICBgIE9wYWNpdHk9XCIke2FzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYX1cIiAvPmBcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdExpbmUoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGA8Qm94VmlldyBBYnNvbHV0ZUxheW91dC5MYXlvdXRCb3VuZHM9XCIke01hdGgucm91bmQoXHJcbiAgICAgICAgYXN0LmZyYW1lLnhcclxuICAgICAgKX0sICR7TWF0aC5yb3VuZChhc3QuZnJhbWUueSl9LCAke01hdGgucm91bmQoYXN0LmZyYW1lLndpZHRoKX0sIDFcImAgK1xyXG4gICAgICAoISFhc3Quc3R5bGUuZmlsbHNcclxuICAgICAgICA/IGAgQ29sb3I9XCIke3RoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5maWxsc1swXS5jb2xvcil9XCJgICtcclxuICAgICAgICAgIGAgT3BhY2l0eT1cIiR7YXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yLmFscGhhfVwiIC8+YFxyXG4gICAgICAgIDogYCBDb2xvcj1cIiR7dGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmJvcmRlcnNbMF0uY29sb3IpfVwiYCArXHJcbiAgICAgICAgICBgIE9wYWNpdHk9XCIke2FzdC5zdHlsZS5ib3JkZXJzWzBdLmNvbG9yLmFscGhhfVwiIC8+YClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRTdmcoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN2Z0ZpbGVOYW1lID0gdGhpcy5zYW5pdGl6ZVN2Z0ZpbGVOYW1lKGFzdC5kb19vYmplY3RJRCk7XHJcbiAgICB0aGlzLmZpbGVMaXN0LnB1c2goe1xyXG4gICAgICAuLi50aGlzLnN2Z0NvZGVHZW4uYWdncmVnYXRlKGFzdClbMF0sXHJcbiAgICAgIHVyaTogc3ZnRmlsZU5hbWUsXHJcbiAgICAgIGtpbmQ6ICd4YW1hcmluRm9ybXMnXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBgPGZmU3ZnOlN2Z0NhY2hlZEltYWdlIFNvdXJjZT1cInJlc291cmNlOi8veExheWVycy5wYXRoLnRvLiR7c3ZnRmlsZU5hbWV9XCJgICtcclxuICAgICAgYFxcbmAgK1xyXG4gICAgICBgIGAucmVwZWF0KDIyKSArXHJcbiAgICAgIHRoaXMuZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3QpICtcclxuICAgICAgYC8+YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBvcGVuR3JvdXAoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGJvcmRlciA9IHRoaXMuY2hlY2tMYXllcnNGb3JCb3JkZXIoYXN0KTtcclxuICAgIGNvbnN0IGJhY2tncm91bmQgPSB0aGlzLmNoZWNrTGF5ZXJzRm9yQmFja2dyb3VuZChhc3QpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIGA8RnJhbWUgYCArXHJcbiAgICAgIHRoaXMuZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3QpICtcclxuICAgICAgYCBDb3JuZXJSYWRpdXM9XCIwXCIgUGFkZGluZz1cIjBcImAgK1xyXG4gICAgICAoYm9yZGVyICE9PSBmYWxzZSA/ICcgQm9yZGVyQ29sb3I9XCInICsgYm9yZGVyICsgJ1wiJyA6ICcnKSArXHJcbiAgICAgICcgQmFja2dyb3VuZENvbG9yPVwiJyArXHJcbiAgICAgIChiYWNrZ3JvdW5kICE9PSBmYWxzZSA/IGJhY2tncm91bmQgOiAnVHJhbnNwYXJlbnQnKSArXHJcbiAgICAgICdcIicgK1xyXG4gICAgICBgIEhhc1NoYWRvdz1cImZhbHNlXCI+YCArXHJcbiAgICAgIGBcXG4gIDxBYnNvbHV0ZUxheW91dD5gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYW5pdGl6ZVN2Z0ZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ18nICsgbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XFxfXS9nLCAnXycpICsgJy5zdmcnO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUFic29sdXRlTGF5b3V0KGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYEFic29sdXRlTGF5b3V0LkxheW91dEJvdW5kcz1cIiR7TWF0aC5yb3VuZChcclxuICAgICAgYXN0LmZyYW1lLnhcclxuICAgICl9LCAke01hdGgucm91bmQoYXN0LmZyYW1lLnkpfSwgJHtNYXRoLnJvdW5kKFxyXG4gICAgICBhc3QuZnJhbWUud2lkdGhcclxuICAgICl9LCAke01hdGgucm91bmQoYXN0LmZyYW1lLmhlaWdodCl9XCJgO1xyXG4gIH1cclxuXHJcbiAgY29uc3VtZUZpbGVMaXN0KCk6IGFueSB7XHJcbiAgICBjb25zdCB0ZW1wRmlsZUxpc3QgPSB0aGlzLmZpbGVMaXN0O1xyXG4gICAgdGhpcy5maWxlTGlzdCA9IFtdO1xyXG4gICAgcmV0dXJuIHRlbXBGaWxlTGlzdDtcclxuICB9XHJcbn1cclxuIl19