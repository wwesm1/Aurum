import { COLLECTION, TESTIMONIALS, GALLERY } from './data.js'

export function renderContent() {
  // Collection cards
  const grid = document.getElementById('collectionsGrid')
  if (grid) {
    grid.innerHTML = COLLECTION.map((c) => `
      <article class="watch-card" data-id="${c.id}">
        <div class="watch-card__shine"></div>
        <div class="watch-card__media">
          <span class="watch-card__badge">${c.badge}</span>
          <img src="${c.img}" alt="${c.name}" loading="lazy" />
        </div>
        <div class="watch-card__body">
          <h3 class="watch-card__name">${c.name}</h3>
          <p class="watch-card__desc">${c.desc}</p>
          <div class="watch-card__footer">
            <span class="watch-card__price">$${c.price.toLocaleString()}</span>
            <button class="watch-card__add" aria-label="Add ${c.name} to cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('')
  }

  const tGrid = document.getElementById('testimonialsGrid')
  if (tGrid) {
    tGrid.innerHTML = TESTIMONIALS.map((t) => `
      <figure class="testimonial">
        <div class="testimonial__stars">
          ${Array(5).fill().map(() => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>').join('')}
        </div>
        <blockquote class="testimonial__quote">"${t.quote}"</blockquote>
        <figcaption class="testimonial__author">
          <img class="testimonial__author-avatar" src="${t.avatar}" alt="${t.name}" loading="lazy" />
          <div class="testimonial__author-info">
            <strong>${t.name}</strong>
            <span>${t.role}</span>
          </div>
        </figcaption>
      </figure>
    `).join('')
  }

  const gGrid = document.getElementById('galleryGrid')
  if (gGrid) {
    gGrid.innerHTML = GALLERY.map((src) => `
      <div class="gallery__item">
        <img src="${src}" alt="Luxury watch detail" loading="lazy" />
      </div>
    `).join('')
  }
}
