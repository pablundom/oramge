import {Tile} from '../Tiles/Tile';
import {CanvasDrawer} from '../../Drawers/CanvasDrawer';
import {Map} from './Map';
import {Injectable} from '../../Annotations/Annotations';

@Injectable()
export class MapSelector {
    public toBeDrawn: Array<Tile>;
    private hidden = false;
    public drawn: Array<Array<any>>;

    constructor(private canvasDrawer: CanvasDrawer, private map: Map) {
        this.drawn = [];
        this.toBeDrawn = [];
    }
    public hide() {
        if (this.hidden) {
            return;
        }
        const tileSize = this.map.tileSize;
        this.drawn.forEach((a) => {
            const tile = a[0];
            this.canvasDrawer.clearRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        });
        this.hidden = true;
    }
    public show() {
        if (!this.hidden) {
            return;
        }
        const tileSize = this.map.tileSize;
        this.drawn.forEach((a) => {
            const color = a[1];
            const tile = a[0];
            this.canvasDrawer.drawFillSquare(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize, color);
        });
        this.hidden = false;
    }
    public drawRectBetweenTwoPoints(xTile: Tile, yTile: Tile) {
        const xmin = Math.min(xTile.x, yTile.x);
        const ymin = Math.min(xTile.y, yTile.y);
        const xmax = Math.max(xTile.x, yTile.x);
        const ymax = Math.max(xTile.y, yTile.y);
        for (let i = xmin; i <= xmax; i++) {
            for (let j = ymin; j <= ymax; j++) {
                let tile = this.map.getTile(i, j);
                // @ts-ignore
                tile = new xTile.constructor(tile.x, tile.y);
                this.toBeDrawn.push(tile);
            }
        }
    }
    public getTilesToBeDrawn(): Array<Tile> {
        return this.drawn.map((a) => {
            return a[0];
        });
    }
    public cellOccupied(x: Number, y: Number) {
        return this.drawn.some((a) => {
            const tile: Tile = a[0];
            return x === tile.x && y === tile.y;
        });
    }
    public findTile(x: Number, y: Number) {
        return this.drawn.map((a) => {
            return a[0];
        }).find((tile: Tile) => {
            return x === tile.x && y === tile.y;
        });
    }
    public addTile(tile: Tile) {
        if (typeof tile === 'undefined') {
            return;
        }

        this.toBeDrawn.push(tile);

    }
    public removeTile(tile: Tile) {
        const index = this.getTilesToBeDrawn().indexOf(tile);
        const tileSize = this.map.tileSize;
        this.canvasDrawer.clearRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        delete this.drawn[index];
        this.drawn.splice(index, 1);
    }
    public clearTiles() {
        const tileSize = this.map.tileSize;
        this.canvasDrawer.clear();
        delete this.drawn;
        this.drawn = [];
    }

    public drawTiles(color: any) {
        const tileSize = this.map.tileSize;
        this.toBeDrawn.forEach((a) => {
            if (this.cellOccupied(a.x, a.y)) {
                const drawTile = this.findTile(a.x, a.y);
                this.removeTile(drawTile);
            }
            this.drawn.push([a, color]);
            if (this.hidden) {
                return;
            }
            this.canvasDrawer.drawFillSquare(a.x * tileSize, a.y * tileSize, tileSize, tileSize, color);
        });
        this.toBeDrawn = [];
    }
    public redraw() {
        const tileSize = this.map.tileSize;
        this.drawn.forEach((a) => {
            this.canvasDrawer.drawFillSquare(a[0].x * tileSize, a[0].y * tileSize, tileSize, tileSize, a[1]);
        });
    }
}
