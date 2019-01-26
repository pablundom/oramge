import {Stage, StageStatus} from './Stage';
import {Observable, ReplaySubject} from 'rxjs';
import {Game} from '../Game';
import {Injectable} from '../../Annotations/Annotations';

@Injectable()
export class CircleComingStage extends Stage {
    private secondsLeft;
    private seconds: number;
    private nextCircleSize: number;
    constructor(protected game: Game) {
        super(game);
        this.status$ = new ReplaySubject<StageStatus>();
        this.setStatus(StageStatus.Not_Started);
    }
    init(seconds: number, nextCircleSize: number) {
        this.seconds = seconds;
        this.nextCircleSize = nextCircleSize;
        this.managers.forEach((a) => {
            a.init(this.seconds, this.nextCircleSize);
        });
    }
    start() {
        this.status$.next(StageStatus.Started);
        this.secondsLeft = this.seconds;
        this.managers.forEach((a) => {
            a.prepare();
        });
        const subs = this.game.getTimer().everySecond().subscribe((a) => {
            if (this.secondsLeft <= 0 ) {
                subs.unsubscribe();
                this.setStatus(StageStatus.Ended);
            }
            this.secondsLeft -= 1;
            this.managers.forEach((b) => {
                b.tick();
            });
        });
    }

}
