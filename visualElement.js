
class VisualElement {
    constructor(popularity, revenue) {
        this.popularity = popularity;
        this.revenue = revenue;
    }

    getTextSize() {
        return Math.max(10, this.popularity / 5);
    }

    getColor() {
        const revenueMax = 500000000;
        const normalizedRevenue = constrain(this.revenue / revenueMax, 0, 1);
        const colorStops = [
            { offset: 0, color: [255, 0, 0] },       // Red
            { offset: 0.14, color: [255, 165, 0] },  // Orange
            { offset: 0.28, color: [255, 255, 0] },  // Yellow
            { offset: 0.42, color: [0, 255, 0] },    // Green
            { offset: 0.57, color: [0, 0, 255] },    // Blue
            { offset: 0.71, color: [75, 0, 130] },   // Indigo
            { offset: 0.85, color: [238, 130, 238] },// Violet
            { offset: 1, color: [255, 192, 230] }    // Pink
        ];
        const [start, end] = this.getColorRange(normalizedRevenue, colorStops);
        return this.interpolateColor(normalizedRevenue, start, end);
    }

    getColorRange(value, stops) {
        for (let i = 0; i < stops.length - 1; i++) {
            if (value >= stops[i].offset && value <= stops[i + 1].offset) {
                return [stops[i], stops[i + 1]];
            }
        }
        return [stops[0], stops[stops.length - 1]];
    }

    interpolateColor(value, start, end) {
        const ratio = (value - start.offset) / (end.offset - start.offset);
        const r = lerp(start.color[0], end.color[0], ratio);
        const g = lerp(start.color[1], end.color[1], ratio);
        const b = lerp(start.color[2], end.color[2], ratio);
        return `rgb(${round(r)}, ${round(g)}, ${round(b)})`;
    }
}
