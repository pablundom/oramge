import {
    CanvasClickHandler,
    CanvasDoubleClickHandler, CanvasKeyDownHandler, CanvasKeyUpHandler, CanvasMouseDownHandler,
    CanvasMouseMoveHandler,
    CanvasMouseUpHandler, CanvasMouseWheelHandler
} from './Handlers/CanvasHandlers';
import {MapClickHandler, MapDoubleClickHandler, MapMouseMoveHandler, MapMouseSelectHandler} from './Handlers/MapHandler';
import {Container, ContainerInstanciable} from './Container/Container';
import {Events} from './Events';
import {Game} from './Entities/Game';
import {Timer} from './Timer';
import {DataManager} from './Managers/DataManager';
import {Character} from './Entities/Character';
import {Player} from './Entities/Player';
import {Scene} from './Entities/Scene';
import {Map, MapConfig} from './Entities/Map/Map';
import {MapSelector} from './Entities/Map/MapSelector';
import {BasicTileStrategy} from './Entities/Map/MapGeneratorStrategies/BasicTileStrategy';
import {BasicTile} from './Entities/Tiles/BasicTile';
import {HttpClient} from './Utils/HttpClient';
import {BackgroundCanvas, Canvas} from './Canvas';
import {MapGeneratorStrategy} from './Entities/Map/MapGeneratorStrategies/MapGeneratorStrategy';
import {AngularJs} from './Angular/AppModule';
import {TileSelectorPickerController} from './Angular/Controllers/TileSelectorPickerController';
import {NonPassableTile} from './Entities/Tiles/NonPassableTile';
import {NormalTile} from './Entities/Tiles/NormalTile';
import {Input} from './Input';
import {CanvasDrawer} from './Drawers/CanvasDrawer';
import {EditorController} from './Angular/Controllers/EditorController';
import {ZoneEditorController} from './Angular/Controllers/ZoneEditorController';
import {ConfigStrategy} from './Entities/Map/MapGeneratorStrategies/ConfigStrategy';
import {Config} from './Config';
import {CircleManager} from './Managers/CircleManager';
import {Circle} from './Entities/Circle';
import {CircleDrawer} from './Drawers/CircleDrawer';
import {CircleComingStage} from './Entities/Stages/CircleComingStage';
import {WindowsOnBlurHandler, WindowsOnFocusHandler} from './Handlers/WindowsHandler';

export const appConfig = {
    layers: 6,
    width: 512,
    height: 512,
    tileSize: 16,
    configData: [
        {
            name: 'config',
            path: 'data/config.json'
        },
        {
            name: 'map',
            path: 'data/map.json'
        },
    ],
    dependencies:
        [
            CanvasClickHandler,
            CanvasMouseMoveHandler,
            CanvasMouseUpHandler,
            CanvasDoubleClickHandler,
            CanvasMouseDownHandler,
            new ContainerInstanciable(Canvas, () => {
                    const canvasHtmlElement =  <HTMLCanvasElement> document.getElementById('layer1');
                    const context = canvasHtmlElement.getContext('2d');
                    return new Canvas(context);
                }),
            new ContainerInstanciable(BackgroundCanvas, (container: Container) => {
                const canvasHtmlElement =  <HTMLCanvasElement> document.getElementById('background');
                const context = canvasHtmlElement.getContext('2d');
                return new BackgroundCanvas(context, container.get(Events));
            }),
            MapMouseMoveHandler,
            MapMouseSelectHandler,
            MapClickHandler,
            MapDoubleClickHandler,
            WindowsOnBlurHandler,
            WindowsOnFocusHandler,
            Container,
            Events,
            Game,
            Timer,
            DataManager,
            Character,
            Player,
            Scene,
            Map,
            MapSelector,
            new ContainerInstanciable(MapConfig, (container: Container): MapConfig => {
                return {
                    tileSize: appConfig.tileSize,
                    width: appConfig.width,
                    height: appConfig.height,
                    generatorStrategy: container.get(MapGeneratorStrategy) };
            }),
            new ContainerInstanciable(MapGeneratorStrategy, (container: Container) => {
                return new ConfigStrategy(container.get(Config));
            }),
            BasicTile,
            HttpClient,
            AngularJs,
            TileSelectorPickerController,
            EditorController,
            ZoneEditorController,
            NonPassableTile,
            NormalTile,
            CanvasKeyDownHandler,
            CanvasKeyUpHandler,
            CanvasDrawer,
            Input,
            CircleManager,
            Circle,
            CircleDrawer,
            CircleComingStage,
            CanvasMouseWheelHandler
        ]
};
