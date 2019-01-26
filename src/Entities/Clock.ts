import {Map} from './Map/Map';
import {Tile} from './Tiles/Tile';
import {NonPassableTile} from './Tiles/NonPassableTile';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export class Clock {
    public seconds;
    constructor() {
    }

    init(seconds: number) {
        this.seconds = seconds;
    }

    get minutes() {
        return Math.floor(this.seconds / 60);
    }

    substact(number: number) {
        this.seconds -= number;
    }

    add(number: number) {
        this.seconds += number;
    }

    getActualSeconds() {
        return Math.floor(this.seconds % 60);
    }
}
