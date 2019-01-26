import {Tile} from '../../Tiles/Tile';
import {Injectable} from '../../../Annotations/Annotations';

@Injectable()
export abstract class MapGeneratorStrategy {
    abstract generate(width: number, heigth: number): Array<Tile>;
}
