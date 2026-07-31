// ============================================
// CUSTOM CURSOR
// ============================================

export function initCursor() {
  const cursor = document.getElementById('cursor')
  const dot = document.getElementById('cursorDot')
  const ring = document.getElementById('cursorRing')
  if (!cursor || !dot || !ring) return

  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let ringX = mouseX
  let ringY = mouseY

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = `${mouseX}px`
    dot.style.top = `${mouseY}px`
  })

  // Smooth ring follow via rAF
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18
    ringY += (mouseY - ringY) * 0.18
    ring.style.left = `${ringX}px`
    ring.style.top = `${ringY}px`
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Hover state on interactive elements
  const hoverSelector = 'a, button, [data-magnetic], .watch-card, .viewer__canvas, .viewer__controls-swatch, .nav__icon-btn'
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) cursor.classList.add('is-hovering')
  })
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) cursor.classList.remove('is-hovering')
  })

  document.addEventListener('mousedown', () => cursor.classList.add('is-down'))
  document.addEventListener('mouseup', () => cursor.classList.remove('is-down'))
}
