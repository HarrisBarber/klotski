// Created by Harris on 5/12/2015.

// THE BOARD

function Board () {
    this.nRows = 5;
    this.nCols = 4;
    this.tiles = [];
    this.cellIsOccupied = []; // vector of vectors of boolean.  Initialized in this.init()
    this.moveCount = 0;
    this.init();
}

Board.prototype.init = function() {
    // initialize the tiles for a new game
    this.tiles.forEach( function (tile) { tile.init(); } );
    //
    var i, cellIsOccupied = this.cellIsOccupied;
    for (i = 0; i < this.nCols; i++) {
        cellIsOccupied[i] = [];
    };
    this.prepareForNextMove();
}

Board.prototype.prepareForNextMove = function() {
    this.calculateCellOccupancy();
    this.tiles.forEach( function (tile) { tile.prepareForNextMove(); } );
}

Board.prototype.calculateCellOccupancy = function() {
    // marked cells as not occupied
    var i, j, cellIsOccupied = this.cellIsOccupied;
    for (i = 0; i < this.nCols; i++) {
        for (j = 0; j < this.nRows; j++) {
            cellIsOccupied[i][j] = false;
        };
    };
    // marks those under each tile as occupied
    this.tiles.forEach(
        function (tile) {
            for (i = tile.x; i < tile.x + tile.cWidth; i++) {
                for (j = tile.y; j < tile.y + tile.cHeight; j++) {
                    cellIsOccupied[i][j] = true;
                };
            };
        }
    );
}


var board = new Board();

// THE TILES

function Tile (board, label, x, y, cWidth, cHeight) {
    // fixed attributes
    this.board = board;
    this.label = label;
    this.startPos = { x: x, y: y};
    this.cWidth = cWidth;
    this.cHeight = cHeight;
    // add to the board
    board.tiles.push(this);
    // and setup for new game
    this.init();
}

Tile.prototype.init = function() {
    // initialize this tile for a new game
    this.x = this.startPos.x;
    this.y = this.startPos.y;
    this.canMove = {left: false, right: false, up: false, down: false };
}

Tile.prototype.prepareForNextMove = function() {
    // set the canMove flags
    var board = this.board,
        cellIsOccupied = this.board.cellIsOccupied;
    var i, j,
        cWidth = this.cWidth,
        cHeight = this.cHeight,
        x =  this.x,
        right = x + cWidth - 1,
        y = this.y,
        bottom =  y + cHeight - 1;
    //
    // calculate canMove left 
    this.canMove.left = (x > 0);
    for (j = y; j < y + cHeight; j++) {
        this.canMove.left = this.canMove.left && !cellIsOccupied[x-1][j];
    };
    // calculate canMove right
    this.canMove.right = (right < board.nCols - 1);
    for (j = y; j < y + cHeight; j++) {
        this.canMove.right = this.canMove.right && !cellIsOccupied[right+1][j];
    };
    // calculate canMove left 
    this.canMove.up = (y > 0);
    for (i = x; i < x + cWidth; i++) {
        this.canMove.up = this.canMove.up && !cellIsOccupied[i][y-1];
    };
    // calculate canMove right
    this.canMove.down = (bottom < board.nRows - 1);
    for (i = x; i < x + cWidth; i++) {
        this.canMove.down = this.canMove.down && !cellIsOccupied[i][bottom+1];
    };
}

Tile.prototype.moveLeft = function() {
    if (this.canMove.left) {
        this.x--;
        this.board.prepareForNextMove();
    };
}

Tile.prototype.moveRight = function() {
    if (this.canMove.right) {
        this.x++;
        this.board.prepareForNextMove();
    };
}

Tile.prototype.moveUp = function() {
    if (this.canMove.up) {
        this.y--;
        this.board.prepareForNextMove();
    };
}

Tile.prototype.moveDown = function() {
    if (this.canMove.down) {
        this.y++;
        this.board.prepareForNextMove();
    };
}

// Create the tiles
var daughterTile = new Tile(board, 'D', 1,0,2,2 );
new Tile(board, 'A', 0,0,1,2 );
new Tile(board, 'B', 3,0,1,2 );
new Tile(board, 'C', 0,2,1,2 );
new Tile(board, 'F', 3,2,1,2 );
new Tile(board, 'E', 1,2,2,1 );
new Tile(board, 'G', 1,3,1,1 );
new Tile(board, 'H', 2,3,1,1 );
new Tile(board, 'I', 0,4,1,1 );
new Tile(board, 'J', 3,4,1,1 );

// Initialize the board and tiles

board.init();

// end
