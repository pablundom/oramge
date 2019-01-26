import {HttpClient} from '../Utils/HttpClient';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export abstract class Manager {
    public abstract init(...args);
    public abstract tick();
    public abstract prepare(...args);
}
