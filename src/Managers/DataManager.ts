import {Manager} from './Manager';
import {Config} from '../Config';
import {Injectable} from '../Annotations/Annotations';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {HttpClient} from '../Utils/HttpClient';
@Injectable()
export class DataManager {
    protected path = 'data/appConfig.json';
    protected baseUrl = 'http://localhost/oramge/';
    protected data: Map<string, any>;
    constructor(protected http: HttpClient) {
        this.data = new Map<string, any>();
    }

    public get(path) {
        const result = new ReplaySubject<any>();
        const url = `${this.baseUrl}${path}`;
        if (typeof this.data.get(url) !== 'undefined' ) {
            result.next(this.data.get(url));
        } else {
            this.http.get(url).subscribe((a) => {
                this.data.set(url, a);
                result.next(a);
            });
        }
        return result.asObservable();
    }
}
