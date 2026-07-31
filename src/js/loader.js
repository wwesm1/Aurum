// ============================================
// LOADER — Luxury loading screen
// ============================================

export function initLoader(onComplete) {
  const loader = document.getElementById('loader')
  const bar = document.getElementById('loaderBar')
  const count = document.getElementById('loaderCount')
  const brand = document.getElementById('loaderBrand')

  // Split brand into chars for stagger reveal
  if (brand) {
    const text = brand.textContent
    brand.innerHTML = ''
    text.split('').forEach((c, i) => {
      const span = document.createElement('span')
      span.className = 'char'
      span.textContent = c === ' ' ? '\u00A0' : c
      span.style.transitionDelay = `${i * 0.06}s`
      brand.appendChild(span)
    })
  }

  let progress = 0
  const tick = () => {
    progress += Math.random() * 18 + 6
    if (progress >= 100) progress = 100
    if (bar) bar.style.width = `${progress}%`
    if (count) count.textContent = `${Math.floor(progress)}%`

    if (progress < 100) {
      setTimeout(tick, 180 + Math.random() * 220)
    } else {
      setTimeout(() => {
        // Reveal brand chars
        const chars = brand ? brand.querySelectorAll('.char') : []
        chars.forEach((ch) => {
          ch.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)'
          ch.style.transform = 'translateY(0)'
        })
        setTimeout(() => {
          loader.classList.add('is-done')
          onComplete && onComplete()
        }, 500)
      }, 300)
    }
  }

  // Start after a brief beat so the chars animate from hidden
  setTimeout(() => {
    const chars = brand ? brand.querySelectorAll('.char') : []
    chars.forEach((ch) => {
      ch.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)'
      ch.style.transform = 'translateY(0)'
    })
    tick()
  }, 200)
}
