// ============================================
// NAVIGATION — scroll state, mega menu, search
// ============================================

export function initNav(lenis) {
  const nav = document.getElementById('nav')
  const menuBtn = document.getElementById('menuBtn')
  const menuClose = document.getElementById('menuClose')
  const megaMenu = document.getElementById('megaMenu')
  const searchBtn = document.getElementById('searchBtn')
  const searchClose = document.getElementById('searchClose')
  const searchOverlay = document.getElementById('searchOverlay')

  // Scroll state
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled')
    else nav.classList.remove('is-scrolled')
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Mega menu
  const openMenu = () => {
    megaMenu.classList.add('is-open')
    document.body.style.overflow = 'hidden'
    lenis && lenis.stop()
  }
  const closeMenu = () => {
    megaMenu.classList.remove('is-open')
    document.body.style.overflow = ''
    lenis && lenis.start()
  }
  menuBtn && menuBtn.addEventListener('click', openMenu)
  menuClose && menuClose.addEventListener('click', closeMenu)
  megaMenu && megaMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))

  // Search overlay
  const openSearch = () => {
    searchOverlay.classList.add('is-open')
    document.body.style.overflow = 'hidden'
    lenis && lenis.stop()
    setTimeout(() => document.getElementById('searchInput') && document.getElementById('searchInput').focus(), 200)
  }
  const closeSearch = () => {
    searchOverlay.classList.remove('is-open')
    document.body.style.overflow = ''
    lenis && lenis.start()
  }
  searchBtn && searchBtn.addEventListener('click', openSearch)
  searchClose && searchClose.addEventListener('click', closeSearch)
  searchOverlay && searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch()
  })

  // Escape closes overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu()
      closeSearch()
    }
  })
}
