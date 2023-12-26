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
        node: new Node((canvas.width/2) - 50, (canvas.height/2) - 50, 50, 50, 'SSQ', null, 'red'),
        connections: [
            {
                node: new Node((canvas.width/2) - 50, (canvas.height/2) - 150, 50, 50, 'Thetford', null, 'purple'),
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
                node: new Node((canvas.width/2) - 250, (canvas.height/2) - 250, 50, 50, 'Martlock', null, 'blue'),
                connections: [
                    {
                        node: new Node((canvas.width/2) - 350, (canvas.height/2) - 150, 50, 50, 'Bridgewatch', null, 'orange'),
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
                        node: new Node((canvas.width/2) - 450, (canvas.height/2) - 250, 50, 50, 'Lymhurst', null, 'green'),
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
        if(parentPortal != null){
            ctx.beginPath()
            ctx.strokeStyle = "#FFF"
            ctx.fillStyle = "#FFF"
            ctx.moveTo(portal.node.x + (portal.node.w/2), portal.node.y + (portal.node.h/2))
            ctx.lineTo(parentPortal.node.x + (parentPortal.node.w/2), parentPortal.node.y + (parentPortal.node.h/2))
            ctx.stroke()
            ctx.closePath()
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
        if(portal.node.name.toLowerCase() == from.toLowerCase() && parent.node.name.toLowerCase() == to.toLowerCase()){
            portals.splice(portals.indexOf(portal), 1)
            return
        }
        if(portal.connections.length > 0){
            recursivelyRemovePortals(portal.connections, portal, from, to)
        }
    })
}

const main = () => {
    requestAnimationFrame(main)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    recursivelyUpdatePortals(portals)
}

main()