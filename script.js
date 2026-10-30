// Hero modal functionality
const modal = document.getElementById('hero-modal');
const modalClose = document.getElementById('modal-close');
const heroGrid = document.getElementById('hero-grid');

let currentHero = null;

// Close modal on close button click
if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
}

// Close modal on outside click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// Add click handlers to hero cards (event delegation for dynamically created elements)
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    const cards = document.querySelectorAll('.hero-card');
    cards.forEach(card => {
      card.removeEventListener('click', handleCardClick);
      card.addEventListener('click', handleCardClick);
    });
  });

  observer.observe(heroGrid, { childList: true });
});

function handleCardClick(event) {
  const card = event.currentTarget;
  const heroData = card.dataset.hero;

  if (currentHero && currentHero === card.dataset.hero) {
    // If same card clicked, close modal
    modal.style.display = 'none';
    document.body.style.overflow = '';
    currentHero = null;
    return;
  }

  currentHero = card.dataset.hero;

  // Find the hero data from the fetched heroes
  fetch('heroes.json')
    .then(response => response.json())
    .then(data => {
      const hero = data.heroes.find(h => h.name === currentHero);
      if (!hero) return;

      // Update modal content
      const modalImage = document.getElementById('modal-hero-image');
      const modalName = document.getElementById('modal-hero-name');
      const modalRole = document.getElementById('modal-hero-role');
      const modalAbilitiesGrid = document.getElementById('modal-abilities-grid');

      if (modalImage) modalImage.src = hero.image;
      if (modalName) modalName.textContent = hero.name;
      if (modalRole) modalRole.textContent = `Роль: ${hero.role}`;
      if (modalAbilitiesGrid) {
        modalAbilitiesGrid.innerHTML = '';
        hero.abilities.forEach(ability => {
          const abilityItem = document.createElement('div');
          abilityItem.className = 'ability-item';
          abilityItem.innerHTML = `
            <span class="ability-name">${ability.name}</span>
            <img src="${ability.icon}" alt="${ability.name}" class="ability-icon">
          `;
          modalAbilitiesGrid.appendChild(abilityItem);
        });
      }

      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    })
    .catch(error => {
      console.error('Error loading hero data:', error);
    });
}

// Initial hero card click handlers (will be overridden by mutation observer on re-render)
function initCardClicks() {
  const cards = document.querySelectorAll('.hero-card');
  cards.forEach(card => {
    card.dataset.hero = card.querySelector('.hero-name')?.textContent || card.dataset.hero;
    card.addEventListener('click', handleCardClick);
  });
}

// Логика модального окна
const modal = document.getElementById('hero-modal');
const closeModal = document.getElementById('close-modal');

// Закрытие окна
closeModal.onclick = () => modal.style.display = 'none';

// Открытие окна (вызови эту функцию при клике на карточку)
function openHeroModal(hero) {
    document.getElementById('modal-img').src = hero.photo;
    document.getElementById('modal-name').textContent = hero.name;
    document.getElementById('modal-lore').textContent = hero.lore || 'Описание отсутствует';

    const abilitiesContainer = document.getElementById('modal-abilities');
    abilitiesContainer.innerHTML = '';

    if (hero.abilities) {
        hero.abilities.forEach(abil => {
            const abilDiv = document.createElement('div');
            abilDiv.innerHTML = `<img src="${abil.icon}" width="50" title="${abil.description}"><br><small>${abil.name}</small>`;
            abilitiesContainer.appendChild(abilDiv);
        });
    }
    modal.style.display = 'flex';
}