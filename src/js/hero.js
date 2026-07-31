// ============================================
// HERO — particles, parallax, split text
// ============================================

import gsap from 'gsap'
import Splitting from 'splitting'

export function initHero() {
  // Generate dust particles
  const container = document.getElementById('heroParticles')
  if (container) {
    for (let i = 0; i < 28; i++) {
      const dust = document.createElement('span')
      dust.className = 'dust'
      dust.style.left = `${Math.random() * 100}%`
      dust.style.top = `${Math.random() * 100}%`
      dust.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`)
      dust.style.setProperty('--dy', `${(Math.random() - 0.5) * 200}px`)
      dust.style.animationDuration = `${8 + Math.random() * 10}s`
      dust.style.animationDelay = `${Math.random() * 8}s`
      dust.style.opacity = `${0.3 + Math.random() * 0.4}`
      container.appendChild(dust)
    }
  }

  // Split title text
  const title = document.getElementById('heroTitle')
  if (title) {
    Splitting({ target: title, by: 'chars' })
  }

  // Entrance timeline
  const tl = gsap.timeline({ delay: 0.2 })

  // Title chars
  const chars = title ? title.querySelectorAll('.char') : []
  if (chars.length) {
    tl.fromTo(chars,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.03 },
      0.3
    )
  }

  // Eyebrow, subtitle, actions, scroll
  tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0.5)
    .fromTo('.hero__eyebrow', { y: 20 }, { y: 0, duration: 0.8, ease: 'expo.out' }, 0.5)
    .to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, 0.8)
    .fromTo('.hero__subtitle', { y: 24 }, { y: 0, duration: 0.9, ease: 'expo.out' }, 0.8)
    .to('.hero__actions', { opacity: 1, duration: 0.8, ease: 'expo.out' }, 1.0)
    .fromTo('.hero__actions .btn', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.12 }, 1.0)
    .to('.hero__scroll', { opacity: 1, duration: 1, ease: 'expo.out' }, 1.3)

  // Watch float + mouse parallax
  const watch = document.getElementById('heroWatch')
  const watchImg = document.getElementById('heroWatchImg')
  if (watch && watchImg) {
    // Entrance
    gsap.fromTo(watch,
      { scale: 0.6, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1.6, ease: 'expo.out', delay: 0.4 }
    )

    // Mouse parallax
    let targetX = 0, targetY = 0, curX = 0, curY = 0
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = ((e.clientX - cx) / cx) * 20
      targetY = ((e.clientY - cy) / cy) * 20
    })
    const parallax = () => {
      curX += (targetX - curX) * 0.06
      curY += (targetY - curY) * 0.06
      watch.style.transform = `translate(${curX}px, ${curY}px)`
      requestAnimationFrame(parallax)
    }
    parallax()
  }
}
