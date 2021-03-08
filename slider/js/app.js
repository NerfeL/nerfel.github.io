const container = document.querySelector('.container')
let sliderLine = document.querySelector('.slider')
const items = document.querySelectorAll('.item') 
let itemWidth = container.clientWidth
const movePosition = itemWidth
let block = false
items.forEach( item => {
	item.style.minWidth = `${itemWidth}px`
})
let destPosition = 0

for(let i = 0; i < items.length; i++) {
	items[i].setAttribute('data-num', i)
	items[i].setAttribute('data-originpos', `${(i + 1) * -movePosition}`)
}

let cloneOfLast = sliderLine.lastElementChild.cloneNode(true)
let cloneOfFirst = sliderLine.firstElementChild.cloneNode(true)
cloneOfLast.classList.add("clone")
cloneOfFirst.classList.add("clone")
sliderLine.prepend(cloneOfLast)
sliderLine.append(cloneOfFirst)
destPosition = -movePosition
sliderLine.style.left = `${destPosition}px`

let itemsWithClones = sliderLine.querySelectorAll('.item')
for(let i = 0; i < sliderLine.querySelectorAll('.item').length; i++) {
	itemsWithClones[i].setAttribute('data-realpos', `${i * -movePosition}`)
}
function move(speed, side) { // (side) true - вправо, false - влево
	speed = parseInt(speed)
	if(!block) {
		let prevPosition = destPosition
		if(side) {
			destPosition -= movePosition
		}
		else {
			destPosition += movePosition
		}
		block = true
		let Timer = setInterval(function() {
			if((prevPosition >= destPosition && !side) || (prevPosition <= destPosition && side)) {
				clearInterval(Timer)
				let currentDestElement = sliderLine.querySelector(`[data-realpos="${destPosition}"]`)
				destPosition = parseInt(currentDestElement.getAttribute('data-originpos'))
				sliderLine.style.left = destPosition + 'px'
				updateDots(currentDestElement.getAttribute('data-num'))
				block = false
			}
			else {
				side ? prevPosition -= speed : prevPosition += speed
				sliderLine.style.left = `${prevPosition}px`
			}
		}, 1)		
	}
}

document.querySelector('.arrow.left').addEventListener('click', () => move(5, false) )
document.querySelector('.arrow.right').addEventListener('click', () => move(5, true))

function updateDots(num) {
	let navs = document.querySelectorAll('.nav-dots .dot')
	navs.forEach(dot => dot.classList.remove('active'))
	navs[num].classList.add('active')
}

const countDots = items.length
const dotContainer = container.querySelector('.nav-dots')
for (let i = 0; i < countDots; i++) {
	let div = document.createElement('div')
	div.className = "dot"
	div.setAttribute('data-index', i)
	if(i == 0) {div.classList.add("active")}
	dotContainer.append(div)
	div.addEventListener("click", function() {

		let prevBulletIndex = (Array.from(document.querySelectorAll('.nav-dots .dot')).find(el => el.classList.contains("active")).getAttribute("data-index"))
		if(prevBulletIndex > i) { // двигаемся влево
			if(!block) {
				block = true
				let prevPosition = destPosition
				destPosition += (prevBulletIndex - i) * movePosition
				// console.log("влево на ", prevBulletIndex - i, "слайд(ов) на ", (prevBulletIndex - i) * movePosition, "пикселей")
				// console.log(prevPosition)
				// console.log(destPosition)
				let prevBulletTimer = setInterval(function() {
					if(prevPosition >= destPosition) {
						clearInterval(prevBulletTimer)
						destPosition = parseInt(sliderLine.querySelector(`[data-realpos="${destPosition}"]`).getAttribute('data-originpos'))
						sliderLine.style.left = sliderLine.querySelector(`[data-realpos="${destPosition}"]`).getAttribute('data-originpos') + 'px'
						updateDots(i)
						block = false
					}
					else {
						prevPosition += 20
						sliderLine.style.left = `${prevPosition}px`
					}
				}, 1)
			}
		}
		else if(prevBulletIndex == i) {
			// console.log("никуда не полетим")
		}
		else { // двигаемся вправо
			if(!block) {
				block = true
				let prevPosition = destPosition
				destPosition -= (i - prevBulletIndex) * movePosition
				// console.log("вправо на ", i - prevBulletIndex, "слайд(ов) на ", (i - prevBulletIndex) * movePosition, "пикселей")
				// console.log(prevPosition)
				// console.log(destPosition)
				let nextBulletTimer = setInterval(function() {
					if(prevPosition <= destPosition) {
						clearInterval(nextBulletTimer)
						destPosition = parseInt(sliderLine.querySelector(`[data-realpos="${destPosition}"]`).getAttribute('data-originpos'))
						sliderLine.style.left = sliderLine.querySelector(`[data-realpos="${destPosition}"]`).getAttribute('data-originpos') + 'px'
						updateDots(i)
						block = false
					}
					else {
						prevPosition -= 20
						sliderLine.style.left = `${prevPosition}px`
					}
				}, 1)
			}
		}
	})
}