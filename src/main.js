import './scss/main.scss'

import Lenis from 'lenis'
import { initLoader } from './js/loader.js'
import { initCursor } from './js/cursor.js'
import { initNav } from './js/nav.js'
import { initHero } from './js/hero.js'
import { initScrollAnimations } from './js/animations.js'
import { initViewer } from './js/viewer.js'
import { initMagnetic } from './js/magnetic.js'
import { initCart } from './js/cart.js'
import { renderContent } from './js/render.js'

renderContent()

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (id.length > 1) {
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -20 })
      }
    }
  })
})

initLoader(() => {
  initCursor()
  initNav(lenis)
  initHero()
  initScrollAnimations()
  initViewer()
  initMagnetic()
  initCart()
})

const newsletter = document.getElementById('newsletterForm')
if (newsletter) {
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = newsletter.querySelector('input')
    const btn = newsletter.querySelector('button')
    if (input.value) {
      input.value = ''
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>'
      setTimeout(() => {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
      }, 2500)
    }
  })
}

const videoPlay = document.getElementById('videoPlay')
const videoBg = document.getElementById('videoBg')
if (videoPlay && videoBg) {
  videoPlay.addEventListener('click', () => {
    videoBg.style.transition = 'transform 8s ease, opacity 1s ease'
    videoBg.style.transform = 'scale(1.15)'
    videoBg.style.opacity = '0.75'
    videoPlay.style.opacity = '0'
    setTimeout(() => {
      videoBg.style.transform = ''
      videoBg.style.opacity = ''
      videoPlay.style.opacity = ''
    }, 8000)
  })
}
