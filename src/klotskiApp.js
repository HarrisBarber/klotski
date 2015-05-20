/**
 * Program Name: KlotskiApp.js
 * Discussion:   Klotski Project
 * Written By:   Harris Barber
 * Date:         2015/05/20
 */
var app = angular.module('klotskiApp', []);
app.controller('klotskiCtrl', function($scope, $http) {
    $scope.board = board;

    var tiles = board.tiles;
    $scope.tiles = tiles;

    var cells = [], i;
    for (i = 0; i < board.nRows * board.nCols; i++ ) {
        cells[i] = i;
    };
    $scope.cells = cells;

    tiles.forEach( function(tile) {
                switch (tile.cWidth) {
                    case 1:
                        if (tile.cHeight == 1) {
                            tile.tileType = "oneByOne";
                        } else {
                            tile.tileType = "oneByTwo";
                        }
                        break;
                    case 2:
                        if (tile.cHeight == 1) {
                            tile.tileType = "twoByOne";
                        } else {
                            tile.tileType = "twoByTwo";
                        }
                        break;
                    default:
                        tile.tileType = "oneByOne";
                };
        });

    });
