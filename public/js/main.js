const inputs = document.getElementById('input');
const menuBtn = document.getElementById('menuBtn');
const recenterBtn = document.getElementById('recenterBtn');
const form = document.getElementById('form');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const clearBtn = document.getElementById('clearBtn');
menuBtn.addEventListener('click', () => {
    if(inputs.style.display === 'flex') {
        inputs.style.display = 'none';
        menuBtn.style.transform = 'rotate(0deg)';
    } else {
        inputs.style.display = 'flex';
        menuBtn.style.transform = 'rotate(-180deg)';
    }
})
recenterBtn.addEventListener('click', () => {
    let viewBoxData = viewBox.getAttribute('viewBox').split(",")
    viewBoxData[0] = viewBoxOrigin.x
    viewBoxData[1] = viewBoxOrigin.y
    viewBox.setAttribute('viewBox', viewBoxData.join(','))
})

clearBtn.addEventListener('click', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    from.value = ''
    to.value = ''
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    hours.value = ''
    minutes.value = ''
    const fromList = document.getElementById('fromList');
    const toList = document.getElementById('toList');
    if(fromList){
        fromList.remove()
    }
    if(toList){
        toList.remove()
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
    //Call API and redraw on response
})

removeBtn.addEventListener('click', () => {
    //Call API and redraw on response
})

zones.sort((a,b) => a.name < b.name ? -1 : 1)