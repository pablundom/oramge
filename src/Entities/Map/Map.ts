import {Tile} from '../Tiles/Tile';
import {Canvas} from '../../Canvas';
import {CanvasDrawer} from '../../Drawers/CanvasDrawer';
import {MapGeneratorStrategy} from './MapGeneratorStrategies/MapGeneratorStrategy';
import {Injectable} from '../../Annotations/Annotations';

@Injectable()
export class MapConfig {
    tileSize = 16;
    generatorStrategy?: MapGeneratorStrategy;
    width = 512;
    height = 512;
}

@Injectable()
export class Map {
    public tiles: Array<Tile>;
    tileSize: number;
    private width: number;
    private height: number;
    constructor(private mapConfig: MapConfig,
                private generatorStrategy: MapGeneratorStrategy) {
        this.tileSize = mapConfig.tileSize;
        this.width = mapConfig.width;
        this.height = mapConfig.height;
    }
    init() {
        this.initTiles();
    }
    public refresh() {

    }

    private initTiles() {
        this.tiles = this.generatorStrategy.generate(this.width, this.height);
    }
    public getTile(x: number, y: number) {
        return this.tiles.find(a => a.x === x && a.y === y);
    }
    public findTileByPixels(x: number, y: number): Tile {
        const xp = Math.floor(x / this.tileSize);
        const yp = Math.floor(y / this.tileSize);
        return this.getTile(xp, yp);
    }
}
