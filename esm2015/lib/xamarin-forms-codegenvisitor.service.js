/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { XmlCodeGenVisitor } from './xmlcodegenvisitor.service';
import { Shape } from './shape.service';
import { SvgCodeGenService } from '@xlayers/svg-codegen';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/svg-codegen";
/**
 * @see XmlCodeGenVisitor implementation that can be used to generate Xamarin.Forms code.
 */
export class XamarinFormsCodeGenVisitor extends XmlCodeGenVisitor {
    /**
     * @param {?} svgCodeGen
     */
    constructor(svgCodeGen) {
        super();
        this.svgCodeGen = svgCodeGen;
        this.fileList = [];
    }
    /**
     * @protected
     * @param {?} layer
     * @param {?=} template
     * @param {?=} depth
     * @return {?}
     */
    visitLayer(layer, template = [], depth = 0) {
        /** @type {?} */
        let content;
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
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitBitmap(ast) {
        return `<Image Source="${((/** @type {?} */ (ast))).image._ref}">`;
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitText(ast) {
        /** @type {?} */
        const attr = {};
        /** @type {?} */
        const string = ast.attributedString;
        /** @type {?} */
        const fontAttribute = string.attributes[0].attributes.MSAttributedStringFontAttribute
            .attributes;
        /** @type {?} */
        const colorAttribute = ((/** @type {?} */ (string.attributes[0].attributes)))
            .MSAttributedStringColorAttribute;
        attr.Text = string.string;
        attr.FontSize = fontAttribute.size;
        attr.FontFamily = fontAttribute.name;
        attr.TextColor = this.colorRatioToHex(colorAttribute);
        attr.Opacity = colorAttribute.alpha;
        attr['AbsoluteLayout.LayoutBounds'] = `${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, ${Math.round(ast.frame.height)}`;
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
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitShape(ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        /** @type {?} */
        const a = new Shape(((/** @type {?} */ (ast))).points);
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
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitOther(ast) {
        if (((/** @type {?} */ (ast))).shapeVisited === true) {
            return null;
        }
        if (((/** @type {?} */ (ast)))._class === 'oval' ||
            (((/** @type {?} */ (ast)))._class === 'rectangle' &&
                (!!ast.style.fills || !!ast.style.borders))) {
            return (`<Frame ` +
                this.generateAbsoluteLayout(ast) +
                ` CornerRadius="${((/** @type {?} */ (ast)))._class === 'oval' ? ast.frame.width / 2 : '0'}"` +
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
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitRound(ast) {
        return (`<Frame ` +
            this.generateAbsoluteLayout(ast) +
            ` CornerRadius="${ast.frame.width / 2}"` +
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
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitRectangle(ast) {
        if (!!ast.style.borders) {
            return (`<Frame ` +
                this.generateAbsoluteLayout(ast) +
                ` CornerRadius="0"` +
                ` BorderColor="${this.colorRatioToHex(ast.style.borders[0].color)}"` +
                (!!ast.style.fills
                    ? ` BackgroundColor="${this.colorRatioToHex(ast.style.fills[0].color)}"` + ` Opacity="${ast.style.fills[0].color.alpha}"`
                    : ` BackgroundColor="Transparent"`) +
                ` HasShadow="false" />`);
        }
        else if (!!ast.style.fills) {
            return (`<BoxView ` +
                this.generateAbsoluteLayout(ast) +
                ` Color="${this.colorRatioToHex(ast.style.fills[0].color)}"` +
                ` Opacity="${ast.style.fills[0].color.alpha}" />`);
        }
        else {
            return '';
        }
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitLine(ast) {
        return (`<BoxView AbsoluteLayout.LayoutBounds="${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, 1"` +
            (!!ast.style.fills
                ? ` Color="${this.colorRatioToHex(ast.style.fills[0].color)}"` +
                    ` Opacity="${ast.style.fills[0].color.alpha}" />`
                : ` Color="${this.colorRatioToHex(ast.style.borders[0].color)}"` +
                    ` Opacity="${ast.style.borders[0].color.alpha}" />`));
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    visitSvg(ast) {
        /** @type {?} */
        const svgFileName = this.sanitizeSvgFileName(ast.do_objectID);
        this.fileList.push(Object.assign({}, this.svgCodeGen.aggregate(ast)[0], { uri: svgFileName, kind: 'xamarinForms' }));
        return (`<ffSvg:SvgCachedImage Source="resource://xLayers.path.to.${svgFileName}"` +
            `\n` +
            ` `.repeat(22) +
            this.generateAbsoluteLayout(ast) +
            `/>`);
    }
    /**
     * @protected
     * @param {?} ast
     * @return {?}
     */
    openGroup(ast) {
        /** @type {?} */
        const border = this.checkLayersForBorder(ast);
        /** @type {?} */
        const background = this.checkLayersForBackground(ast);
        return (`<Frame ` +
            this.generateAbsoluteLayout(ast) +
            ` CornerRadius="0" Padding="0"` +
            (border !== false ? ' BorderColor="' + border + '"' : '') +
            ' BackgroundColor="' +
            (background !== false ? background : 'Transparent') +
            '"' +
            ` HasShadow="false">` +
            `\n  <AbsoluteLayout>`);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    sanitizeSvgFileName(name) {
        return '_' + name.toLowerCase().replace(/[^a-z0-9\_]/g, '_') + '.svg';
    }
    /**
     * @private
     * @param {?} ast
     * @return {?}
     */
    generateAbsoluteLayout(ast) {
        return `AbsoluteLayout.LayoutBounds="${Math.round(ast.frame.x)}, ${Math.round(ast.frame.y)}, ${Math.round(ast.frame.width)}, ${Math.round(ast.frame.height)}"`;
    }
    /**
     * @return {?}
     */
    consumeFileList() {
        /** @type {?} */
        const tempFileList = this.fileList;
        this.fileList = [];
        return tempFileList;
    }
}
XamarinFormsCodeGenVisitor.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
XamarinFormsCodeGenVisitor.ctorParameters = () => [
    { type: SvgCodeGenService }
];
/** @nocollapse */ XamarinFormsCodeGenVisitor.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function XamarinFormsCodeGenVisitor_Factory() { return new XamarinFormsCodeGenVisitor(i0.ɵɵinject(i1.SvgCodeGenService)); }, token: XamarinFormsCodeGenVisitor, providedIn: "root" });
if (false) {
    /** @type {?} */
    XamarinFormsCodeGenVisitor.prototype.fileList;
    /**
     * @type {?}
     * @private
     */
    XamarinFormsCodeGenVisitor.prototype.svgCodeGen;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGFtYXJpbi1mb3Jtcy1jb2RlZ2VudmlzaXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMveGFtbC1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL3hhbWFyaW4tZm9ybXMtY29kZWdlbnZpc2l0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7OztBQVF6RCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsaUJBQWlCOzs7O0lBQy9ELFlBQTZCLFVBQTZCO1FBQ3hELEtBQUssRUFBRSxDQUFDO1FBRG1CLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBSTFELGFBQVEsR0FBRyxFQUFFLENBQUM7SUFGZCxDQUFDOzs7Ozs7OztJQUlTLFVBQVUsQ0FDbEIsS0FBb0IsRUFDcEIsV0FBcUIsRUFBRSxFQUN2QixRQUFnQixDQUFDOztZQUViLE9BQU87UUFFWCxJQUFJLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFD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QUssQ0FDaEIsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsZUFBZTs7Y0FDUCxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVE7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7O1lBbE9GLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVBRLGlCQUFpQjs7Ozs7SUFheEIsOENBQWM7Ozs7O0lBSkYsZ0RBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBYbWxDb2RlR2VuVmlzaXRvciB9IGZyb20gJy4veG1sY29kZWdlbnZpc2l0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi9zaGFwZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ZnQ29kZUdlblNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9zdmctY29kZWdlbic7XHJcblxyXG4vKipcclxuICogQHNlZSBYbWxDb2RlR2VuVmlzaXRvciBpbXBsZW1lbnRhdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGdlbmVyYXRlIFhhbWFyaW4uRm9ybXMgY29kZS5cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFhhbWFyaW5Gb3Jtc0NvZGVHZW5WaXNpdG9yIGV4dGVuZHMgWG1sQ29kZUdlblZpc2l0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc3ZnQ29kZUdlbjogU3ZnQ29kZUdlblNlcnZpY2UpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBmaWxlTGlzdCA9IFtdO1xyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRMYXllcihcclxuICAgIGxheWVyOiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgdGVtcGxhdGU6IHN0cmluZ1tdID0gW10sXHJcbiAgICBkZXB0aDogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgbGV0IGNvbnRlbnQ7XHJcblxyXG4gICAgaWYgKChsYXllciBhcyBhbnkpLl9jbGFzcyA9PT0gJ2dyb3VwJykge1xyXG4gICAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuaW5kZW50KGRlcHRoLCB0aGlzLm9wZW5Hcm91cChsYXllcikpKTtcclxuICAgICAgY29udGVudCA9IHRoaXMudmlzaXQobGF5ZXIsIHRlbXBsYXRlLCBkZXB0aCArIDEpO1xyXG4gICAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuaW5kZW50KGRlcHRoICsgMSwgdGhpcy5jbG9zZVRhZygnQWJzb2x1dGVMYXlvdXQnKSkpO1xyXG4gICAgICB0ZW1wbGF0ZS5wdXNoKHRoaXMuaW5kZW50KGRlcHRoLCB0aGlzLmNsb3NlVGFnKCdGcmFtZScpKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb250ZW50ID0gdGhpcy52aXNpdChsYXllciwgdGVtcGxhdGUsIGRlcHRoICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgdGVtcGxhdGUucHVzaCh0aGlzLmluZGVudChkZXB0aCArIDEsIGNvbnRlbnQpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdEJpdG1hcChhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGA8SW1hZ2UgU291cmNlPVwiJHsoYXN0IGFzIGFueSkuaW1hZ2UuX3JlZn1cIj5gO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0VGV4dChhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgYXR0cjogYW55ID0ge307XHJcbiAgICBjb25zdCBzdHJpbmcgPSBhc3QuYXR0cmlidXRlZFN0cmluZztcclxuICAgIGNvbnN0IGZvbnRBdHRyaWJ1dGUgPVxyXG4gICAgICBzdHJpbmcuYXR0cmlidXRlc1swXS5hdHRyaWJ1dGVzLk1TQXR0cmlidXRlZFN0cmluZ0ZvbnRBdHRyaWJ1dGVcclxuICAgICAgICAuYXR0cmlidXRlcztcclxuICAgIGNvbnN0IGNvbG9yQXR0cmlidXRlID0gKHN0cmluZy5hdHRyaWJ1dGVzWzBdLmF0dHJpYnV0ZXMgYXMgYW55KVxyXG4gICAgICAuTVNBdHRyaWJ1dGVkU3RyaW5nQ29sb3JBdHRyaWJ1dGU7XHJcblxyXG4gICAgYXR0ci5UZXh0ID0gc3RyaW5nLnN0cmluZztcclxuICAgIGF0dHIuRm9udFNpemUgPSBmb250QXR0cmlidXRlLnNpemU7XHJcbiAgICBhdHRyLkZvbnRGYW1pbHkgPSBmb250QXR0cmlidXRlLm5hbWU7XHJcbiAgICBhdHRyLlRleHRDb2xvciA9IHRoaXMuY29sb3JSYXRpb1RvSGV4KGNvbG9yQXR0cmlidXRlKTtcclxuICAgIGF0dHIuT3BhY2l0eSA9IGNvbG9yQXR0cmlidXRlLmFscGhhO1xyXG4gICAgYXR0clsnQWJzb2x1dGVMYXlvdXQuTGF5b3V0Qm91bmRzJ10gPSBgJHtNYXRoLnJvdW5kKFxyXG4gICAgICBhc3QuZnJhbWUueFxyXG4gICAgKX0sICR7TWF0aC5yb3VuZChhc3QuZnJhbWUueSl9LCAke01hdGgucm91bmQoXHJcbiAgICAgIGFzdC5mcmFtZS53aWR0aFxyXG4gICAgKX0sICR7TWF0aC5yb3VuZChhc3QuZnJhbWUuaGVpZ2h0KX1gO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICc8TGFiZWwgJyArXHJcbiAgICAgIE9iamVjdC5rZXlzKGF0dHIpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgIHJldHVybiBrZXkgKyAnPVwiJyArIGF0dHJba2V5XSArICdcIic7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignXFxuJyArICcgJy5yZXBlYXQoNykpICtcclxuICAgICAgJy8+J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdFNoYXBlKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBpZiAoKGFzdCBhcyBhbnkpLnNoYXBlVmlzaXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhID0gbmV3IFNoYXBlKChhc3QgYXMgYW55KS5wb2ludHMpO1xyXG4gICAgaWYgKGEuaXNSb3VuZCgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0Um91bmQoYXN0KTtcclxuICAgIH0gZWxzZSBpZiAoYS5pc1JlY3RhbmdsZSgpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0UmVjdGFuZ2xlKGFzdCk7XHJcbiAgICB9IGVsc2UgaWYgKGEuaXNMaW5lKCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzaXRMaW5lKGFzdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy52aXNpdFN2Zyhhc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0T3RoZXIoYXN0OiBTa2V0Y2hNU0xheWVyKTogc3RyaW5nIHtcclxuICAgIGlmICgoYXN0IGFzIGFueSkuc2hhcGVWaXNpdGVkID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgKGFzdCBhcyBhbnkpLl9jbGFzcyA9PT0gJ292YWwnIHx8XHJcbiAgICAgICgoYXN0IGFzIGFueSkuX2NsYXNzID09PSAncmVjdGFuZ2xlJyAmJlxyXG4gICAgICAgICghIWFzdC5zdHlsZS5maWxscyB8fCAhIWFzdC5zdHlsZS5ib3JkZXJzKSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGA8RnJhbWUgYCArXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUFic29sdXRlTGF5b3V0KGFzdCkgK1xyXG4gICAgICAgIGAgQ29ybmVyUmFkaXVzPVwiJHtcclxuICAgICAgICAgIChhc3QgYXMgYW55KS5fY2xhc3MgPT09ICdvdmFsJyA/IGFzdC5mcmFtZS53aWR0aCAvIDIgOiAnMCdcclxuICAgICAgICB9XCJgICtcclxuICAgICAgICAoISFhc3Quc3R5bGUuZmlsbHNcclxuICAgICAgICAgID8gJyBCYWNrZ3JvdW5kQ29sb3I9XCInICtcclxuICAgICAgICAgICAgdGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yKSArXHJcbiAgICAgICAgICAgICdcIiBPcGFjaXR5PVwiJyArXHJcbiAgICAgICAgICAgIGFzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYSArXHJcbiAgICAgICAgICAgICdcIidcclxuICAgICAgICAgIDogJyBCYWNrZ3JvdW5kQ29sb3I9XCJUcmFuc3BhcmVudFwiJykgK1xyXG4gICAgICAgICghIWFzdC5zdHlsZS5ib3JkZXJzXHJcbiAgICAgICAgICA/ICcgQm9yZGVyQ29sb3I9XCInICtcclxuICAgICAgICAgICAgdGhpcy5jb2xvclJhdGlvVG9IZXgoYXN0LnN0eWxlLmJvcmRlcnNbMF0uY29sb3IpICtcclxuICAgICAgICAgICAgJ1wiJ1xyXG4gICAgICAgICAgOiAnJykgK1xyXG4gICAgICAgICcgSGFzU2hhZG93PVwiZmFsc2VcIiAvPidcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdFJvdW5kKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBgPEZyYW1lIGAgK1xyXG4gICAgICB0aGlzLmdlbmVyYXRlQWJzb2x1dGVMYXlvdXQoYXN0KSArXHJcbiAgICAgIGAgQ29ybmVyUmFkaXVzPVwiJHthc3QuZnJhbWUud2lkdGggLyAyfVwiYCArXHJcbiAgICAgICghIWFzdC5zdHlsZS5maWxsc1xyXG4gICAgICAgID8gJyBCYWNrZ3JvdW5kQ29sb3I9XCInICtcclxuICAgICAgICAgIHRoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5maWxsc1swXS5jb2xvcikgK1xyXG4gICAgICAgICAgJ1wiIE9wYWNpdHk9XCInICtcclxuICAgICAgICAgIGFzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYSArXHJcbiAgICAgICAgICAnXCInXHJcbiAgICAgICAgOiAnIEJhY2tncm91bmRDb2xvcj1cIlRyYW5zcGFyZW50XCInKSArXHJcbiAgICAgICghIWFzdC5zdHlsZS5ib3JkZXJzXHJcbiAgICAgICAgPyAnIEJvcmRlckNvbG9yPVwiJyArXHJcbiAgICAgICAgICB0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuYm9yZGVyc1swXS5jb2xvcikgK1xyXG4gICAgICAgICAgJ1wiJ1xyXG4gICAgICAgIDogJycpICtcclxuICAgICAgJyBIYXNTaGFkb3c9XCJmYWxzZVwiIC8+J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB2aXNpdFJlY3RhbmdsZShhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKCEhYXN0LnN0eWxlLmJvcmRlcnMpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBgPEZyYW1lIGAgK1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3QpICtcclxuICAgICAgICBgIENvcm5lclJhZGl1cz1cIjBcImAgK1xyXG4gICAgICAgIGAgQm9yZGVyQ29sb3I9XCIke3RoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5ib3JkZXJzWzBdLmNvbG9yKX1cImAgK1xyXG4gICAgICAgICghIWFzdC5zdHlsZS5maWxsc1xyXG4gICAgICAgICAgPyBgIEJhY2tncm91bmRDb2xvcj1cIiR7dGhpcy5jb2xvclJhdGlvVG9IZXgoXHJcbiAgICAgICAgICAgICAgYXN0LnN0eWxlLmZpbGxzWzBdLmNvbG9yXHJcbiAgICAgICAgICAgICl9XCJgICsgYCBPcGFjaXR5PVwiJHthc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IuYWxwaGF9XCJgXHJcbiAgICAgICAgICA6IGAgQmFja2dyb3VuZENvbG9yPVwiVHJhbnNwYXJlbnRcImApICtcclxuICAgICAgICBgIEhhc1NoYWRvdz1cImZhbHNlXCIgLz5gXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKCEhYXN0LnN0eWxlLmZpbGxzKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgYDxCb3hWaWV3IGAgK1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3QpICtcclxuICAgICAgICBgIENvbG9yPVwiJHt0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IpfVwiYCArXHJcbiAgICAgICAgYCBPcGFjaXR5PVwiJHthc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IuYWxwaGF9XCIgLz5gXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdmlzaXRMaW5lKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBgPEJveFZpZXcgQWJzb2x1dGVMYXlvdXQuTGF5b3V0Qm91bmRzPVwiJHtNYXRoLnJvdW5kKFxyXG4gICAgICAgIGFzdC5mcmFtZS54XHJcbiAgICAgICl9LCAke01hdGgucm91bmQoYXN0LmZyYW1lLnkpfSwgJHtNYXRoLnJvdW5kKGFzdC5mcmFtZS53aWR0aCl9LCAxXCJgICtcclxuICAgICAgKCEhYXN0LnN0eWxlLmZpbGxzXHJcbiAgICAgICAgPyBgIENvbG9yPVwiJHt0aGlzLmNvbG9yUmF0aW9Ub0hleChhc3Quc3R5bGUuZmlsbHNbMF0uY29sb3IpfVwiYCArXHJcbiAgICAgICAgICBgIE9wYWNpdHk9XCIke2FzdC5zdHlsZS5maWxsc1swXS5jb2xvci5hbHBoYX1cIiAvPmBcclxuICAgICAgICA6IGAgQ29sb3I9XCIke3RoaXMuY29sb3JSYXRpb1RvSGV4KGFzdC5zdHlsZS5ib3JkZXJzWzBdLmNvbG9yKX1cImAgK1xyXG4gICAgICAgICAgYCBPcGFjaXR5PVwiJHthc3Quc3R5bGUuYm9yZGVyc1swXS5jb2xvci5hbHBoYX1cIiAvPmApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHZpc2l0U3ZnKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzdmdGaWxlTmFtZSA9IHRoaXMuc2FuaXRpemVTdmdGaWxlTmFtZShhc3QuZG9fb2JqZWN0SUQpO1xyXG4gICAgdGhpcy5maWxlTGlzdC5wdXNoKHtcclxuICAgICAgLi4udGhpcy5zdmdDb2RlR2VuLmFnZ3JlZ2F0ZShhc3QpWzBdLFxyXG4gICAgICB1cmk6IHN2Z0ZpbGVOYW1lLFxyXG4gICAgICBraW5kOiAneGFtYXJpbkZvcm1zJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgYDxmZlN2ZzpTdmdDYWNoZWRJbWFnZSBTb3VyY2U9XCJyZXNvdXJjZTovL3hMYXllcnMucGF0aC50by4ke3N2Z0ZpbGVOYW1lfVwiYCArXHJcbiAgICAgIGBcXG5gICtcclxuICAgICAgYCBgLnJlcGVhdCgyMikgK1xyXG4gICAgICB0aGlzLmdlbmVyYXRlQWJzb2x1dGVMYXlvdXQoYXN0KSArXHJcbiAgICAgIGAvPmBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb3Blbkdyb3VwKGFzdDogU2tldGNoTVNMYXllcik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBib3JkZXIgPSB0aGlzLmNoZWNrTGF5ZXJzRm9yQm9yZGVyKGFzdCk7XHJcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gdGhpcy5jaGVja0xheWVyc0ZvckJhY2tncm91bmQoYXN0KTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBgPEZyYW1lIGAgK1xyXG4gICAgICB0aGlzLmdlbmVyYXRlQWJzb2x1dGVMYXlvdXQoYXN0KSArXHJcbiAgICAgIGAgQ29ybmVyUmFkaXVzPVwiMFwiIFBhZGRpbmc9XCIwXCJgICtcclxuICAgICAgKGJvcmRlciAhPT0gZmFsc2UgPyAnIEJvcmRlckNvbG9yPVwiJyArIGJvcmRlciArICdcIicgOiAnJykgK1xyXG4gICAgICAnIEJhY2tncm91bmRDb2xvcj1cIicgK1xyXG4gICAgICAoYmFja2dyb3VuZCAhPT0gZmFsc2UgPyBiYWNrZ3JvdW5kIDogJ1RyYW5zcGFyZW50JykgK1xyXG4gICAgICAnXCInICtcclxuICAgICAgYCBIYXNTaGFkb3c9XCJmYWxzZVwiPmAgK1xyXG4gICAgICBgXFxuICA8QWJzb2x1dGVMYXlvdXQ+YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2FuaXRpemVTdmdGaWxlTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICdfJyArIG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOVxcX10vZywgJ18nKSArICcuc3ZnJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVBYnNvbHV0ZUxheW91dChhc3Q6IFNrZXRjaE1TTGF5ZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGBBYnNvbHV0ZUxheW91dC5MYXlvdXRCb3VuZHM9XCIke01hdGgucm91bmQoXHJcbiAgICAgIGFzdC5mcmFtZS54XHJcbiAgICApfSwgJHtNYXRoLnJvdW5kKGFzdC5mcmFtZS55KX0sICR7TWF0aC5yb3VuZChcclxuICAgICAgYXN0LmZyYW1lLndpZHRoXHJcbiAgICApfSwgJHtNYXRoLnJvdW5kKGFzdC5mcmFtZS5oZWlnaHQpfVwiYDtcclxuICB9XHJcblxyXG4gIGNvbnN1bWVGaWxlTGlzdCgpOiBhbnkge1xyXG4gICAgY29uc3QgdGVtcEZpbGVMaXN0ID0gdGhpcy5maWxlTGlzdDtcclxuICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcclxuICAgIHJldHVybiB0ZW1wRmlsZUxpc3Q7XHJcbiAgfVxyXG59XHJcbiJdfQ==