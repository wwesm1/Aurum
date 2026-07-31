// ============================================
// MAGNETIC BUTTONS + RIPPLE
// ============================================

export function initMagnetic() {
  const els = document.querySelectorAll('[data-magnetic]')
  els.forEach((el) => {
    const strength = 0.35
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    })
    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
    })
  })

  // Ripple effect on .btn
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect()
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`
      btn.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    })
  })
}
