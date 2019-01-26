import {AngularController} from '../../Annotations/Annotations';
import {Events} from '../../Events';
import {Input} from '../../Input';
import {DataManager} from '../../Managers/DataManager';
import {Map} from '../../Entities/Map/Map';
import {MapSelector} from '../../Entities/Map/MapSelector';
import {Container} from '../../Container/Container';
import {Canvas, CanvasFactory} from '../../Canvas';
import {CanvasDrawer} from '../../Drawers/CanvasDrawer';
import {Tile} from '../../Entities/Tiles/Tile';
import {HttpClient} from '../../Utils/HttpClient';



@AngularController()
export class EditorController {
    public name = 'EditorController';
    static createMapSelector(id: string, opacity = '0.5', container: Container): MapSelector {
        const canvas = CanvasFactory.get(id);
        canvas.canvas.style.opacity = opacity;
        const canvasDrawer = new CanvasDrawer(canvas);
        return new MapSelector(canvasDrawer, container.get(Map));
    }
    callback($scope, $events, $container: Container) {

    }
}
