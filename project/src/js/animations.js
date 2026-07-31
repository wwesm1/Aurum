// ============================================
// SCROLL ANIMATIONS — GSAP + ScrollTrigger
// ============================================

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  // Count-up stats
  const counters = document.querySelectorAll('[data-count]')
  counters.forEach((el) => {
    const target = parseInt(el.dataset.count, 10)
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'expo.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString()
          },
        })
      },
    })
  })

  // Generic reveal for [data-animate]
  document.querySelectorAll('[data-animate]').forEach((el) => {
    gsap.set(el, { opacity: 0, y: 40 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
      },
    })
  })

  // Story timeline steps — alternating reveal
  document.querySelectorAll('.story__step').forEach((step) => {
    const text = step.querySelector('.story__step-text')
    const img = step.querySelector('.story__step-img')
    const dot = step.querySelector('.story__step-dot')

    gsap.set(text, { opacity: 0, x: -40 })
    gsap.set(img, { opacity: 0, x: 40, scale: 0.95 })
    gsap.set(dot, { scale: 0 })

    ScrollTrigger.create({
      trigger: step,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(text, { opacity: 1, x: 0, duration: 1, ease: 'expo.out' })
        gsap.to(img, { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'expo.out', delay: 0.15 })
        gsap.to(dot, { scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.3 })
      },
    })
  })

  // Feature items — image clip reveal
  document.querySelectorAll('.features__item').forEach((item) => {
    const media = item.querySelector('.features__item-media')
    const text = item.querySelector('.features__item-text')
    const img = media ? media.querySelector('img') : null

    if (img) gsap.set(img, { scale: 1.2 })
    gsap.set(media, { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set(text, { opacity: 0, y: 50 })

    ScrollTrigger.create({
      trigger: item,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out' })
        gsap.to(img, { scale: 1, duration: 1.4, ease: 'expo.out' })
        gsap.to(text, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.2 })
      },
    })
  })

  // Collection cards stagger
  const cards = document.querySelectorAll('.watch-card')
  if (cards.length) {
    gsap.set(cards, { opacity: 0, y: 60 })
    ScrollTrigger.create({
      trigger: '.collections__grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1 })
      },
    })
  }

  // Testimonials stagger
  const testimonials = document.querySelectorAll('.testimonial')
  if (testimonials.length) {
    gsap.set(testimonials, { opacity: 0, y: 50 })
    ScrollTrigger.create({
      trigger: '.testimonials__grid',
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(testimonials, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.12 })
      },
    })
  }

  // Gallery items fade in
  const galleryItems = document.querySelectorAll('.gallery__item')
  if (galleryItems.length) {
    gsap.set(galleryItems, { opacity: 0, y: 30 })
    ScrollTrigger.create({
      trigger: '.gallery__grid',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(galleryItems, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 })
      },
    })
  }

  // Section headings split + reveal
  document.querySelectorAll('.h-section').forEach((h) => {
    if (h.closest('.hero')) return
    Splitting({ target: h, by: 'words' })
    const words = h.querySelectorAll('.word')
    if (words.length) {
      gsap.set(words, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: h,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(words, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 })
        },
      })
    }
  })

  // Parallax on story images
  document.querySelectorAll('.story__step-img img').forEach((img) => {
    gsap.fromTo(img,
      { y: -20 },
      {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.story__step'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })

  // Footer giant text parallax
  const giant = document.querySelector('.footer__giant')
  if (giant) {
    gsap.to(giant, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }

  // Video section content reveal
  const videoContent = document.querySelector('.video__content')
  if (videoContent) {
    gsap.fromTo(videoContent,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.video', start: 'top 60%', once: true },
      }
    )
  }
}
