// 1 Floor tile is 1 feet (not meters because we are imperial scum)
export class Floor {
    constructor(xCoord, yCoord, className) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.name = `Floor: (${xCoord}, ${yCoord})`;
        this.className = className;
    }

    // not using typical javascript way of getting because it breaks my code
    // for some reason that I can't be bothered to fix
    getXCoord() {
        return this.xCoord;
    }

    getYCoord() {
        return this.yCoord;
    }

    getXYCoords() {
        return this.xCoord + ", " + this.yCoord;
    }

    getName() {
        return this.name;
    }

    getClassName() {
        return this.className;
    }

}

// 1 Wall == 1 Floor tile
export class Wall extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Wall");
        this.name = `Wall: (${xCoord}, ${yCoord})`;
    }
}

// 1 Bed == 3x2 Floor tiles
export class Bed extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Bed");
        this.name = `Bed: (${xCoord}, ${yCoord})`;
    }
}

// 1 Bookcase == 7x5 Floor tiles
export class Bookcase extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Bookcase");
        this.name = `Bookcase: (${xCoord}, ${yCoord})`;
    }
}

// 1 Chair == 1 Floor tile
export class Chair extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Chair");
        this.name = `Chair: (${xCoord}, ${yCoord})`;
    }
}

// 1 Desk == 2x1 Floor tiles
export class Desk extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Desk");
        this.name = `Desk: (${xCoord}, ${yCoord})`;
    }
}
// 1 Dresser == 3x1 Floor tiles
export class Dresser extends Floor {
    constructor(xCoord, yCoord) {
        super(xCoord, yCoord, "Dresser");
        this.name = `Dresser: (${xCoord}, ${yCoord})`;
    }
}