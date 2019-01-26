import {Container} from '../Container/Container';
import {CanvasFactory} from '../Canvas';
import {Circle} from '../Entities/Circle';
import {CircleDrawer} from '../Drawers/CircleDrawer';
import {CanvasDrawer} from '../Drawers/CanvasDrawer';
import {CircleManager} from './CircleManager';
import {Timer} from '../Timer';
import {ClockManager} from './ClockManager';
import {Clock} from '../Entities/Clock';
import {ClockDrawer} from '../Drawers/ClockDrawer';

export class ManagerFactory {

    public static circleManager(canvasId: string, container: Container) {
        const canvas = CanvasFactory.get(canvasId);
        const circle = container.get(Circle);
        const canvasDrawer = new CanvasDrawer(canvas);
        const circleDrawer = new CircleDrawer(canvasDrawer);

        return new CircleManager(circle, circleDrawer);
    }

    static clockManager(canvasId: string, container: Container): ClockManager {
        const canvas = CanvasFactory.get(canvasId);
        const clock = new Clock();
        const canvasDrawer = new CanvasDrawer(canvas);
        const clockDrawer = new ClockDrawer(canvasDrawer);

        return new ClockManager(clock, clockDrawer);
    }
}
