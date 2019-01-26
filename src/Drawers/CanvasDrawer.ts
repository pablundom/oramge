import {Canvas} from '../Canvas';
import {Injectable} from '../Annotations/Annotations';
import {range} from '../Utils/Functions';

@Injectable()
export class CanvasDrawer {
    constructor(public canvas: Canvas) {
    }

    public drawSquare(x: number, y: number, xsize: number, size: number, style: string, globalCompositeOperation = 'source-over') {
        const ctx = this.canvas.context;
        ctx.strokeStyle = style;
        ctx.globalCompositeOperation = globalCompositeOperation;
        ctx.rect(x, y, xsize, size);
        ctx.stroke();
        ctx.strokeStyle = null;
    }

    public drawCircle(centerX: number, centerY: number, radius, fillStyle: string, strokeStyle: string,
                      globalCompositeOperation = 'source-over') {
        const context = this.canvas.context;
        context.beginPath();
        context.globalCompositeOperation = globalCompositeOperation;
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillStyle;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = strokeStyle;
        context.stroke();
        context.globalCompositeOperation = 'source-over';
    }

    clear() {
        this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearRect(x: number, y: number, tileSize: number, tileSize2: number) {
        this.canvas.context.clearRect(x, y, tileSize, tileSize2);
    }

    drawFillSquare(x: number, y: number, xsize: number, ysize: number, style: string, globalCompositeOperation = 'source-over') {
        const ctx = this.canvas.context;
        ctx.fillStyle = style;
        ctx.globalCompositeOperation = globalCompositeOperation;
        ctx.fillRect(x, y, xsize, ysize);
        ctx.stroke();
        ctx.fillStyle = null;
        ctx.globalCompositeOperation = 'source-over';
    }

    drawText(x: number, y: number, text: string) {
        const ctx = this.canvas.context;
        ctx.font = '20px Georgia';
        ctx.fillStyle = '#FFF';
        ctx.fillText(text, x, y, );
    }
}
