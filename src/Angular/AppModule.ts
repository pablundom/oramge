// @ts-ignore
import {Container, get} from '../Container/Container';
import {Events} from '../Events';
import {Injectable} from '../Annotations/Annotations';

@Injectable()
export class AngularJs {
    private module: angular.IModule;
    constructor(private container: Container, private events: Events) {
        this.createModule();
        this.initCommonServices();
    }
    createModule(): AngularJs {
        // @ts-ignore
        this.module = angular.module('appModule', []);
        return this;
    }
    initCommonServices() {
        const container = this.container;
        const events = this.events;
        this.module.service('$container', function (): Container {
            return container;
        });
        this.module.service('$events', function () {
            this.events = () => {
                return events;
            };
        });
    }
    controller(name: string, callback: any) {
        this.module.controller(name, callback);
    }

}

