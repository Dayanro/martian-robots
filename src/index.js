const fs = require('fs');
import { createRobot, processInstructions } from './robot/robot.js'

const gridLimit = {}
const position = []
const instruction= []
const robots = []
const scents=[]

try {
    const data = fs.readFileSync('input.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line, index) => {
        if (!gridLimit.x && !gridLimit.y) {
            const coordinates = line.split(" ")
            gridLimit.x = parseInt(coordinates[0],10)
            gridLimit.y = parseInt(coordinates[1],10)
        } else { 
            (index & 1) ? position.push(line) : instruction.push(line)
        }
    });
} catch (err) {
    console.error(err);
}

for (let i = 0; i < position.length; i++){
    let positionRobot = position[i].split(" ")
    let xCoordinate = parseInt(positionRobot[0],10)
    let yCoordinate = parseInt(positionRobot[1],10)
    let orientation = positionRobot[2]
    let instructions= instruction[i].split("")
    robots.push(createRobot(xCoordinate, yCoordinate, orientation, instructions))
}

robots.map(robot => { 
    const updatedRobot = processInstructions(robot, gridLimit, scents)
    updatedRobot.isAlive  || scents.push({ x: updatedRobot.position.x, y: updatedRobot.position.y}) 
})


