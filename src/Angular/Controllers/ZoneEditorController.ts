import {AngularController} from '../../Annotations/Annotations';
import {Input} from '../../Input';
import {DataManager} from '../../Managers/DataManager';
import {Map} from '../../Entities/Map/Map';
import {MapSelector} from '../../Entities/Map/MapSelector';
import {Container} from '../../Container/Container';
import { CanvasFactory} from '../../Canvas';
import {CanvasDrawer} from '../../Drawers/CanvasDrawer';
import {Tile} from '../../Entities/Tiles/Tile';
import {HttpClient} from '../../Utils/HttpClient';
import {Manager} from '../../Managers/Manager';
import {BasicTile} from '../../Entities/Tiles/BasicTile';
import {Config} from '../../Config';



@AngularController()
export class ZoneEditorController {
    public name = 'ZoneEditorController';
    static createMapSelector(id: string, opacity = '0.5', container: Container): MapSelector {
        const canvas = CanvasFactory.get(id);
        canvas.canvas.style.opacity = opacity;
        const canvasDrawer = new CanvasDrawer(canvas);
        return new MapSelector(canvasDrawer, container.get(Map));
    }
    callback($scope, $events, $container: Container) {
        const manager: DataManager = $container.get(DataManager);
        const config: Config = $container.get(Config);
        const map: Map = $container.get(Map);
        const input: Input = $container.get(Input);
        const httpClient: HttpClient = $container.get(HttpClient);
        const zoneSelector: MapSelector = ZoneEditorController.createMapSelector('layer2', '0.7', $container);
        const previewSelector: MapSelector  = ZoneEditorController.createMapSelector('layer3', '0.8', $container);
        $scope.selectedZone = null;
        config.loaded$.asObservable().subscribe((a) => {
            zoneSelector.clearTiles();
            const mapConfig = config.get('map');
            $scope.zones = mapConfig.zones;
            $scope.zones.forEach((zone) => {
                const color = zone.color;
                zone.tiles.forEach((til) => {
                    const tile = $container.getByClassName(til.name, true);
                    tile.x = til.x;
                    tile.y = til.y;
                    zoneSelector.addTile(tile);
                    zoneSelector.drawTiles(color);
                });
            });
        });
        $scope.selected = [];
        $scope.addZone = (zone) => {
            $scope.zones.push(zone);
            $scope.newZone = {};
            $scope.save();
        };
        $scope.typeTiles = [];
        $scope.selectZone = (zone) => {
            $scope.selectedZone = zone;
        };
        $scope.save = function() {
            const formData = new FormData();
            formData.append('zones', JSON.stringify($scope.zones));
            httpClient.post('api/index.php?action=savezones', formData).subscribe((a) => {

            });
        };
        const updateZoneTiles = () => {
            $scope.selectedZone.tiles = [...new Set(zoneSelector.getTilesToBeDrawn())];
        };
        const getTile = (x: number, y: number): Tile => {
            const tile = map.findTileByPixels(x, y);

            return tile;
        };
        let last: Array<Tile> = [];
        input.whenMouseMove(true).subscribe((a: Input) => {
            if ($scope.selectedZone === null) {
                return;
            }
            const x = a.event.offsetX;
            const y = a.event.offsetY;
            const tile = getTile(x, y);
            if (typeof tile === 'undefined') {
                return;
            }
            if (a.event.altKey === true) {
                previewSelector.clearTiles();
                if (last.length === 2) {
                    last.pop();
                }
                if (last.length === 0 ) {
                    last.push(tile);
                }
                last.push(tile);
                previewSelector.drawRectBetweenTwoPoints(last[0], last[1]);
                previewSelector.drawTiles($scope.selectedZone.color);
                return;
            }
            if (last.length === 2) {
                zoneSelector.drawRectBetweenTwoPoints(last[0], last[1]);
                zoneSelector.drawTiles($scope.selectedZone.color);
            }
            last = [];
            previewSelector.clearTiles();
            previewSelector.addTile(tile);
            previewSelector.drawTiles($scope.selectedZone.color);
        });
        input.whenClicked(true).subscribe((a: Input) => {
            if ($scope.selectedZone === null) {
                return;
            }
            const x = a.event.offsetX;
            const y = a.event.offsetY;
            const tile = getTile(x, y);
            if (typeof tile === 'undefined') {
                return;
            }
            if (a.event.altKey === true) {
                if (last.length === 2) {
                    last.pop();
                }
                if (last.length === 0 ) {
                    last.push(tile);
                }
                last.push(tile);
                zoneSelector.drawRectBetweenTwoPoints(last[0], last[1]);
                zoneSelector.drawTiles($scope.selectedZone.color);
                $scope.selectZone.tiles = zoneSelector.getTilesToBeDrawn();
                updateZoneTiles();
                return;
            }
            last = [];
            zoneSelector.addTile(tile);
            zoneSelector.drawTiles($scope.selectedZone.color);
            $scope.selectZone.tiles = zoneSelector.getTilesToBeDrawn();
            updateZoneTiles();
        });
    }
}
