/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// class to recognise if sketchapp shape is a rectangle, a line, a circle(TODO) or something else
var Point = /** @class */ (function () {
    function Point(strOrX, y) {
        // a string containing the coords is input
        if (y === undefined) {
            /** @type {?} */
            var coords = this.stringToCoords(strOrX);
            if (coords) {
                this.x = this.decRound(coords.x);
                this.y = this.decRound(coords.y);
            }
            // the coords numbers are input
        }
        else {
            this.x = this.decRound((/** @type {?} */ (strOrX)));
            this.y = this.decRound(y);
        }
    }
    // 2 decimals rounding
    // 2 decimals rounding
    /**
     * @param {?} number
     * @return {?}
     */
    Point.prototype.decRound = 
    // 2 decimals rounding
    /**
     * @param {?} number
     * @return {?}
     */
    function (number) {
        return Math.round(number * 100 + 0.001) / 100;
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.distanceRounded = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return this.decRound(this.distance(point));
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.distance = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return Math.sqrt(this.distanceSquared(point));
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.distanceSquaredRounded = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return this.decRound(this.distanceSquared(point));
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Point.prototype.distanceSquared = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
    };
    /**
     * @param {?} string
     * @return {?}
     */
    Point.prototype.stringToCoords = /**
     * @param {?} string
     * @return {?}
     */
    function (string) {
        // match two numbers in a string of the form '{123, 456}'
        // and place them in two capturing groups named 'x' and 'y'
        // numbers may be negatives and may be int or float
        /** @type {?} */
        var regex = /{(?<x>\-?\d(?:\.\d+)?(?:e\-?\d+)?),\s?(?<y>\-?\d(?:\.\d+)?(?:e\-?\d+)?)}/;
        /** @type {?} */
        var match = string.match(regex);
        if (!!match) {
            // match.groups: {x: number, y: number}
            return match.groups;
        }
        return false;
    };
    return Point;
}());
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
var Cluster = /** @class */ (function () {
    function Cluster(point) {
        this.points = [];
        if (point !== undefined) {
            this.addPoint(point);
        }
    }
    /**
     * @return {?}
     */
    Cluster.prototype.updateBarycenter = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var avgX = 0;
        /** @type {?} */
        var avgY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            avgX += point.x;
            avgY += point.y;
        }));
        avgX /= this.points.length;
        avgY /= this.points.length;
        this.barycenter = new Point(avgX, avgY);
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Cluster.prototype.addPoint = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        this.points.push(point);
        this.updateBarycenter();
    };
    return Cluster;
}());
if (false) {
    /** @type {?} */
    Cluster.prototype.points;
    /** @type {?} */
    Cluster.prototype.barycenter;
}
var Shape = /** @class */ (function () {
    function Shape(points) {
        var _this = this;
        this.points = [];
        points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            _this.points.push(new Point(point.point));
            if (point.hasCurveFrom === true) {
                _this.points.push(new Point(point.curveFrom));
            }
            if (point.hasCurveTo === true) {
                _this.points.push(new Point(point.curveTo));
            }
        }));
    }
    // check if ABC is orthogonal on B
    // check if ABC is orthogonal on B
    /**
     * @param {?} A
     * @param {?} B
     * @param {?} C
     * @return {?}
     */
    Shape.isOrthogonal = 
    // check if ABC is orthogonal on B
    /**
     * @param {?} A
     * @param {?} B
     * @param {?} C
     * @return {?}
     */
    function (A, B, C) {
        return Math.abs(A.distanceSquared(B) + B.distanceSquared(C) - A.distanceSquared(C)) < Shape.shapeRecognitionPrecision;
    };
    // divide the points in 4 clusters
    // divide the points in 4 clusters
    /**
     * @return {?}
     */
    Shape.prototype.clusterPoints4 = 
    // divide the points in 4 clusters
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tempBarycenterX = 0;
        /** @type {?} */
        var tempBarycenterY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            tempBarycenterX += point.x;
            tempBarycenterY += point.y;
        }));
        /** @type {?} */
        var barycenter = new Point(tempBarycenterX / this.points.length, tempBarycenterY / this.points.length);
        /** @type {?} */
        var clusters = {};
        clusters.topLeft = new Cluster();
        clusters.topRight = new Cluster();
        clusters.bottomLeft = new Cluster();
        clusters.bottomRight = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            if (point.y < barycenter.y) {
                // TOP
                if (point.x < barycenter.x) {
                    // LEFT
                    clusters.topLeft.addPoint(point);
                }
                else {
                    // RIGHT
                    clusters.topRight.addPoint(point);
                }
                // BOTTOM
            }
            else {
                if (point.x < barycenter.x) {
                    // LEFT
                    clusters.bottomLeft.addPoint(point);
                }
                else {
                    // RIGHT
                    clusters.bottomRight.addPoint(point);
                }
            }
        }));
        return clusters;
    };
    /**
     * @return {?}
     */
    Shape.prototype.isRectangle = /**
     * @return {?}
     */
    function () {
        if (this.points.length < 4) {
            return false;
        }
        /** @type {?} */
        var clusters = this.clusterPoints4();
        for (var corner in clusters) {
            if (clusters[corner].points.length === 0) {
                return false;
            }
        }
        /** @type {?} */
        var topLength = clusters.topLeft.barycenter.distance(clusters.topRight.barycenter);
        /** @type {?} */
        var bottomLength = clusters.bottomLeft.barycenter.distance(clusters.bottomRight.barycenter);
        /** @type {?} */
        var leftLength = clusters.topLeft.barycenter.distance(clusters.bottomLeft.barycenter);
        /** @type {?} */
        var rightLength = clusters.topRight.barycenter.distance(clusters.bottomRight.barycenter);
        return Math.abs(topLength - bottomLength) < Shape.shapeRecognitionPrecision
            && Math.abs(leftLength - rightLength) < Shape.shapeRecognitionPrecision
            && Shape.isOrthogonal(clusters.bottomLeft.barycenter, clusters.topLeft.barycenter, clusters.topRight.barycenter);
    };
    /**
     * @return {?}
     */
    Shape.prototype.isLine = /**
     * @return {?}
     */
    function () {
        return this.points.length === 2
            && Math.abs(this.points[0].y - this.points[1].y) < Shape.shapeRecognitionPrecision;
    };
    /**
     * @return {?}
     */
    Shape.prototype.isRound = /**
     * @return {?}
     */
    function () {
        if (this.isRectangle() || this.isLine()) {
            return false;
        }
        /** @type {?} */
        var circle = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            circle.addPoint(point);
        }));
        // if the points are not equally sprayed around the circle,
        // the barycenter may be different from the actual center of the circle
        /** @type {?} */
        var center = new Point(0.5, 0.5);
        /** @type {?} */
        var radius2 = circle.points[0].distanceSquaredRounded(circle.barycenter);
        /** @type {?} */
        var radiusCenter2 = circle.points[0].distanceSquaredRounded(center);
        /** @type {?} */
        var isCircle = true;
        /** @type {?} */
        var isCircleCentered = true;
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            if (Math.abs(point.distanceSquaredRounded(circle.barycenter) - radius2) > Shape.shapeRecognitionPrecision * 2) {
                isCircle = false;
                return true;
            }
        }));
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        function (point) {
            if (Math.abs(point.distanceSquaredRounded(center) - radiusCenter2) > Shape.shapeRecognitionPrecision * 2) {
                isCircleCentered = false;
                return true;
            }
        }));
        return isCircle || isCircleCentered;
    };
    Shape.shapeRecognitionPrecision = 0.05;
    return Shape;
}());
export { Shape };
if (false) {
    /** @type {?} */
    Shape.shapeRecognitionPrecision;
    /** @type {?} */
    Shape.prototype.points;
    /** @type {?} */
    Shape.prototype.topLeft;
    /** @type {?} */
    Shape.prototype.topRight;
    /** @type {?} */
    Shape.prototype.bottomLeft;
    /** @type {?} */
    Shape.prototype.bottomRight;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3hhbWwtY29kZWdlbi8iLCJzb3VyY2VzIjpbImxpYi9zaGFwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7SUFNSSxlQUFZLE1BQU0sRUFBRSxDQUFFO1FBQ2xCLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7O2dCQUNYLE1BQU0sR0FBUSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMvQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsK0JBQStCO1NBQ2xDO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQUEsTUFBTSxFQUFVLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBRUQsc0JBQXNCOzs7Ozs7SUFDdEIsd0JBQVE7Ozs7OztJQUFSLFVBQVMsTUFBYztRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFFRCwrQkFBZTs7OztJQUFmLFVBQWdCLEtBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUNELHdCQUFROzs7O0lBQVIsVUFBUyxLQUFZO1FBQ2pCLE9B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SXJELFlBQUM7Q0FBQSxBQW5JRCxJQW1JQztTQW5JWSxLQUFLOzs7SUFDZCxnQ0FBaUQ7O0lBQ2pELHVCQUFnQjs7SUFDaEIsd0JBQWU7O0lBQ2YseUJBQWdCOztJQUNoQiwyQkFBa0I7O0lBQ2xCLDRCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNsYXNzIHRvIHJlY29nbmlzZSBpZiBza2V0Y2hhcHAgc2hhcGUgaXMgYSByZWN0YW5nbGUsIGEgbGluZSwgYSBjaXJjbGUoVE9ETykgb3Igc29tZXRoaW5nIGVsc2VcclxuXHJcbmNsYXNzIFBvaW50IHtcclxuICAgIHg6IG51bWJlcjtcclxuICAgIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdHI6IHN0cmluZyk7XHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcik7XHJcbiAgICBjb25zdHJ1Y3RvcihzdHJPclgsIHk/KSB7XHJcbiAgICAgICAgLy8gYSBzdHJpbmcgY29udGFpbmluZyB0aGUgY29vcmRzIGlzIGlucHV0XHJcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb29yZHM6IGFueSA9IHRoaXMuc3RyaW5nVG9Db29yZHMoc3RyT3JYKTtcclxuICAgICAgICAgICAgaWYgKGNvb3Jkcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5kZWNSb3VuZChjb29yZHMueCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmRlY1JvdW5kKGNvb3Jkcy55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGUgY29vcmRzIG51bWJlcnMgYXJlIGlucHV0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5kZWNSb3VuZChzdHJPclggYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5kZWNSb3VuZCh5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMiBkZWNpbWFscyByb3VuZGluZ1xyXG4gICAgZGVjUm91bmQobnVtYmVyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bWJlciAqIDEwMCArIDAuMDAxKSAvIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICBkaXN0YW5jZVJvdW5kZWQocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWNSb3VuZCh0aGlzLmRpc3RhbmNlKHBvaW50KSk7XHJcbiAgICB9XHJcbiAgICBkaXN0YW5jZShwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxdWFyZWQocG9pbnQpKTtcclxuICAgIH1cclxuICAgIGRpc3RhbmNlU3F1YXJlZFJvdW5kZWQocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZWNSb3VuZCh0aGlzLmRpc3RhbmNlU3F1YXJlZChwb2ludCkpO1xyXG4gICAgfVxyXG4gICAgZGlzdGFuY2VTcXVhcmVkKHBvaW50OiBQb2ludCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KHRoaXMueCAtIHBvaW50LngsIDIpICsgTWF0aC5wb3codGhpcy55IC0gcG9pbnQueSwgMik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyaW5nVG9Db29yZHMoc3RyaW5nOiBzdHJpbmcpOiBSZWdFeHBNYXRjaEFycmF5Wydncm91cHMnXSB8IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIG1hdGNoIHR3byBudW1iZXJzIGluIGEgc3RyaW5nIG9mIHRoZSBmb3JtICd7MTIzLCA0NTZ9J1xyXG4gICAgICAgIC8vIGFuZCBwbGFjZSB0aGVtIGluIHR3byBjYXB0dXJpbmcgZ3JvdXBzIG5hbWVkICd4JyBhbmQgJ3knXHJcbiAgICAgICAgLy8gbnVtYmVycyBtYXkgYmUgbmVnYXRpdmVzIGFuZCBtYXkgYmUgaW50IG9yIGZsb2F0XHJcbiAgICAgICAgY29uc3QgcmVnZXggPSAveyg/PHg+XFwtP1xcZCg/OlxcLlxcZCspPyg/OmVcXC0/XFxkKyk/KSxcXHM/KD88eT5cXC0/XFxkKD86XFwuXFxkKyk/KD86ZVxcLT9cXGQrKT8pfS87XHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBzdHJpbmcubWF0Y2gocmVnZXgpO1xyXG4gICAgICAgIGlmICghIW1hdGNoKSB7XHJcbiAgICAgICAgICAgIC8vIG1hdGNoLmdyb3Vwczoge3g6IG51bWJlciwgeTogbnVtYmVyfVxyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2guZ3JvdXBzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENsdXN0ZXIge1xyXG4gICAgcG9pbnRzOiBQb2ludFtdID0gW107XHJcbiAgICBiYXJ5Y2VudGVyOiBQb2ludDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb2ludD86IFBvaW50KSB7XHJcbiAgICAgICAgaWYgKHBvaW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJhcnljZW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGF2Z1ggPSAwO1xyXG4gICAgICAgIGxldCBhdmdZID0gMDtcclxuICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgYXZnWCArPSBwb2ludC54O1xyXG4gICAgICAgICAgICBhdmdZICs9IHBvaW50Lnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXZnWCAvPSB0aGlzLnBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgYXZnWSAvPSB0aGlzLnBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5iYXJ5Y2VudGVyID0gbmV3IFBvaW50KGF2Z1gsIGF2Z1kpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFBvaW50KHBvaW50OiBQb2ludCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQmFyeWNlbnRlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2hhcGUge1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IHNoYXBlUmVjb2duaXRpb25QcmVjaXNpb24gPSAwLjA1O1xyXG4gICAgcG9pbnRzOiBQb2ludFtdO1xyXG4gICAgdG9wTGVmdDogUG9pbnQ7XHJcbiAgICB0b3BSaWdodDogUG9pbnQ7XHJcbiAgICBib3R0b21MZWZ0OiBQb2ludDtcclxuICAgIGJvdHRvbVJpZ2h0OiBQb2ludDtcclxuXHJcbiAgICAvLyBjaGVjayBpZiBBQkMgaXMgb3J0aG9nb25hbCBvbiBCXHJcbiAgICBzdGF0aWMgaXNPcnRob2dvbmFsKEE6IFBvaW50LCBCOiBQb2ludCwgQzogUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoQS5kaXN0YW5jZVNxdWFyZWQoQikgKyBCLmRpc3RhbmNlU3F1YXJlZChDKSAtIEEuZGlzdGFuY2VTcXVhcmVkKEMpKSA8IFNoYXBlLnNoYXBlUmVjb2duaXRpb25QcmVjaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocG9pbnRzOiBTa2V0Y2hNU0N1cnZlUG9pbnRbXSkge1xyXG4gICAgICAgIHRoaXMucG9pbnRzID0gW107XHJcblxyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaChuZXcgUG9pbnQocG9pbnQucG9pbnQpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwb2ludC5oYXNDdXJ2ZUZyb20gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gobmV3IFBvaW50KHBvaW50LmN1cnZlRnJvbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb2ludC5oYXNDdXJ2ZVRvID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKG5ldyBQb2ludChwb2ludC5jdXJ2ZVRvKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkaXZpZGUgdGhlIHBvaW50cyBpbiA0IGNsdXN0ZXJzXHJcbiAgICBjbHVzdGVyUG9pbnRzNCgpOiBhbnkge1xyXG4gICAgICAgIGxldCB0ZW1wQmFyeWNlbnRlclggPSAwLFxyXG4gICAgICAgICAgICB0ZW1wQmFyeWNlbnRlclkgPSAwO1xyXG4gICAgICAgIHRoaXMucG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICB0ZW1wQmFyeWNlbnRlclggKz0gcG9pbnQueDtcclxuICAgICAgICAgICAgdGVtcEJhcnljZW50ZXJZICs9IHBvaW50Lnk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYmFyeWNlbnRlciA9IG5ldyBQb2ludCh0ZW1wQmFyeWNlbnRlclggLyB0aGlzLnBvaW50cy5sZW5ndGgsIHRlbXBCYXJ5Y2VudGVyWSAvIHRoaXMucG9pbnRzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJzOiBhbnkgPSB7fTtcclxuICAgICAgICBjbHVzdGVycy50b3BMZWZ0ID0gbmV3IENsdXN0ZXIoKTtcclxuICAgICAgICBjbHVzdGVycy50b3BSaWdodCA9IG5ldyBDbHVzdGVyKCk7XHJcbiAgICAgICAgY2x1c3RlcnMuYm90dG9tTGVmdCA9IG5ldyBDbHVzdGVyKCk7XHJcbiAgICAgICAgY2x1c3RlcnMuYm90dG9tUmlnaHQgPSBuZXcgQ2x1c3RlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKHBvaW50LnkgPCBiYXJ5Y2VudGVyLnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPUFxyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50LnggPCBiYXJ5Y2VudGVyLngpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBMRUZUXHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlcnMudG9wTGVmdC5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJJR0hUXHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlcnMudG9wUmlnaHQuYWRkUG9pbnQocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQk9UVE9NXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQueCA8IGJhcnljZW50ZXIueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExFRlRcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVycy5ib3R0b21MZWZ0LmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUklHSFRcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVycy5ib3R0b21SaWdodC5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNsdXN0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUmVjdGFuZ2xlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnBvaW50cy5sZW5ndGggPCA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJzOiBhbnkgPSB0aGlzLmNsdXN0ZXJQb2ludHM0KCk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgY29ybmVyIGluIGNsdXN0ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChjbHVzdGVyc1tjb3JuZXJdLnBvaW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG9wTGVuZ3RoID0gY2x1c3RlcnMudG9wTGVmdC5iYXJ5Y2VudGVyLmRpc3RhbmNlKGNsdXN0ZXJzLnRvcFJpZ2h0LmJhcnljZW50ZXIpO1xyXG4gICAgICAgIGNvbnN0IGJvdHRvbUxlbmd0aCA9IGNsdXN0ZXJzLmJvdHRvbUxlZnQuYmFyeWNlbnRlci5kaXN0YW5jZShjbHVzdGVycy5ib3R0b21SaWdodC5iYXJ5Y2VudGVyKTtcclxuICAgICAgICBjb25zdCBsZWZ0TGVuZ3RoID0gY2x1c3RlcnMudG9wTGVmdC5iYXJ5Y2VudGVyLmRpc3RhbmNlKGNsdXN0ZXJzLmJvdHRvbUxlZnQuYmFyeWNlbnRlcik7XHJcbiAgICAgICAgY29uc3QgcmlnaHRMZW5ndGggPSBjbHVzdGVycy50b3BSaWdodC5iYXJ5Y2VudGVyLmRpc3RhbmNlKGNsdXN0ZXJzLmJvdHRvbVJpZ2h0LmJhcnljZW50ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5hYnModG9wTGVuZ3RoIC0gYm90dG9tTGVuZ3RoKSA8IFNoYXBlLnNoYXBlUmVjb2duaXRpb25QcmVjaXNpb25cclxuICAgICAgICAgICAgJiYgTWF0aC5hYnMobGVmdExlbmd0aCAtIHJpZ2h0TGVuZ3RoKSA8IFNoYXBlLnNoYXBlUmVjb2duaXRpb25QcmVjaXNpb25cclxuICAgICAgICAgICAgJiYgU2hhcGUuaXNPcnRob2dvbmFsKGNsdXN0ZXJzLmJvdHRvbUxlZnQuYmFyeWNlbnRlciwgY2x1c3RlcnMudG9wTGVmdC5iYXJ5Y2VudGVyLCBjbHVzdGVycy50b3BSaWdodC5iYXJ5Y2VudGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0xpbmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLmxlbmd0aCA9PT0gMlxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyh0aGlzLnBvaW50c1swXS55IC0gdGhpcy5wb2ludHNbMV0ueSkgPCBTaGFwZS5zaGFwZVJlY29nbml0aW9uUHJlY2lzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUm91bmQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZWN0YW5nbGUoKSB8fCB0aGlzLmlzTGluZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDbHVzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGNpcmNsZS5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBwb2ludHMgYXJlIG5vdCBlcXVhbGx5IHNwcmF5ZWQgYXJvdW5kIHRoZSBjaXJjbGUsXHJcbiAgICAgICAgLy8gdGhlIGJhcnljZW50ZXIgbWF5IGJlIGRpZmZlcmVudCBmcm9tIHRoZSBhY3R1YWwgY2VudGVyIG9mIHRoZSBjaXJjbGVcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSBuZXcgUG9pbnQoMC41LCAwLjUpO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1czIgPSBjaXJjbGUucG9pbnRzWzBdLmRpc3RhbmNlU3F1YXJlZFJvdW5kZWQoY2lyY2xlLmJhcnljZW50ZXIpO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1c0NlbnRlcjIgPSBjaXJjbGUucG9pbnRzWzBdLmRpc3RhbmNlU3F1YXJlZFJvdW5kZWQoY2VudGVyKTtcclxuXHJcbiAgICAgICAgbGV0IGlzQ2lyY2xlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaXNDaXJjbGVDZW50ZXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGNpcmNsZS5wb2ludHMuc29tZShwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhwb2ludC5kaXN0YW5jZVNxdWFyZWRSb3VuZGVkKGNpcmNsZS5iYXJ5Y2VudGVyKSAtIHJhZGl1czIpID4gU2hhcGUuc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvbiAqIDIpIHtcclxuICAgICAgICAgICAgICAgIGlzQ2lyY2xlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNpcmNsZS5wb2ludHMuc29tZShwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhwb2ludC5kaXN0YW5jZVNxdWFyZWRSb3VuZGVkKGNlbnRlcikgLSByYWRpdXNDZW50ZXIyKSA+IFNoYXBlLnNoYXBlUmVjb2duaXRpb25QcmVjaXNpb24gKiAyKSB7XHJcbiAgICAgICAgICAgICAgICBpc0NpcmNsZUNlbnRlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNDaXJjbGUgfHwgaXNDaXJjbGVDZW50ZXJlZDtcclxuICAgIH1cclxufVxyXG4iXX0=