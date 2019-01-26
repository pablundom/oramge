import {MapGeneratorStrategy} from './MapGeneratorStrategy';
import {Tile} from '../../Tiles/Tile';
import {BasicTile} from '../../Tiles/BasicTile';
import {Injectable} from '../../../Annotations/Annotations';
import {range} from '../../../Utils/Functions';

@Injectable()
export class BasicTileStrategy extends MapGeneratorStrategy {
    generate(width: number, heigth: number): Array<Tile> {
        const result: Array<Tile> = [];
        range(heigth).forEach((i) => {
            range(width).forEach((j) => {
                const tile = new BasicTile(i, j);
                result.push(tile);
            });
        });

        return result;
    }

}
