import {Tile} from './Tile';
import {Injectable, Tile as tile} from '../../Annotations/Annotations';

@tile()
export class NonPassableTile implements Tile {
    cost: number;
    isPassable: boolean;
    name = 'NonPassableTile';
    public constructor(public x: number, public y: number) {
        this.cost = 0;
        this.isPassable = false;
    }

}
