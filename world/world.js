function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
}

function getRandomValueArray(array) {
    let random = getRandomNumber(0, array.length);
    return array[random];
}

function getDirectionSquare(coorX, coorY, x, y) {
    /* 
    0 : bottom right
    1 : bottom left
    2 : upper right
    3 : upper left
    */

    //Corners
    if (coorX === 0 && coorY === 0) {
        return 0;
    }
    if (coorX === 0 && coorY === y - 1) {
        return 2;
    }
    if (coorX === x - 1 && coorY === 0) {
        return 1;
    }
    if (coorX === x - 1 && coorY === y - 1) {
        return 3;
    }

    //sides
    if (coorX === 0) {
        return getRandomValueArray([0, 2]);
    }
    if (coorX === x - 1) {
        return getRandomValueArray([[1, 3]]);
    }
    if (coorY === 0) {
        return getRandomValueArray([0, 1]);
    }
    if (coorY === y - 1) {
        return getRandomValueArray([2, 3]);
    }

    //rest
    return getRandomValueArray([0, 1, 2, 3]);
}

function getMaxSquare(world, coorX, coorY, x, y, direction) {
    x = x - 1;
    y = y - 1;

    //Max X
    let maxX = 0;
    if (direction === 0 || direction === 2) {
        maxX = x - coorX;
    } else {
        maxX = coorX + 1;
    }

    //Max Y
    let maxY = 0;
    if (direction === 0 || direction === 1) {
        maxY = y  - coorY;
    } else {
        maxY = coorY + 1;
    }
    
    console.log("MaxX: " + maxX);
    console.log("MaxY: " + maxY);
    if (maxX < maxY)
        return maxX;
    return maxY;
}

function drawSquare(world, coorX, coorY, direction, maxSquare) {
    /* 
    0 : bottom right
    1 : bottom left
    2 : upper right
    3 : upper left
    */

    return world;
}

function generateSquareRoads(world, x, y) {
    let coorX = getRandomNumber(0, x - 1);
    let coorY = getRandomNumber(0, y - 1);

    console.log([coorY, coorX]);
    world[coorY][coorX] = 1; //debug

    const direction = getDirectionSquare(coorX, coorY, x, y);
    const maxSquare = getMaxSquare(world, coorX, coorY, x, y, direction)
    console.log("Direction: " + direction);
    console.log("MaxSquare: " + maxSquare);
    world = drawSquare(world, coorX, coorY, direction, maxSquare);

    return world;
}

function generate(x, y)
{
    /*
        0 = empty/grass
        1 = road
    */
   let world = new Array(y).fill(0).map(() => new Array(x).fill(0));
   
   for (let i = 0; i < Number(process.env.WORLD_ROAD_BLOCKS_NBR); i++) {
       world = generateSquareRoads(world, x, y);
   }
   return world;
}


module.exports = {
    generate
}