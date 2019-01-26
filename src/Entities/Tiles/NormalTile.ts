import {Tile} from './Tile';
import {Injectable, Tile as tile} from '../../Annotations/Annotations';

@tile()
export class NormalTile implements Tile {
    public cost: number;
    public isPassable: boolean;
    name = 'NormalTile';
    public constructor(public x: number, public y: number) {
        this.cost = 0;
        this.isPassable = true;
    }

}
