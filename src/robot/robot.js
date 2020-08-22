
export const createRobot = (xCoordinate, yCoordinate, orientation, instructions ) => ({
    position: {
        x: xCoordinate,
        y: yCoordinate
    },
    orientation,
    instructions
})

export const processInstructions = (robot) => {
    let updatedRobot = { ...robot }
    let { instructions } = updatedRobot
    instructions.forEach(instruction => {
        let { position, orientation } = updatedRobot
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
                    ...updatedRobot, ...moveForward(orientation, position.x, position.y)
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

const moveForward = (orientation, positionX, positionY) => {
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
    return {
        position: {
            x: updatedXCoordinate,
            y: updatedYCoordinate
        }}
}