// GSAP Setup - централизованная настройка
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Глобальные настройки ScrollTrigger
ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    markers: false
})

// Настройки для плавности анимаций
gsap.defaults({
    ease: "power2.out",
    duration: 0.8
})

// Адаптивные настройки
ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function() {
        // Desktop анимации будут добавляться в scroll-scenes.js
    },
    "(max-width: 1023px)": function() {
        // Mobile анимации будут добавляться в scroll-scenes.js
    }
})

console.log("GSAP initialized:", gsap.version)
