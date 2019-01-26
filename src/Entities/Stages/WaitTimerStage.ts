import {Stage, StageStatus} from './Stage';
import {Observable, ReplaySubject} from 'rxjs';
import {Game} from '../Game';
import {Injectable} from '../../Annotations/Annotations';
import {CircleManager} from '../../Managers/CircleManager';

@Injectable()
export class WaitTimerStage extends Stage {
    private secondsLeft;
    private seconds: number;
    constructor(protected game: Game) {
        super(game);
        this.status$ = new ReplaySubject<StageStatus>();
        this.setStatus(StageStatus.Not_Started);
    }
    init(seconds: number) {
        this.seconds = seconds;
        this.managers.forEach((a) => {
            a.init(this.seconds);
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
                this.setStatus(StageStatus.Ended);
                subs.unsubscribe();
            }
            this.secondsLeft -= 1;
            this.managers.forEach((a) => {
                a.tick();
            });
        });
    }

}
