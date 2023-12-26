const portals = [
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