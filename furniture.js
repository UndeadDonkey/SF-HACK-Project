export class Floor {
    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.name = "Floor: (" + xCoord + ", " + yCoord + ")";
    }

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

}

export class Wall {
    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.name = "Wall: (" + xCoord + ", " + yCoord + ")";
    }

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
}