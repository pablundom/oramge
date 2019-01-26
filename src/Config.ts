import {Observable, ReplaySubject, Subject} from 'rxjs';
import {DataManager} from './Managers/DataManager';
import {Injectable} from './Annotations/Annotations';

export class ConfigDependency {
    public path: string;
    public name: string;
}
@Injectable()
export class Config {
    public isLoaded = false;
    constructor(private dependencies: Array<ConfigDependency>,
                private data: Map<string, any>,
                private dataManager: DataManager,
                public loaded$: Subject<Map<string, any>>) {}
    public get(id: string) {
        return this.data.get(id);
    }

    public loadConfig(): Observable<Map<string, any>> {
        const length = this.dependencies.length;
        if ( length === 0) {
            this.isLoaded = true;
            this.loaded$.next(this.data);
        }
        let counter = 0;
        this.dependencies.forEach((a) => {
            this.dataManager.get(a.path).subscribe((res) => {
               this.data.set(a.name, res);
               ++counter;
                if (counter === length) {
                    this.loaded$.next(this.data);
                }
            });
        });
        return this.loaded$.asObservable();
    }

    public addDependency(dependency: ConfigDependency) {
        this.dependencies.push(dependency);
        return this.loadConfig();
    }

}
