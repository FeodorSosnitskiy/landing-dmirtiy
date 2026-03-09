// Scroll Scenes - анимации при скролле

// Hero секция - анимация при загрузке
const heroTl = gsap.timeline()

heroTl
    .from(".hero-content h1", {
        y: 60,
        opacity: 0,
        duration: 1
    })
    .from(".hero-content p", {
        y: 40,
        opacity: 0,
        duration: 0.8
    }, "-=0.5")
    .from(".hero-content .btn", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.4")

// Секции с появлением при скролле
gsap.utils.toArray(".section").forEach(section => {
    const heading = section.querySelector("h2")
    const content = section.querySelector("p")
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: false
        }
    })
    
    if (heading) {
        tl.from(heading, {
            y: 50,
            opacity: 0,
            duration: 0.8
        })
    }
    
    if (content) {
        tl.from(content, {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")
    }
})

// Навигация - эффект при скролле
ScrollTrigger.create({
    start: "top -80",
    onUpdate: self => {
        const header = document.querySelector(".header")
        if (self.direction === 1) {
            header.classList.add("scrolled")
        } else {
            header.classList.remove("scrolled")
        }
    }
})
