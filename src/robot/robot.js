
export const createRobot = (xCoordinate, yCoordinate, orientation, instructions ) => ({
    position: {
        x: xCoordinate,
        y: yCoordinate
    },
    orientation,
    instructions,
    isAlive:true
})

export const processInstructions = (robot, gridLimit, scents) => {
    let updatedRobot = { ...robot }
    let { instructions } = updatedRobot
    instructions.forEach(instruction => {
        let { position, orientation, isAlive } = updatedRobot
       
        switch (instruction) {
            case "L":
                updatedRobot = {
                    ...updatedRobot, ...turnsLeft(orientation)
                }
                break
            case "R":
                updatedRobot = {
                    ...updatedRobot, ...turnsRight(orientation)
                }
                break
            case "F":
                updatedRobot = {
                    ...updatedRobot, ...moveForward(orientation, position.x, position.y, gridLimit, scents)
                }
                break
        }
    })
    return updatedRobot
}

const turnsLeft = (orientation) => {
    let newOrientation=""
    switch (orientation) {
        case "N":
            newOrientation = "W";
            break;
        case "S":
            newOrientation = "E";
            break;
        case "E":
            newOrientation = "N";
            break;
        case "W":
            newOrientation = "S";
            break;
    }
    return  { orientation: newOrientation}
}

const turnsRight = (orientation) => {
    let newOrientation = ""
    switch (orientation) {
        case "N":
            newOrientation = "E";
            break;
        case "S":
            newOrientation = "W";
            break;
        case "E":
            newOrientation = "S";
            break;
        case "W":
            newOrientation = "N";
            break;
    }
    return  { orientation: newOrientation }
}

const moveForward = (orientation, positionX, positionY, gridLimit, scents) => {
    let updatedXCoordinate = positionX
    let updatedYCoordinate = positionY
    switch (orientation) {
        case "N":
            updatedYCoordinate++;
            break;
        case "S":
            updatedYCoordinate--;
            break;
        case "E":
            updatedXCoordinate++;
            break;
        case "W":
            updatedXCoordinate--;
            break; 
    }
    if (!checkBoundaries(orientation, updatedXCoordinate, updatedYCoordinate, gridLimit)) { 
    return {
        position: {
            x: updatedXCoordinate,
            y: updatedYCoordinate
            }
        }
    } else {
        return { 
            isAlive: checkScents(scents, positionX, positionY) ? true : false
        }
    }
}

const checkBoundaries = (orientation, positionX, positionY, gridLimit) => { 
    if ((orientation == "W" && positionX < 0) ||
        (orientation == "S" && positionY > 0) ||
        (orientation == "E" && positionX> gridLimit.x) ||
        (orientation == "N" && positionY > gridLimit.y)) {
        return true;
    } else {
        return false;
    }
}
const checkScents = (scents, positionX, positionY) => { 
    return scents.filter((point) => point.x === positionX && point.y === positionY).length > 0
}
