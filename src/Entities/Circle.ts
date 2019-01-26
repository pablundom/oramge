import {Map} from './Map/Map';
import {Tile} from './Tiles/Tile';
import {NonPassableTile} from './Tiles/NonPassableTile';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export class Circle {
    public center: Tile;
    public size: number;
    constructor(private map: Map) {
    }

    init() {
        this.center = this.selectCenter();
        this.size = 32;
    }

    private selectCenter() {
        const tiles = this.map.tiles.filter((a: Tile) => {
            return a.name !== 'NonPassableTile';
        });
        return tiles[Math.floor(Math.random() * tiles.length)];
    }
}
