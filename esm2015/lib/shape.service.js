/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// class to recognise if sketchapp shape is a rectangle, a line, a circle(TODO) or something else
class Point {
    /**
     * @param {?} strOrX
     * @param {?=} y
     */
    constructor(strOrX, y) {
        // a string containing the coords is input
        if (y === undefined) {
            /** @type {?} */
            const coords = this.stringToCoords(strOrX);
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
    /**
     * @param {?} number
     * @return {?}
     */
    decRound(number) {
        return Math.round(number * 100 + 0.001) / 100;
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceRounded(point) {
        return this.decRound(this.distance(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distance(point) {
        return Math.sqrt(this.distanceSquared(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceSquaredRounded(point) {
        return this.decRound(this.distanceSquared(point));
    }
    /**
     * @param {?} point
     * @return {?}
     */
    distanceSquared(point) {
        return Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2);
    }
    /**
     * @param {?} string
     * @return {?}
     */
    stringToCoords(string) {
        // match two numbers in a string of the form '{123, 456}'
        // and place them in two capturing groups named 'x' and 'y'
        // numbers may be negatives and may be int or float
        /** @type {?} */
        const regex = /{(?<x>\-?\d(?:\.\d+)?(?:e\-?\d+)?),\s?(?<y>\-?\d(?:\.\d+)?(?:e\-?\d+)?)}/;
        /** @type {?} */
        const match = string.match(regex);
        if (!!match) {
            // match.groups: {x: number, y: number}
            return match.groups;
        }
        return false;
    }
}
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
class Cluster {
    /**
     * @param {?=} point
     */
    constructor(point) {
        this.points = [];
        if (point !== undefined) {
            this.addPoint(point);
        }
    }
    /**
     * @return {?}
     */
    updateBarycenter() {
        /** @type {?} */
        let avgX = 0;
        /** @type {?} */
        let avgY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            avgX += point.x;
            avgY += point.y;
        }));
        avgX /= this.points.length;
        avgY /= this.points.length;
        this.barycenter = new Point(avgX, avgY);
    }
    /**
     * @param {?} point
     * @return {?}
     */
    addPoint(point) {
        this.points.push(point);
        this.updateBarycenter();
    }
}
if (false) {
    /** @type {?} */
    Cluster.prototype.points;
    /** @type {?} */
    Cluster.prototype.barycenter;
}
export class Shape {
    /**
     * @param {?} points
     */
    constructor(points) {
        this.points = [];
        points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            this.points.push(new Point(point.point));
            if (point.hasCurveFrom === true) {
                this.points.push(new Point(point.curveFrom));
            }
            if (point.hasCurveTo === true) {
                this.points.push(new Point(point.curveTo));
            }
        }));
    }
    // check if ABC is orthogonal on B
    /**
     * @param {?} A
     * @param {?} B
     * @param {?} C
     * @return {?}
     */
    static isOrthogonal(A, B, C) {
        return Math.abs(A.distanceSquared(B) + B.distanceSquared(C) - A.distanceSquared(C)) < Shape.shapeRecognitionPrecision;
    }
    // divide the points in 4 clusters
    /**
     * @return {?}
     */
    clusterPoints4() {
        /** @type {?} */
        let tempBarycenterX = 0;
        /** @type {?} */
        let tempBarycenterY = 0;
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            tempBarycenterX += point.x;
            tempBarycenterY += point.y;
        }));
        /** @type {?} */
        const barycenter = new Point(tempBarycenterX / this.points.length, tempBarycenterY / this.points.length);
        /** @type {?} */
        const clusters = {};
        clusters.topLeft = new Cluster();
        clusters.topRight = new Cluster();
        clusters.bottomLeft = new Cluster();
        clusters.bottomRight = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
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
    }
    /**
     * @return {?}
     */
    isRectangle() {
        if (this.points.length < 4) {
            return false;
        }
        /** @type {?} */
        const clusters = this.clusterPoints4();
        for (const corner in clusters) {
            if (clusters[corner].points.length === 0) {
                return false;
            }
        }
        /** @type {?} */
        const topLength = clusters.topLeft.barycenter.distance(clusters.topRight.barycenter);
        /** @type {?} */
        const bottomLength = clusters.bottomLeft.barycenter.distance(clusters.bottomRight.barycenter);
        /** @type {?} */
        const leftLength = clusters.topLeft.barycenter.distance(clusters.bottomLeft.barycenter);
        /** @type {?} */
        const rightLength = clusters.topRight.barycenter.distance(clusters.bottomRight.barycenter);
        return Math.abs(topLength - bottomLength) < Shape.shapeRecognitionPrecision
            && Math.abs(leftLength - rightLength) < Shape.shapeRecognitionPrecision
            && Shape.isOrthogonal(clusters.bottomLeft.barycenter, clusters.topLeft.barycenter, clusters.topRight.barycenter);
    }
    /**
     * @return {?}
     */
    isLine() {
        return this.points.length === 2
            && Math.abs(this.points[0].y - this.points[1].y) < Shape.shapeRecognitionPrecision;
    }
    /**
     * @return {?}
     */
    isRound() {
        if (this.isRectangle() || this.isLine()) {
            return false;
        }
        /** @type {?} */
        const circle = new Cluster();
        this.points.forEach((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            circle.addPoint(point);
        }));
        // if the points are not equally sprayed around the circle,
        // the barycenter may be different from the actual center of the circle
        /** @type {?} */
        const center = new Point(0.5, 0.5);
        /** @type {?} */
        const radius2 = circle.points[0].distanceSquaredRounded(circle.barycenter);
        /** @type {?} */
        const radiusCenter2 = circle.points[0].distanceSquaredRounded(center);
        /** @type {?} */
        let isCircle = true;
        /** @type {?} */
        let isCircleCentered = true;
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            if (Math.abs(point.distanceSquaredRounded(circle.barycenter) - radius2) > Shape.shapeRecognitionPrecision * 2) {
                isCircle = false;
                return true;
            }
        }));
        circle.points.some((/**
         * @param {?} point
         * @return {?}
         */
        point => {
            if (Math.abs(point.distanceSquaredRounded(center) - radiusCenter2) > Shape.shapeRecognitionPrecision * 2) {
                isCircleCentered = false;
                return true;
            }
        }));
        return isCircle || isCircleCentered;
    }
}
Shape.shapeRecognitionPrecision = 0.05;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL3hhbWwtY29kZWdlbi8iLCJzb3VyY2VzIjpbImxpYi9zaGFwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxLQUFLOzs7OztJQU1QLFlBQVksTUFBTSxFQUFFLENBQUU7UUFDbEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTs7a0JBQ1gsTUFBTSxHQUFRLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQy9DLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCwrQkFBK0I7U0FDbEM7YUFBTTtZQUNILElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBQSxNQUFNLEVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7Ozs7OztJQUdELFFBQVEsQ0FBQyxNQUFjO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNsRCxDQUFDOzs7OztJQUVELGVBQWUsQ0FBQyxLQUFZO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFDRCxRQUFRLENBQUMsS0FBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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ZSBpcyBhIHJlY3RhbmdsZSwgYSBsaW5lLCBhIGNpcmNsZShUT0RPKSBvciBzb21ldGhpbmcgZWxzZVxyXG5cclxuY2xhc3MgUG9pbnQge1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgeTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0cjogc3RyaW5nKTtcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTtcclxuICAgIGNvbnN0cnVjdG9yKHN0ck9yWCwgeT8pIHtcclxuICAgICAgICAvLyBhIHN0cmluZyBjb250YWluaW5nIHRoZSBjb29yZHMgaXMgaW5wdXRcclxuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkczogYW55ID0gdGhpcy5zdHJpbmdUb0Nvb3JkcyhzdHJPclgpO1xyXG4gICAgICAgICAgICBpZiAoY29vcmRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmRlY1JvdW5kKGNvb3Jkcy54KTtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZGVjUm91bmQoY29vcmRzLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoZSBjb29yZHMgbnVtYmVycyBhcmUgaW5wdXRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLmRlY1JvdW5kKHN0ck9yWCBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmRlY1JvdW5kKHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAyIGRlY2ltYWxzIHJvdW5kaW5nXHJcbiAgICBkZWNSb3VuZChudW1iZXI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyICogMTAwICsgMC4wMDEpIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3RhbmNlUm91bmRlZChwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlY1JvdW5kKHRoaXMuZGlzdGFuY2UocG9pbnQpKTtcclxuICAgIH1cclxuICAgIGRpc3RhbmNlKHBvaW50OiBQb2ludCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZChwb2ludCkpO1xyXG4gICAgfVxyXG4gICAgZGlzdGFuY2VTcXVhcmVkUm91bmRlZChwb2ludDogUG9pbnQpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRlY1JvdW5kKHRoaXMuZGlzdGFuY2VTcXVhcmVkKHBvaW50KSk7XHJcbiAgICB9XHJcbiAgICBkaXN0YW5jZVNxdWFyZWQocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3codGhpcy54IC0gcG9pbnQueCwgMikgKyBNYXRoLnBvdyh0aGlzLnkgLSBwb2ludC55LCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdHJpbmdUb0Nvb3JkcyhzdHJpbmc6IHN0cmluZyk6IFJlZ0V4cE1hdGNoQXJyYXlbJ2dyb3VwcyddIHwgYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gbWF0Y2ggdHdvIG51bWJlcnMgaW4gYSBzdHJpbmcgb2YgdGhlIGZvcm0gJ3sxMjMsIDQ1Nn0nXHJcbiAgICAgICAgLy8gYW5kIHBsYWNlIHRoZW0gaW4gdHdvIGNhcHR1cmluZyBncm91cHMgbmFtZWQgJ3gnIGFuZCAneSdcclxuICAgICAgICAvLyBudW1iZXJzIG1heSBiZSBuZWdhdGl2ZXMgYW5kIG1heSBiZSBpbnQgb3IgZmxvYXRcclxuICAgICAgICBjb25zdCByZWdleCA9IC97KD88eD5cXC0/XFxkKD86XFwuXFxkKyk/KD86ZVxcLT9cXGQrKT8pLFxccz8oPzx5PlxcLT9cXGQoPzpcXC5cXGQrKT8oPzplXFwtP1xcZCspPyl9LztcclxuICAgICAgICBjb25zdCBtYXRjaCA9IHN0cmluZy5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgaWYgKCEhbWF0Y2gpIHtcclxuICAgICAgICAgICAgLy8gbWF0Y2guZ3JvdXBzOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC5ncm91cHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2x1c3RlciB7XHJcbiAgICBwb2ludHM6IFBvaW50W10gPSBbXTtcclxuICAgIGJhcnljZW50ZXI6IFBvaW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvaW50PzogUG9pbnQpIHtcclxuICAgICAgICBpZiAocG9pbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQmFyeWNlbnRlcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYXZnWCA9IDA7XHJcbiAgICAgICAgbGV0IGF2Z1kgPSAwO1xyXG4gICAgICAgIHRoaXMucG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBhdmdYICs9IHBvaW50Lng7XHJcbiAgICAgICAgICAgIGF2Z1kgKz0gcG9pbnQueTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdmdYIC89IHRoaXMucG9pbnRzLmxlbmd0aDtcclxuICAgICAgICBhdmdZIC89IHRoaXMucG9pbnRzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmJhcnljZW50ZXIgPSBuZXcgUG9pbnQoYXZnWCwgYXZnWSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUG9pbnQocG9pbnQ6IFBvaW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb2ludHMucHVzaChwb2ludCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCYXJ5Y2VudGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFwZSB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvbiA9IDAuMDU7XHJcbiAgICBwb2ludHM6IFBvaW50W107XHJcbiAgICB0b3BMZWZ0OiBQb2ludDtcclxuICAgIHRvcFJpZ2h0OiBQb2ludDtcclxuICAgIGJvdHRvbUxlZnQ6IFBvaW50O1xyXG4gICAgYm90dG9tUmlnaHQ6IFBvaW50O1xyXG5cclxuICAgIC8vIGNoZWNrIGlmIEFCQyBpcyBvcnRob2dvbmFsIG9uIEJcclxuICAgIHN0YXRpYyBpc09ydGhvZ29uYWwoQTogUG9pbnQsIEI6IFBvaW50LCBDOiBQb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhBLmRpc3RhbmNlU3F1YXJlZChCKSArIEIuZGlzdGFuY2VTcXVhcmVkKEMpIC0gQS5kaXN0YW5jZVNxdWFyZWQoQykpIDwgU2hhcGUuc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHM6IFNrZXRjaE1TQ3VydmVQb2ludFtdKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKG5ldyBQb2ludChwb2ludC5wb2ludCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBvaW50Lmhhc0N1cnZlRnJvbSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaChuZXcgUG9pbnQocG9pbnQuY3VydmVGcm9tKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvaW50Lmhhc0N1cnZlVG8gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gobmV3IFBvaW50KHBvaW50LmN1cnZlVG8pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRpdmlkZSB0aGUgcG9pbnRzIGluIDQgY2x1c3RlcnNcclxuICAgIGNsdXN0ZXJQb2ludHM0KCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRlbXBCYXJ5Y2VudGVyWCA9IDAsXHJcbiAgICAgICAgICAgIHRlbXBCYXJ5Y2VudGVyWSA9IDA7XHJcbiAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgIHRlbXBCYXJ5Y2VudGVyWCArPSBwb2ludC54O1xyXG4gICAgICAgICAgICB0ZW1wQmFyeWNlbnRlclkgKz0gcG9pbnQueTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBiYXJ5Y2VudGVyID0gbmV3IFBvaW50KHRlbXBCYXJ5Y2VudGVyWCAvIHRoaXMucG9pbnRzLmxlbmd0aCwgdGVtcEJhcnljZW50ZXJZIC8gdGhpcy5wb2ludHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2x1c3RlcnM6IGFueSA9IHt9O1xyXG4gICAgICAgIGNsdXN0ZXJzLnRvcExlZnQgPSBuZXcgQ2x1c3RlcigpO1xyXG4gICAgICAgIGNsdXN0ZXJzLnRvcFJpZ2h0ID0gbmV3IENsdXN0ZXIoKTtcclxuICAgICAgICBjbHVzdGVycy5ib3R0b21MZWZ0ID0gbmV3IENsdXN0ZXIoKTtcclxuICAgICAgICBjbHVzdGVycy5ib3R0b21SaWdodCA9IG5ldyBDbHVzdGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9pbnRzLmZvckVhY2gocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAocG9pbnQueSA8IGJhcnljZW50ZXIueSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVE9QXHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQueCA8IGJhcnljZW50ZXIueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExFRlRcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVycy50b3BMZWZ0LmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUklHSFRcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVycy50b3BSaWdodC5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBCT1RUT01cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludC54IDwgYmFyeWNlbnRlci54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTEVGVFxyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJzLmJvdHRvbUxlZnQuYWRkUG9pbnQocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSSUdIVFxyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJzLmJvdHRvbVJpZ2h0LmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY2x1c3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNSZWN0YW5nbGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCA8IDQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2x1c3RlcnM6IGFueSA9IHRoaXMuY2x1c3RlclBvaW50czQoKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBjb3JuZXIgaW4gY2x1c3RlcnMpIHtcclxuICAgICAgICAgICAgaWYgKGNsdXN0ZXJzW2Nvcm5lcl0ucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b3BMZW5ndGggPSBjbHVzdGVycy50b3BMZWZ0LmJhcnljZW50ZXIuZGlzdGFuY2UoY2x1c3RlcnMudG9wUmlnaHQuYmFyeWNlbnRlcik7XHJcbiAgICAgICAgY29uc3QgYm90dG9tTGVuZ3RoID0gY2x1c3RlcnMuYm90dG9tTGVmdC5iYXJ5Y2VudGVyLmRpc3RhbmNlKGNsdXN0ZXJzLmJvdHRvbVJpZ2h0LmJhcnljZW50ZXIpO1xyXG4gICAgICAgIGNvbnN0IGxlZnRMZW5ndGggPSBjbHVzdGVycy50b3BMZWZ0LmJhcnljZW50ZXIuZGlzdGFuY2UoY2x1c3RlcnMuYm90dG9tTGVmdC5iYXJ5Y2VudGVyKTtcclxuICAgICAgICBjb25zdCByaWdodExlbmd0aCA9IGNsdXN0ZXJzLnRvcFJpZ2h0LmJhcnljZW50ZXIuZGlzdGFuY2UoY2x1c3RlcnMuYm90dG9tUmlnaHQuYmFyeWNlbnRlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyh0b3BMZW5ndGggLSBib3R0b21MZW5ndGgpIDwgU2hhcGUuc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvblxyXG4gICAgICAgICAgICAmJiBNYXRoLmFicyhsZWZ0TGVuZ3RoIC0gcmlnaHRMZW5ndGgpIDwgU2hhcGUuc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvblxyXG4gICAgICAgICAgICAmJiBTaGFwZS5pc09ydGhvZ29uYWwoY2x1c3RlcnMuYm90dG9tTGVmdC5iYXJ5Y2VudGVyLCBjbHVzdGVycy50b3BMZWZ0LmJhcnljZW50ZXIsIGNsdXN0ZXJzLnRvcFJpZ2h0LmJhcnljZW50ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTGluZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMubGVuZ3RoID09PSAyXHJcbiAgICAgICAgICAgICYmIE1hdGguYWJzKHRoaXMucG9pbnRzWzBdLnkgLSB0aGlzLnBvaW50c1sxXS55KSA8IFNoYXBlLnNoYXBlUmVjb2duaXRpb25QcmVjaXNpb247XHJcbiAgICB9XHJcblxyXG4gICAgaXNSb3VuZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlY3RhbmdsZSgpIHx8IHRoaXMuaXNMaW5lKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENsdXN0ZXIoKTtcclxuICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgY2lyY2xlLmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHBvaW50cyBhcmUgbm90IGVxdWFsbHkgc3ByYXllZCBhcm91bmQgdGhlIGNpcmNsZSxcclxuICAgICAgICAvLyB0aGUgYmFyeWNlbnRlciBtYXkgYmUgZGlmZmVyZW50IGZyb20gdGhlIGFjdHVhbCBjZW50ZXIgb2YgdGhlIGNpcmNsZVxyXG4gICAgICAgIGNvbnN0IGNlbnRlciA9IG5ldyBQb2ludCgwLjUsIDAuNSk7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzMiA9IGNpcmNsZS5wb2ludHNbMF0uZGlzdGFuY2VTcXVhcmVkUm91bmRlZChjaXJjbGUuYmFyeWNlbnRlcik7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzQ2VudGVyMiA9IGNpcmNsZS5wb2ludHNbMF0uZGlzdGFuY2VTcXVhcmVkUm91bmRlZChjZW50ZXIpO1xyXG5cclxuICAgICAgICBsZXQgaXNDaXJjbGUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBpc0NpcmNsZUNlbnRlcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY2lyY2xlLnBvaW50cy5zb21lKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHBvaW50LmRpc3RhbmNlU3F1YXJlZFJvdW5kZWQoY2lyY2xlLmJhcnljZW50ZXIpIC0gcmFkaXVzMikgPiBTaGFwZS5zaGFwZVJlY29nbml0aW9uUHJlY2lzaW9uICogMikge1xyXG4gICAgICAgICAgICAgICAgaXNDaXJjbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2lyY2xlLnBvaW50cy5zb21lKHBvaW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHBvaW50LmRpc3RhbmNlU3F1YXJlZFJvdW5kZWQoY2VudGVyKSAtIHJhZGl1c0NlbnRlcjIpID4gU2hhcGUuc2hhcGVSZWNvZ25pdGlvblByZWNpc2lvbiAqIDIpIHtcclxuICAgICAgICAgICAgICAgIGlzQ2lyY2xlQ2VudGVyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0NpcmNsZSB8fCBpc0NpcmNsZUNlbnRlcmVkO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==