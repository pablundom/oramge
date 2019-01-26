import {BehaviorSubject, forkJoin, Observable, of, pipe, ReplaySubject} from 'rxjs';
import {Injectable} from './Annotations/Annotations';

@Injectable()
export class Events {
    public constructor( private events: Map<string, ReplaySubject<any>>) {}

    public get(key: string): Observable<any> {
        this.createIfNotExists(key);
        return this.events.get(key).asObservable();
    }
    public multiple(keys: Array<string>): Observable<any> {
        const observables = [];
        keys.forEach((a) => {
            observables.push(this.get(a));
        });
        return of().pipe();
    }
    public emit(key: string, data) {
        this.createIfNotExists(key);
        this.events.get(key).next(data);
    }
    public addAlias(key: string, alias: Array<string>) {
        this.createIfNotExists(key);
        const event = this.events.get(key);
        alias.forEach((a) => {
            this.events.set(a, event);
        });
    }

    private createIfNotExists(key: string) {
        if (!this.exists(key)) {
            this.createEvent(key);
        }
    }

    private exists(key: string) {
        return this.events.has(key);
    }

    private createEvent(key: string) {
        this.events.set(key, new ReplaySubject<any>());
    }
}