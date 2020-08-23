const fs = require('fs');
import { createRobot,processRobotInstructions } from './../robot/robot.js'

export const processData = (fileName) => {
    processRobots(processInputFile(fileName));
}

const processInputFile = (fileName) => {
    const gridLimit = {}
    const position = []
    const instruction = []
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line, index) => {
            if (!gridLimit.x && !gridLimit.y) {
                const coordinates = line.split(" ")
                const posX = parseInt(coordinates[0], 10)
                const posY = parseInt(coordinates[1], 10)
                gridLimit.x = posX > 50 ? 50 : posX
                gridLimit.y = posY > 50 ? 50 : posY
            } else {
                if (index & 1) {
                    position.push(line)
                } else {
                    const instructionString = line.length > 100 ? line.slice(0,100) : line 
                    instruction.push(instructionString)
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
    return {
        gridLimit, position, instruction
    }
}

const createRobots = (position, instruction) => {
    const robots = []
    for (let i = 0; i < position.length; i++) {
        let positionRobot = position[i].split(" ")
        let xCoordinate = parseInt(positionRobot[0], 10)
        let yCoordinate = parseInt(positionRobot[1], 10)
        let orientation = positionRobot[2]
        let instructions = instruction[i].split("")
        robots.push(createRobot(xCoordinate, yCoordinate, orientation, instructions))
    }
    return robots
}

const processRobots = ({ position, instruction, gridLimit }) => { 
    const robots = createRobots(position, instruction)
    processRobotInstructions(robots, gridLimit)
}

