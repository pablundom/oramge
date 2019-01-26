import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Events} from './Events';
import {Injectable} from './Annotations/Annotations';
import {range} from './Utils/Functions';

@Injectable()
export class Timer {
    private frames$: BehaviorSubject<any>;
    private seconds$: BehaviorSubject<any>;
    private minutes$: BehaviorSubject<any>;
    private time: number;
    public msInterval = 33.33;
    private interval: Interval;
    constructor(time: number = 0, private events: Events) {
        this.time = time;
        this.frames$ = new BehaviorSubject<Number>(this.time);
        this.seconds$ = new BehaviorSubject<Number>(this.seconds);
        this.minutes$ = new BehaviorSubject<Number>(this.minutes);
        this.interval = new Interval(events);
    }
    everyFrame() {
        return this.frames$.asObservable();
    }

    everySecond() {
        return this.seconds$.asObservable().pipe(distinctUntilChanged());
    }

    everyMinuts() {
        return this.minutes$.asObservable().pipe(distinctUntilChanged());
    }

    init() {
        this.interval.add(this.tick.bind(this), this.msInterval);
    }
    tick() {
        this.time += this.msInterval;
        this.frames$.next(this.time);
        this.seconds$.next(this.seconds);
        this.minutes$.next(this.minutes);
    }
    get seconds() {
        return Math.floor(this.time / 1000);
    }
    get minutes() {
        return Math.floor(this.seconds / 60);
    }


}

@Injectable()
export class Interval {
    private callback;
    private time;
    private windowsBlurred = false;
    private onBlurTime: number;
    private interval: NodeJS.Timeout;
    public constructor(private events: Events) {
    }

    public add(callback: Function, time) {
        this.callback = callback;
        this.time = time;
        this.initInterval();
    }

    private initInterval() {
        this.interval = setInterval(this.tick.bind(this), this.time);
        this.handleFocusBlurWindow();
    }
    public tick() {
        this.callback();
    }

    public stop() {
        clearInterval(this.interval);
        this.callback = undefined;
        this.interval = undefined;
        this.time = undefined;
    }

    private handleFocusBlurWindow() {
        this.events.get('windows_blur').subscribe((a) => {
            this.windowsBlurred = true;
            this.onBlurTime = new Date().getTime();
        });
        this.events.get('windows_focus').subscribe((a) => {
            if (this.windowsBlurred === true) {
                const time = new Date().getTime() - this.onBlurTime;
                this.windowsBlurred = false;
                this.onBlurTime = null;
                const repeat = Math.floor(time / this.time);
                range(repeat).forEach((b) => {
                    this.tick();
                });
            }
        });
    }

}
