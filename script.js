// Модальное окно героя
const modal = document.getElementById('hero-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalAttr = document.getElementById('modal-attr');
const modalLore = document.getElementById('modal-lore');
const modalAbilities = document.getElementById('modal-abilities');
const closeModalBtn = document.getElementById('close-modal');

const ABILITY_ICON_FALLBACK = 'https://placehold.co/64x64/333/fff?text=Icon';

const ATTR_LABELS = {
  agi: 'Agility',
  str: 'Strength',
  int: 'Intelligence'
};

function closeHeroModal() {
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Закрытие по кнопке
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeHeroModal);
}

// Закрытие по клику на подложку
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeHeroModal();
  });
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHeroModal();
});

// Открытие модального окна (вызывается при клике на карточку героя)
function openHeroModal(hero) {
  if (!hero) return;

  if (modalImg) modalImg.src = hero.photo || '';
  if (modalName) modalName.textContent = hero.name || '';
  if (modalAttr) modalAttr.textContent = `${ATTR_LABELS[hero.primary_attribute] || hero.primary_attribute} атрибут`;
  if (modalLore) modalLore.textContent = hero.lore || 'Описание отсутствует';

  // Сетка способностей: иконка, название и тултип с описанием
  if (modalAbilities) {
    modalAbilities.innerHTML = '';
    (hero.abilities || []).forEach((ability) => {
      const item = document.createElement('div');
      item.className = 'ability-item';
      const icon = ability.icon || ABILITY_ICON_FALLBACK;
      const description = ability.description || 'Описание отсутствует';
      item.innerHTML = `
        <img src="${icon}" alt="${ability.name}" loading="lazy" title="${description}"
             onerror="this.onerror=null; this.src='${ABILITY_ICON_FALLBACK}';">
        <span class="ability-name">${ability.name}</span>
      `;
      modalAbilities.appendChild(item);
    });
  }

  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}