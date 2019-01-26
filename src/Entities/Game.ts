import {Timer} from '../Timer';
import {Map} from './Map/Map';
import {Injectable} from '../Annotations/Annotations';
import {Stage, StageStatus} from './Stages/Stage';
import {Subscription} from 'rxjs';

@Injectable()
export class Game {
    private stages: Array<Stage> = [];
    private selectedStageIndex;
    private stages$: Subscription;
    constructor(private map: Map, private timer: Timer) {
    }
    public init() {
        this.initTimer();
        this.initStages();
    }
    public refresh() {
        this.map.refresh();
    }
    getTimer() {
        return this.timer;
    }

    public initTimer() {
        this.timer.init();
        this.timer.everyFrame().subscribe((a) => {
            this.refresh();
        });
    }

    addStages(stages: Array<Stage>) {
        this.stages = stages;
    }

    private initStages() {
        this.selectedStageIndex = -1;
        this.nextStage();
    }

    nextStage() {
        this.selectedStageIndex += 1;
        const stage = this.stages[this.selectedStageIndex];
        if (typeof stage === 'undefined') {
            return;
        }
        stage.start();
        this.stages$ = stage.getStatus().subscribe((a) => {
            if (a === StageStatus.Ended) {
                this.stages$.unsubscribe();
                this.nextStage();
                return;
            }
        });
    }
}
