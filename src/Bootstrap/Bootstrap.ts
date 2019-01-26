
/**
 * These are functions that works as a facade to bootstrap a normal game.
 * We higly recommend to NOT modify these files and create your own if you are
 * goin to edit the game bootstrap process.
 */

import {Game} from '../Entities/Game';
import {Container, ContainerInstanciable} from '../Container/Container';
import {CircleManager} from '../Managers/CircleManager';
import {CircleComingStage} from '../Entities/Stages/CircleComingStage';
import {Stage} from '../Entities/Stages/Stage';
import {appConfig} from '../appConfig';
import {range} from '../Utils/Functions';
import {createCanvasElement} from '../Canvas';
import {appendChildToElement} from '../Dom/DomUtil';
import {Config} from '../Config';
import {DataManager} from '../Managers/DataManager';
import {Subject} from 'rxjs';
import {Handler} from '../Handlers/Handler';
import {AngularJs} from '../Angular/AppModule';
import {ClockManager} from '../Managers/ClockManager';
import {ManagerFactory} from '../Managers/ManagerFactory';
import {WaitTimerStage} from '../Entities/Stages/WaitTimerStage';



export const bootStages = (container: Container): Array<Stage> => {
    const result = [];
    const game: Game = container.get(Game);
    const firstStage = new WaitTimerStage(game);
    firstStage.addManager(ManagerFactory.clockManager('layer2', container));
    firstStage.init(6);
    const secondStage = new CircleComingStage(game);
    secondStage.addManager(ManagerFactory.circleManager('layer1', container));
    secondStage.addManager(ManagerFactory.clockManager('layer2', container));
    secondStage.init(15, 16);
    const thirdStage = new WaitTimerStage(game);
    thirdStage.addManager(ManagerFactory.clockManager('layer2', container));
    thirdStage.init(6);
    const fourStage = new CircleComingStage(game);
    fourStage.addManager(ManagerFactory.circleManager('layer1', container));
    fourStage.addManager(ManagerFactory.clockManager('layer2', container));
    fourStage.init(15, 8);
    result.push(firstStage);
    result.push(secondStage);
    result.push(thirdStage);
    result.push(fourStage);

    return result;
};

export const bootDom = () => {
    const width = appConfig.width;
    const heigth = appConfig.height;
    const viewport = document.getElementById('viewport');
    viewport.style.width = `${width}px`;
    viewport.style.height = `${heigth}px`;

    range(appConfig.layers).forEach((a) => {
        const styles = {zIndex: `${a}`, position: 'absolute', top: '0', left: '0', width: viewport.style.width,
            heigth: viewport.style.height};
        let canvas = createCanvasElement(`layer${a}`, styles);
        if (a === 0 ) {
            canvas = createCanvasElement(`background`, styles);
        }
        appendChildToElement('viewport', canvas);
    });
};

export const bootContainer = () => {
    const container = new Container(new Map<any, ContainerInstanciable>());
    appConfig.dependencies.forEach((a) => {
        container.add(a);
    });
    container.addInstance(Container, container);

    return container;
};

export const bootConfig = (container: Container) => {
    const config =  new Config(appConfig.configData, new Map(), container.get(DataManager), new Subject());
    container.addInstance(Config, config);

    return config;
};
export const registerHandlers = (container: Container) => {
    container.getAllArray().filter((a) => {
        const func = a.instanciable;
        const annotations: Array<string> = func._annotations;
        if (typeof annotations === 'undefined') {
            return false;
        }

        return annotations.indexOf('Handler') > -1;
    }).forEach((a) => {
        const func = a.instanciable;
        const handler: Handler = container.get(func);
        handler.register();
    });
};

export const registerAngularControllers = (container: Container, angulajs: AngularJs) => {
    container.getAllArray().filter(cont => {
        const a = cont.instance;
        const annotations: (Array<string> | undefined) = a._annotations;
        if ( typeof annotations === 'undefined') {
            return false;
        }
        return annotations.indexOf('AngularController') > -1;
    }).forEach((cont) => {
        let a = cont.instanciable;
        a = new a;
        angulajs.controller(a.name, a.callback);
    });

};

