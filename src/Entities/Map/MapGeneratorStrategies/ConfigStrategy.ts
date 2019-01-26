import {MapGeneratorStrategy} from './MapGeneratorStrategy';
import {Tile} from '../../Tiles/Tile';
import {BasicTile} from '../../Tiles/BasicTile';
import {Injectable} from '../../../Annotations/Annotations';
import {range} from '../../../Utils/Functions';
import {DataManager} from '../../../Managers/DataManager';
import {Config} from '../../../Config';

@Injectable()
export class ConfigStrategy extends MapGeneratorStrategy {
    public constructor(private config: Config) {
        super();
    }
    generate(width: number, heigth: number): Array<Tile> {
        const tiles: Array<Tile> = this.config.get('map').tiles;
        tiles.sort((a: Tile, b: Tile) => {
            return (a.x + a.y) - (b.x + b.y);
        });
        return tiles.slice();
    }

}
