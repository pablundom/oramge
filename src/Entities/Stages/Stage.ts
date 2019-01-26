import {Game} from '../Game';
import {Observable, ReplaySubject} from 'rxjs';
import {Manager} from '../../Managers/Manager';

export enum StageStatus {
    Ended,
    Started,
    Not_Started

}
export abstract class Stage {
    protected status$: ReplaySubject<StageStatus>;
    protected status: StageStatus;
    protected managers: Array<Manager> = [];
    constructor(protected game: Game) {}
    abstract start(...any);
    abstract init(...args);
    getStatus(): Observable<StageStatus> {
        return this.status$.asObservable();
    }
    protected setStatus(status: StageStatus) {
        this.status = status;
        this.status$.next(status);
    }
    public addManager(manager: Manager) {
        this.managers.push(manager);
    }
    public setManagers(managers: Array<Manager>) {
        this.managers = managers;
    }
}
