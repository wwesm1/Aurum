// ============================================
// CART — drawer, add-to-cart fly animation, checkout
// ============================================

import gsap from 'gsap'
import { COLLECTION } from './data.js'

const state = {
  items: [], // {id, name, price, img, qty}
}

const fmt = (n) => `$${n.toLocaleString()}`

export function initCart() {
  const cartBtn = document.getElementById('cartBtn')
  const cartClose = document.getElementById('cartClose')
  const cart = document.getElementById('cart')
  const overlay = document.getElementById('cartOverlay')
  const checkoutBtn = document.getElementById('checkoutBtn')
  const checkout = document.getElementById('checkout')
  const checkoutClose = document.getElementById('checkoutClose')
  const checkoutForm = document.getElementById('checkoutForm')
  const checkoutSuccess = document.getElementById('checkoutSuccess')

  const openCart = () => {
    cart.classList.add('is-open')
    overlay.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }
  const closeCart = () => {
    cart.classList.remove('is-open')
    overlay.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  cartBtn && cartBtn.addEventListener('click', openCart)
  cartClose && cartClose.addEventListener('click', closeCart)
  overlay && overlay.addEventListener('click', closeCart)

  // Checkout
  const openCheckout = () => {
    if (!state.items.length) return
    renderSummary()
    checkout.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }
  const closeCheckout = () => {
    checkout.classList.remove('is-open')
    document.body.style.overflow = ''
    setTimeout(() => {
      checkoutForm.classList.remove('hidden')
      checkoutSuccess.classList.add('hidden')
    }, 400)
  }
  checkoutBtn && checkoutBtn.addEventListener('click', openCheckout)
  checkoutClose && checkoutClose.addEventListener('click', closeCheckout)
  checkout && checkout.addEventListener('click', (e) => {
    if (e.target === checkout) closeCheckout()
  })

  // Submit
  checkoutForm && checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault()
    checkoutForm.classList.add('hidden')
    checkoutSuccess.classList.remove('hidden')
    // Clear cart
    state.items = []
    renderCart()
    setTimeout(() => closeCheckout(), 2600)
  })

  // Card number formatting
  const coCard = document.getElementById('coCard')
  if (coCard) {
    coCard.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '')
      v = v.match(/.{1,4}/g)?.join(' ') || ''
      e.target.value = v
    })
  }

  // Delegate add-to-cart clicks
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.watch-card__add')
    if (addBtn) {
      const card = addBtn.closest('.watch-card')
      const id = card.dataset.id
      const item = COLLECTION.find((c) => c.id === id)
      if (item) addToCart(item, addBtn, card)
    }
  })

  // Delegate qty + remove
  document.getElementById('cartItems').addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]')
    const dec = e.target.closest('[data-dec]')
    const rm = e.target.closest('[data-remove]')
    if (inc) changeQty(inc.dataset.inc, 1)
    if (dec) changeQty(dec.dataset.dec, -1)
    if (rm) removeItem(rm.dataset.remove)
  })

  renderCart()
}

function addToCart(item, btn, card) {
  const existing = state.items.find((i) => i.id === item.id)
  if (existing) existing.qty++
  else state.items.push({ ...item, qty: 1 })

  // Fly animation
  const cardImg = card.querySelector('img')
  const cartBtnEl = document.getElementById('cartBtn')
  if (cardImg && cartBtnEl) {
    const start = cardImg.getBoundingClientRect()
    const end = cartBtnEl.getBoundingClientRect()
    const clone = cardImg.cloneNode(true)
    clone.className = 'fly-clone'
    clone.style.left = `${start.left}px`
    clone.style.top = `${start.top}px`
    clone.style.width = `${start.width}px`
    clone.style.height = `${start.height}px`
    document.body.appendChild(clone)
    gsap.to(clone, {
      left: end.left + end.width / 2 - 20,
      top: end.top + end.height / 2 - 20,
      width: 40,
      height: 40,
      opacity: 0.3,
      duration: 0.8,
      ease: 'expo.in',
      onComplete: () => {
        clone.remove()
        // Cart bump
        gsap.fromTo(cartBtnEl, { scale: 1 }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 })
      },
    })
  }

  renderCart()
  // Brief open hint
  const cart = document.getElementById('cart')
  if (!cart.classList.contains('is-open')) {
    gsap.fromTo(cart, { x: 40 }, { x: 0, duration: 0.4, ease: 'expo.out' })
  }
}

function changeQty(id, delta) {
  const item = state.items.find((i) => i.id === id)
  if (!item) return
  item.qty += delta
  if (item.qty <= 0) state.items = state.items.filter((i) => i.id !== id)
  renderCart()
}

function removeItem(id) {
  state.items = state.items.filter((i) => i.id !== id)
  renderCart()
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems')
  const countEl = document.getElementById('cartCount')
  const totalEl = document.getElementById('cartTotal')

  const totalQty = state.items.reduce((s, i) => s + i.qty, 0)
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  if (countEl) countEl.textContent = `(${totalQty})`
  if (totalEl) totalEl.textContent = fmt(total)

  if (!state.items.length) {
    itemsEl.innerHTML = `
      <div class="cart__empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your selection awaits</p>
      </div>`
    return
  }

  itemsEl.innerHTML = state.items.map((i) => `
    <div class="cart__item">
      <img class="cart__item-img" src="${i.img}" alt="${i.name}" />
      <div class="cart__item-info">
        <h4>${i.name}</h4>
        <span>${fmt(i.price)}</span>
        <div class="cart__item-qty">
          <button data-dec="${i.id}" aria-label="Decrease">−</button>
          <span>${i.qty}</span>
          <button data-inc="${i.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <button class="cart__item-remove" data-remove="${i.id}" aria-label="Remove">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `).join('')
}

function renderSummary() {
  const el = document.getElementById('checkoutSummary')
  if (!el) return
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  el.innerHTML = state.items.map((i) => `
    <div><span>${i.name} × ${i.qty}</span><span>${fmt(i.price * i.qty)}</span></div>
  `).join('') + `<div class="total"><span>Total</span><span>${fmt(total)}</span></div>`
}
