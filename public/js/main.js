const inputs = document.getElementById('input');
const menuBtn = document.getElementById('menuBtn');
const form = document.getElementById('form');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
menuBtn.addEventListener('click', () => {
    if(inputs.style.display === 'flex') {
        inputs.style.display = 'none';
        menuBtn.style.transform = 'rotate(0deg)';
    } else {
        inputs.style.display = 'flex';
        menuBtn.style.transform = 'rotate(-180deg)';
    }
})

const from = document.getElementById('from');
from.addEventListener("focus", (e) => {
    const div = document.createElement('div');
    div.classList.add('list');
    div.id = 'fromList';
    div.style.width = from.offsetWidth + 'px';

    const flex = document.createElement('div');
    flex.classList.add('flex');
    for(let i = 0; i < zones.length; i++) {
        let nameOfZone = zones[i].name
        let span = document.createElement('span');
        span.innerHTML = nameOfZone
        span.classList.add('listItem')
        span.addEventListener('click', () => {
            from.value = nameOfZone
            const fromList = document.getElementById('fromList');
            fromList.remove()
        })
        flex.appendChild(span)
    }

    div.appendChild(flex)

    form.insertBefore(div, document.getElementById('fromBr'));
})
from.addEventListener("keyup", (e) => {
    const fromList = document.getElementById('fromList');
    fromList.innerHTML = ''
    const flex = document.createElement('div');
    flex.classList.add('flex');
    zones.filter(z => z.name.toLocaleLowerCase().includes(from.value.toLocaleLowerCase())).map(z => {
        let nameOfZone = z.name
        let span = document.createElement('span');
        span.innerHTML = nameOfZone
        span.classList.add('listItem')
        span.addEventListener('click', () => {
            from.value = nameOfZone
            const fromList = document.getElementById('fromList');
            fromList.remove()
        })
        flex.appendChild(span)
    })
    fromList.appendChild(flex)
})
from.addEventListener("blur", (e) => {
    setTimeout(()=>{
        const fromList = document.getElementById('fromList');
        if(fromList){
            fromList.remove()
        }
    }, 100)
})


const to = document.getElementById('to');
to.addEventListener("focus", (e) => {
    const div = document.createElement('div');
    div.classList.add('list');
    div.id = 'toList';
    div.style.width = to.offsetWidth + 'px';

    const flex = document.createElement('div');
    flex.classList.add('flex');
    for(let i = 0; i < zones.length; i++) {
        let nameOfZone = zones[i].name
        let span = document.createElement('span');
        span.innerHTML = nameOfZone
        span.classList.add('listItem')
        span.addEventListener('click', () => {
            to.value = nameOfZone
            const toList = document.getElementById('toList');
            toList.remove()
        })
        flex.appendChild(span)
    }

    div.appendChild(flex)

    form.insertBefore(div, document.getElementById('toBr'));
})
to.addEventListener("keyup", (e) => {
    const toList = document.getElementById('toList');
    toList.innerHTML = ''
    const flex = document.createElement('div');
    flex.classList.add('flex');
    zones.filter(z => z.name.toLocaleLowerCase().includes(to.value.toLocaleLowerCase())).map(z => {
        let nameOfZone = z.name
        let span = document.createElement('span');
        span.innerHTML = nameOfZone
        span.classList.add('listItem')
        span.addEventListener('click', () => {
            to.value = nameOfZone
            const toList = document.getElementById('toList');
            toList.remove()
        })
        flex.appendChild(span)
    })
    toList.appendChild(flex)
})
to.addEventListener("blur", (e) => {
    setTimeout(()=>{
        const toList = document.getElementById('toList');
        if(toList){
            toList.remove()
        }
    }, 100)
})

addBtn.addEventListener('click', () => {
    const from = document.getElementById('from').value
    const to = document.getElementById('to').value
    const hours = document.getElementById('hours').value
    const mins = document.getElementById('mins').value

    recursivelyAddPortals(portals, from, to)
})

removeBtn.addEventListener('click', () => {
    const from = document.getElementById('from').value
    const to = document.getElementById('to').value

    recursivelyRemovePortals(portals, null, from, to)
})