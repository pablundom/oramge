import {Injectable} from '../Annotations/Annotations';
import {BasicTileStrategy} from '../Entities/Map/MapGeneratorStrategies/BasicTileStrategy';
import {Canvas} from '../Canvas';
import {MapSelector} from '../Entities/Map/MapSelector';

export class ContainerInstanciable {
    public id: any;
    public instance: any;
    public instanced: boolean;
    public instanciable: any;

    constructor(id: any, instance?: Function) {
        this.id = id;
        this.instance = instance;
        this.instanced = false;
    }
}
@Injectable()
export class Container {
    constructor(private bag?: Map<any, ContainerInstanciable>) {
    }
    private static _instance;

    static getInstance(...args) {
        if ( typeof this._instance === 'undefined') {
            this._instance = new Container(...args);
        }
        return this._instance;
    }
    add(id: (ContainerInstanciable | Function)) {
        if (id instanceof  ContainerInstanciable) {
            id.instanciable = id.instance;
            this.bag.set(id.id, id);
            return;
        }
        const instanciable = new ContainerInstanciable(id, id);
        instanciable.instanciable = instanciable.instance;
        this.bag.set(id, instanciable);

    }
    get(id: any): any {
        return this.getOrInstanciate(id);
    }
    getNew(id: any) {
        const containerInstanciable: ContainerInstanciable = this.bag.get(id);
        const instance = this.instanciate(containerInstanciable);
        return instance;
    }
    all(): Map<any, any> {
        return this.bag;
    }
    getAllArray(): Array<ContainerInstanciable> {
        const result = [];
        this.all().forEach((v) => {
            result.push(v);
        });

        return result;
    }
    getInstanciatedArguments(v: Array<any> = []) {
        const args = [];
        v.forEach((a) => {
            let arg = this.bag.get(a);
            if (typeof arg === 'undefined') {
                arg = this.checkInterfaceInstance(a);
            } else {
                arg = this.getOrInstanciate(arg.id);
            }
            args.push(arg);
        });
        return args;
    }
    private instanciate(containerInstanciable: ContainerInstanciable) {
        let args = Reflect.getMetadata('design:paramtypes', containerInstanciable.instance);
        args = this.getInstanciatedArguments(args);
        let instance;
        if (this.isConstructor(containerInstanciable.instanciable)) {
            instance = new containerInstanciable.instanciable(...args);
        } else {
            args.push(this);
            instance = containerInstanciable.instanciable(...args);
        }

        return instance;
    }

    private getOrInstanciate(id: any) {
        const containerInstanciable: ContainerInstanciable = this.bag.get(id);
        if (containerInstanciable.instanced === true) {
            return containerInstanciable.instance;
        }
        const instance = this.instanciate(containerInstanciable);
        this.saveInstance(containerInstanciable, instance);

        return instance;
    }
    private isConstructor(obj) {
        return !!obj.prototype && !!obj.prototype.constructor.name;
    }

    private instanciateClass(a: any, args: any[]) {
        return new a(...args);
    }

    private checkInterfaceInstance(a: any) {
        let instance = false;
        this.bag.forEach((k, v) => {
            const currInstance = k.instance;
            if (currInstance instanceof a) {
                instance = k.id;
                return false;
            }
        });
        if (instance === false) {
            return this.instanciateClass(a, []);
        }
        return this.get(instance);

    }

    addInstance(id: any, instance: any) {
        const containeInstanciable = new ContainerInstanciable(id, instance);
        containeInstanciable.instanced = true;
        containeInstanciable.instanciable = instance.constructor;
        this.bag.set(id, containeInstanciable);
    }

    private saveInstance(containerInstanciable: ContainerInstanciable, instance: any) {
        containerInstanciable.instance = instance;
        containerInstanciable.instanced = true;

        this.bag.set(containerInstanciable.id, containerInstanciable);
    }

    getByClassName(canvas: string, newInst = false) {
        let result: ContainerInstanciable = null;
        this.all().forEach((v: ContainerInstanciable, k) => {
            if (v.id.toString().match(new RegExp(`class\\s*(${canvas}*)\\s*{`))) {
                result = v;
            }
        });
        if (result === null) {
            return null;
        }
        if (newInst === true) {
            return this.getNew(result.id);
        }
        return this.get(result.id);
    }
}
