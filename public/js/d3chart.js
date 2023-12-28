const chart = (
        data, 
        config = {
            width: document.getElementById("map").clientWidth,
            height: document.getElementById("map").clientHeight,
            radius: 20,
            link: {
                distance: 200,
                strokeWidth: 2
            }
        }
) => {
    // Specify the dimensions of the chart.
    const width = config.width;
    const height = config.height;
  
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));
  
    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(d => config.link.distance))
        .force("charge", d3.forceManyBody().strength(-5000))
        .force("x", d3.forceX())
        .force("y", d3.forceY());
  
    // Create the SVG container.
    let svg
    if(document.getElementById("map").children.length > 0){
        svg = d3.selectAll("svg")
        svg.selectAll("g").remove()
        svg.selectAll("text").remove()
    } else {
        svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;")
        .attr("id", "viewBox")
    }

  
    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", config.link.strokeWidth);
  
    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", config.radius)
        .attr("fill", d => d.color);

    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("fill", "#fff")
        .attr("stroke", "#none")
        .style("text-anchor", "middle")
        .text(d => d.id);

    const timer = svg.append("g")
        .selectAll("text")
        .data(links)
        .join("text")
        .attr("fill", "#fff")
        .attr("stroke", "#none")
        .style("text-anchor", "middle")
        .text(d => d.time.h + 'h ' + d.time.m + 'm');
  
    // Add a drag behavior.
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    
    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        
        label
            .attr("x", d => d.x)
            .attr("y", d => d.y - 25);

        timer
            .attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
    });
  
    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
  
    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
  
    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  
    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    //invalidation.then(() => simulation.stop());
  
    return svg.node();
}

const data = {
    nodes: [
        {
            id: "SSQ",
            type: "Hide-Out",
            color: "#ff0000"
        },
        {
            id: "Thetford",
            type: "City",
            color: "#7932a8"
        },
        {
            id: "Martlock",
            type: "City",
            color: "#325ea8"
        },
        {
            id: "Bridgewatch",
            type: "City",
            color: "#a86032"
        },
        {
            id: "Lymhurst",
            type: "City",
            color: "#32a844"
        },
        {
            id: "Fort Sterling",
            type: "City",
            color: "#c8ccc9"
        },
    ],
    links: [
        {
            source: "Thetford",
            target: "SSQ",
            time: {
                h: 1,
                m: 30
            }
        },
        {
            source: "Fort Sterling",
            target: "Thetford",
            time: {
                h: 2,
                m: 30
            }
        },
        {
            source: "Martlock",
            target: "SSQ",
            time: {
                h: 3,
                m: 30
            }
        },
        {
            source: "Bridgewatch",
            target: "Martlock",
            time: {
                h: 4,
                m: 30
            }
        },
        {
            source: "Lymhurst",
            target: "Martlock",
            time: {
                h: 5,
                m: 30
            }
        },
    ]
}

let c = chart(data)
const map = document.getElementById("map")
map.appendChild(c)

const viewBox = document.getElementById('viewBox')

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
let viewBoxOrigin = {
    x: viewBox.getAttribute('viewBox').split(",")[0],
    y: viewBox.getAttribute('viewBox').split(",")[1]
}

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
    mouse.x.current = e.clientX
    mouse.y.current = e.clientY
    if(isGrabbing){
        xDiff = -(mouse.x.current - mouse.x.init) 
        yDiff = -(mouse.y.current - mouse.y.init)
        mouse.x.init = e.clientX
        mouse.y.init = e.clientY
        let viewBoxData = viewBox.getAttribute('viewBox').split(",")
        viewBoxData[0] = parseInt(viewBoxData[0]) + xDiff
        viewBoxData[1] = parseInt(viewBoxData[1]) + yDiff
        viewBox.setAttribute('viewBox', viewBoxData.join(','))
    }
})