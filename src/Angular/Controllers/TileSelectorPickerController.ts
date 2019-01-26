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
import {editorConfig} from '../../editorConfig';
import {Config} from '../../Config';



@AngularController()
export class TileSelectorPickerController {
    public name = 'TileSelectorPickerController';
    static createMapSelector(id: string, opacity = '0.5', container: Container): MapSelector {
        const canvas = CanvasFactory.get(id);
        canvas.canvas.style.opacity = opacity;
        const canvasDrawer = new CanvasDrawer(canvas);
        return new MapSelector(canvasDrawer, container.get(Map));
    }
    callback($scope, $events, $container: Container) {
        const config: Config = $container.get(Config);
        const map: Map = $container.get(Map);
        const input: Input = $container.get(Input);
        const httpClient: HttpClient = $container.get(HttpClient);
        $scope.typetiles = editorConfig.tiles;
        const tileSelector: MapSelector = TileSelectorPickerController.createMapSelector('layer1', '0.5', $container);
        const previewSelector: MapSelector  = TileSelectorPickerController.createMapSelector('layer3', '0.8', $container);
        config.loaded$.asObservable().subscribe((a) => {
            tileSelector.clearTiles();
            const mapConfig = config.get('map');
            const tiles = mapConfig.tiles;
            $scope.zones = mapConfig.zones;
            tiles.forEach((confTile) => {
               const color = $scope.typetiles.find(c => c.name === confTile.name).color;
                const tile = $container.getByClassName(confTile.name, true);
                tile.x = confTile.x;
                tile.y = confTile.y;
               tileSelector.addTile(tile);
                tileSelector.drawTiles(color);
            });
        });
        $scope.selected = [];
        $scope.typeTiles = [];
        $scope.selectedTile = null;
        $scope.hideTiles = function () {
            tileSelector.hide();
        };
        $scope.showTiles = function () {
           tileSelector.show();
        };
        $scope.save = function() {
            const tiles = [...new Set(tileSelector.getTilesToBeDrawn())];
            const formData = new FormData();
            formData.append('tiles', JSON.stringify(tiles));
            httpClient.post('api/index.php?action=savetiles', formData).subscribe((a) => {
                console.log(a);
            });
        };
        const getTile = (x: number, y: number): Tile => {
            let tile = map.findTileByPixels(x, y);
            if (typeof tile === 'undefined') {
                return undefined;
            }
            x = tile.x;
            y = tile.y;
            tile = $container.getByClassName($scope.selectedTile.name, true);
            tile.x = x;
            tile.y = y;

            return tile;
        };
        let last: Array<Tile> = [];
        input.whenMouseMove(true).subscribe((a: Input) => {
            if ($scope.selectedTile === null) {
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
                previewSelector.drawTiles($scope.selectedTile.color);
                return;
            }
            if (last.length === 2) {
                tileSelector.drawRectBetweenTwoPoints(last[0], last[1]);
                tileSelector.drawTiles($scope.selectedTile.color);
            }
            last = [];
            previewSelector.clearTiles();
            previewSelector.addTile(tile);
            previewSelector.drawTiles($scope.selectedTile.color);
        });
        input.whenClicked(true).subscribe((a: Input) => {
            if ($scope.selectedTile === null) {
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
                tileSelector.drawRectBetweenTwoPoints(last[0], last[1]);
                tileSelector.drawTiles($scope.selectedTile.color);
                return;
            }
            last = [];
            tileSelector.addTile(tile);
            tileSelector.drawTiles($scope.selectedTile.color);
        });
    }
}
