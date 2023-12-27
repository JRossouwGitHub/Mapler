const map = document.getElementsByClassName('map')[0]
const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

canvas.width = map.offsetWidth
canvas.height = map.offsetHeight

let isGrabbing = false
let mouse = {
    x: {
        init: 0,
        current: 0
    },
    y: {
        init: 0,
        current: 0
    }
}

let portals = [
    {
        node: new Node((canvas.width/2), (canvas.height/2), 50, 50, 'SSQ', null, 'red'),
        connections: [
            {
                node: new Node((canvas.width/2) + 150, (canvas.height/2) - 150, 50, 50, 'Thetford', null, 'purple'),
                connections: [],
                timer: {
                    enabled: true,
                    time: {
                        hours: 2,
                        mins: 30
                    }
                }
            },
            {
                node: new Node((canvas.width/2) - 150, (canvas.height/2) - 150, 50, 50, 'Martlock', null, 'blue'),
                connections: [
                    {
                        node: new Node((canvas.width/2) - 150, (canvas.height/2) + 150, 50, 50, 'Bridgewatch', null, 'orange'),
                        connections: [],
                        timer: {
                            enabled: true,
                            time: {
                                hours: 3,
                                mins: 30
                            }
                        }
                    },
                    {
                        node: new Node((canvas.width/2) - 350, (canvas.height/2) - 150, 50, 50, 'Lymhurst', null, 'green'),
                        connections: [],
                        timer: {
                            enabled: true,
                            time: {
                                hours: 1,
                                mins: 15
                            }
                        }
                    },
                ],
                timer: {
                    enabled: true,
                    time: {
                        hours: 1,
                        mins: 15
                    }
                }
            },
        ],
        timer: {
            enabled: false,
            time: {
                hours: 0,
                mins: 0
            }
        }
    },
]

map.addEventListener('mousedown', (e) => {
    map.style.cursor = 'grabbing'
    isGrabbing = true
    mouse.x.init = e.clientX
    mouse.y.init = e.clientY
})

map.addEventListener('mouseup', (e) => {
    map.style.cursor = 'grab'
    isGrabbing = false
})

map.addEventListener('mousemove', (e) => {
    if(isGrabbing){
        mouse.x.current = e.clientX
        mouse.y.current = e.clientY
        xDiff = (mouse.x.current - mouse.x.init)
        yDiff = (mouse.y.current - mouse.y.init)
        recursivelyUpdateMap(portals, xDiff, yDiff)
        mouse.x.init = e.clientX
        mouse.y.init = e.clientY
    }
})

const recursivelyUpdateMap = (portals, xDiff, yDiff) => {
    portals.map(portal => {
        portal.node.x += xDiff
        portal.node.y += yDiff
        if(portal.connections.length > 0){
            recursivelyUpdateMap(portal.connections, xDiff, yDiff)
        }
    })
}

const recursivelyUpdatePortals = (portals, parentPortal = null) => {
    portals.map(portal => {
        if(parentPortal != null && ( portal.timer.time.hours > 0 || portal.timer.time.mins > 0 )){
            let x1 = portal.node.x + (portal.node.w/2)
            let y1 = portal.node.y + (portal.node.h/2)
            let x2 = parentPortal.node.x + (parentPortal.node.w/2)
            let y2 = parentPortal.node.y + (parentPortal.node.h/2)
            let xm = (x1 + x2) / 2
            let ym = (y1 + y2) / 2
            let timeDisplay = portal.timer.time.hours + "h " + portal.timer.time.mins + "m"
            ctx.beginPath()
            ctx.strokeStyle = "#FFF"
            ctx.fillStyle = "#FFF"
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath();
            ctx.fillStyle = "#3b3b3b";
            ctx.fillRect((xm + timeDisplay.length / 2) - ((timeDisplay.length / 2)*10) - 10, ym - 15, (timeDisplay.length * 10) + 20, 30);
            ctx.closePath();
            ctx.beginPath();
            if(portal.timer.time.hours == 0 && portal.timer.time.mins <= 10){
                ctx.fillStyle = "red";
                ctx.strokeStyle = "red";
            } 
            else if (portal.timer.time.hours == 0 && portal.timer.time.mins > 10) {
                ctx.fillStyle = "orange";
                ctx.strokeStyle = "orange";
            }
            else {
                ctx.fillStyle = "#FFF";
                ctx.strokeStyle = "#FFF";
            }
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(timeDisplay, xm + (timeDisplay.length / 2), ym + timeDisplay.length);
            ctx.closePath();
            parentPortal.node.Update()
        }
        portal.node.Update()
        if(portal.connections.length > 0){
            recursivelyUpdatePortals(portal.connections, portal)
        }
    })
}

const recursivelyAddPortals = (portals, from = null, to = null) => {
    portals.map(portal => {
        if(portal.node.name.toLowerCase() == to.toLowerCase()){
            const newPortal = {
                node: new Node(50, 50, 50, 50, from, null, 'black'),
                connections: [],
                timer: {
                    enabled: true,
                    time: {
                        hours: 2,
                        mins: 30
                    }
                }
            }
            portal.connections.push(newPortal)
            return
        }
        if(portal.connections.length > 0){
            recursivelyAddPortals(portal.connections, from, to)
        }
    })
}

const recursivelyRemovePortals = (portals, parent = null, from = null, to = null) => {
    portals.map(portal => {
        if(
            (
                (portal.node.name.toLowerCase() == from.toLowerCase() && parent.node.name.toLowerCase() == to.toLowerCase()) ||
                (portal.node.name.toLowerCase() == from.toLowerCase() && portal.timer.enabled && portal.timer.time.hours == 0 && portal.timer.time.mins == 0) || 
                (portal.timer.enabled && portal.timer.time.hours == 0 && portal.timer.time.mins == 0 && portal.connections.length == 0)
            )
        ){
            portals.splice(portals.indexOf(portal), 1)
            return
        }
        if(portal.connections.length > 0){
            recursivelyRemovePortals(portal.connections, portal, from, to)
        }
    })
}

const recursivelyUpdateTimers = (portals) => {
    portals.map(portal => {
        if(portal.timer.enabled){
            if(portal.timer.time.hours > 0){
                if(portal.timer.time.mins > 0){
                    portal.timer.time.mins--
                } else {
                    portal.timer.time.mins = 59
                    portal.timer.time.hours--
                }
            }
            else if (portal.timer.time.mins > 0){
                portal.timer.time.mins--
            }
            else {
                portal.timer.time.hours = 0
                portal.timer.time.mins = 0
            }
        }
        portal.node.Update()
        if(portal.connections.length > 0){
            recursivelyUpdateTimers(portal.connections)
        }
    })
}

const main = () => {
    requestAnimationFrame(main)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    recursivelyUpdatePortals(portals)
}

setInterval(() => {
    recursivelyUpdateTimers(portals)
    recursivelyRemovePortals(portals, null, '', '')
}, 100)

main()