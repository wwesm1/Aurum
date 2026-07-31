// ============================================
// 360 VIEWER — drag rotate, zoom, finish/strap switch
// ============================================

import gsap from 'gsap'
import { VIEWER_FINISHES, VIEWER_MOVEMENT } from './data.js'

export function initViewer() {
  const canvas = document.getElementById('viewerCanvas')
  const watch = document.getElementById('viewerWatch')
  const zoomSlider = document.getElementById('zoomSlider')
  const finishSwatches = document.getElementById('finishSwatches')
  const strapSwatches = document.getElementById('strapSwatches')
  const movementToggle = document.getElementById('movementToggle')
  if (!canvas || !watch) return

  let rotation = 0
  let scale = 1
  let isDragging = false
  let startX = 0
  let startRot = 0
  let autoRotate = true
  let movementOpen = false

  const apply = () => {
    watch.style.transform = `rotateY(${rotation}deg) scale(${scale})`
  }

  // Auto rotate loop
  const autoLoop = () => {
    if (autoRotate && !isDragging) {
      rotation += 0.2
      apply()
    }
    requestAnimationFrame(autoLoop)
  }
  autoLoop()

  // Drag
  const onDown = (e) => {
    isDragging = true
    autoRotate = false
    startX = (e.touches ? e.touches[0].clientX : e.clientX)
    startRot = rotation
    canvas.style.cursor = 'grabbing'
  }
  const onMove = (e) => {
    if (!isDragging) return
    const x = (e.touches ? e.touches[0].clientX : e.clientX)
    rotation = startRot + (x - startX) * 0.5
    apply()
  }
  const onUp = () => {
    if (isDragging) {
      isDragging = false
      canvas.style.cursor = 'grab'
      setTimeout(() => { autoRotate = true }, 1500)
    }
  }
  canvas.addEventListener('mousedown', onDown)
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  canvas.addEventListener('touchstart', onDown, { passive: true })
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('touchend', onUp)

  // Zoom slider
  if (zoomSlider) {
    zoomSlider.addEventListener('input', (e) => {
      scale = parseInt(e.target.value, 10) / 100
      apply()
    })
  }

  // Finish switch
  if (finishSwatches) {
    finishSwatches.querySelectorAll('.viewer__controls-swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        finishSwatches.querySelectorAll('.viewer__controls-swatch').forEach((s) => s.classList.remove('is-active'))
        sw.classList.add('is-active')
        const finish = sw.dataset.finish
        const src = VIEWER_FINISHES[finish] || VIEWER_FINISHES.obsidian
        gsap.to(watch, { opacity: 0, scale: scale * 0.9, duration: 0.3, ease: 'expo.out', onComplete: () => {
          watch.src = src
          gsap.to(watch, { opacity: 1, scale: scale, duration: 0.5, ease: 'expo.out' })
        }})
      })
    })
  }

  // Strap switch (visual feedback only — same image set)
  if (strapSwatches) {
    strapSwatches.querySelectorAll('.viewer__controls-swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        strapSwatches.querySelectorAll('.viewer__controls-swatch').forEach((s) => s.classList.remove('is-active'))
        sw.classList.add('is-active')
        gsap.fromTo(canvas, { filter: 'brightness(1.3)' }, { filter: 'brightness(1)', duration: 0.6, ease: 'expo.out' })
      })
    })
  }

  // Reveal movement toggle
  if (movementToggle) {
    movementToggle.addEventListener('click', () => {
      movementOpen = !movementOpen
      movementToggle.classList.toggle('is-on', movementOpen)
      gsap.to(watch, { opacity: 0, scale: scale * 0.9, duration: 0.3, ease: 'expo.out', onComplete: () => {
        watch.src = movementOpen ? VIEWER_MOVEMENT : (VIEWER_FINISHES[document.querySelector('.viewer__controls-swatch.is-active')?.dataset.finish] || VIEWER_FINISHES.obsidian)
        gsap.to(watch, { opacity: 1, scale: scale, duration: 0.5, ease: 'expo.out' })
      }})
    })
  }
}
