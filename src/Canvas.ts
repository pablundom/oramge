import {Injectable} from './Annotations/Annotations';
import {Events} from './Events';
import {appConfig} from './appConfig';

@Injectable()
export class Canvas {
    public canvas: HTMLCanvasElement;
    constructor(public context: CanvasRenderingContext2D) {
        this.canvas = context.canvas;
        this.height = 512;
        this.width = 512;
    }

    public get height() {
        return this.canvas.height;
    }
    public get width() {
        return this.canvas.width;
    }
    public set height(height: number) {
        this.canvas.height = height;
    }
    public set width(width: number) {
        this.canvas.width = width;
    }
}

@Injectable()
export class BackgroundCanvas extends Canvas {
    scale = 4;
    img;
    private offsetX = 0;
    private offsetY = 0;
    constructor(public context: CanvasRenderingContext2D, private events: Events) {
        super(context);
    }
    init() {
        const ctx = this.context;
        const img = new Image();
        const o = this;
        img.onload = function() {
            o.img = img;
            o.drawImage();
        };
        img.src = 'assets/image/map2.jpg';
        this.handleMouseWheel();
    }

    handleMouseWheel() {
        this.events.get('canvas_wheel').subscribe((e: MouseWheelEvent) => {
            e.preventDefault();
            this.scale += Math.sign(e.wheelDelta) * -1;
            this.scale = Math.max(Math.min(this.scale, 4), 1);
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            if (this.scale === 4) {
                this.offsetX = 0;
                this.offsetY = 0;
            }
            this.drawImage();
        });
    }
    drawImage() {
        const witdh = this.width;
        const heigth = this.height;
        this.context.clearRect(0, 0, witdh, heigth);
        this.context.drawImage(this.img, this.offsetX, this.offsetY, witdh * this.scale, heigth * this.scale,
            0, 0, witdh, heigth );
    }
}

export class CanvasFactory  {
    private static canvas = new Map<string, Canvas>();
    static get(id) {
        const canvas = this.canvas.get(id);
        if (typeof canvas !== 'undefined') {
            return canvas;
        }
        const canvasHtmlElement =  <HTMLCanvasElement> document.getElementById(id);
        const context = canvasHtmlElement.getContext('2d');
        const result = new Canvas(context);
        this.canvas.set(id, result);
        return result;
    }
}

export const createCanvasElement = (id, style: any): HTMLElement => {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    for (const [key, value] of Object.entries(style)) {
            canvas.style[key] = value;
    }

    return canvas;
};


