let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.button-down').addEventListener('click', function() {
        console.log('click')
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    })
})