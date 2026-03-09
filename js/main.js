document.addEventListener('DOMContentLoaded', () => {
    initApp()
})

function initApp() {
    setupNavigation()
    setupButton()
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a')
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const targetId = link.getAttribute('href')
            const targetSection = document.querySelector(targetId)
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetSection,
                    ease: "power2.inOut"
                })
            }
        })
    })
}

function setupButton() {
    const actionBtn = document.getElementById('actionBtn')
    
    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about')
            if (aboutSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: aboutSection,
                    ease: "power2.inOut"
                })
            }
        })
    }
}
