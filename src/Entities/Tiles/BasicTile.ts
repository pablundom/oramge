import {Tile} from './Tile';
import {Tile as tile} from '../../Annotations/Annotations';

@tile()
export class BasicTile implements Tile {
    name = 'BasicTile';
    isPassable = true;
    cost = 0;
    public constructor(public x: number, public y: number) {}

}
