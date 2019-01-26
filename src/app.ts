
import 'reflect-metadata';
import {Game} from './Entities/Game';
import {BackgroundCanvas} from './Canvas';
import {Stage} from './Entities/Stages/Stage';
import {bootConfig, bootContainer, bootDom, bootStages, registerHandlers} from './Bootstrap/Bootstrap';
import {Map} from './Entities/Map/Map';

bootDom();
const container = bootContainer();
const config = bootConfig(container);
registerHandlers(container);

config.loadConfig().subscribe((a) => {
    const backgrounCanvas: BackgroundCanvas = container.get(BackgroundCanvas);
    backgrounCanvas.init();
    container.get(Map).init();
    const stages: Array<Stage> = bootStages(container);
    const game: Game = container.get(Game);
    game.addStages(stages);
    game.init();
});

