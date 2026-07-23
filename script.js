// ============================================================
// Les Récits du Tarot — script partagé (cartes, modale, back-to-top)
// Inclus sur toutes les pages. Chaque fonction vérifie que les
// éléments existent avant d'agir, donc rien ne casse sur les
// pages qui n'ont pas de modale/cartes.
// ============================================================

function createCardHTML(nom, imgPath, mot, description = "", texte = "", suite = null) {
    const safeDesc = description.replace(/"/g, '&quot;');
    const safeNom = nom.replace(/"/g, '&quot;');
    const suiteClass = suite ? ` suite-${suite}` : '';
    return `<div class="card-wrapper${suiteClass}" data-nom="${safeNom}" data-img="${imgPath}" data-mot="${mot}" data-desc="${safeDesc}" tabindex="0" role="button" aria-label="${safeNom}, ${mot}">
        <div class="card">
            <div class="card-front">
                <img src="${imgPath}" alt="${safeNom}" loading="lazy" width="140" height="240" onerror="this.style.display='none';this.parentElement.classList.add('img-missing')">
            </div>
        </div>
        <div class="card-caption"><strong>${nom}</strong><br><span class="card-mot">${mot}</span></div>
    </div>`;
}

function openModal(title, keyword, description, imgSrc) {
    const imgWrapper = document.getElementById('modal-img-wrapper');
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    document.getElementById('modal-card-title').innerText = title;
    document.getElementById('modal-card-keyword').innerText = keyword;
    document.getElementById('modal-card-description').innerText = description;

    if (imgSrc) {
        document.getElementById('modal-card-img').src = imgSrc;
        imgWrapper.style.display = 'block';
        modalBody.classList.remove('no-image');
    } else {
        imgWrapper.style.display = 'none';
        modalBody.classList.add('no-image');
    }
    document.getElementById('card-modal').style.display = 'flex';
}

document.addEventListener('click', (e) => {
    const cardWrapper = e.target.closest('.card-wrapper');
    if (cardWrapper) {
        openModal(
            cardWrapper.dataset.nom,
            cardWrapper.dataset.mot,
            cardWrapper.dataset.desc || "Explication à venir.",
            cardWrapper.dataset.img
        );
        return;
    }

    const numBlock = e.target.closest('.num-symbol-block');
    if (numBlock) {
        openModal(
            "Nombre " + numBlock.dataset.num + " — " + numBlock.dataset.title,
            "Axe : " + numBlock.dataset.mot,
            numBlock.dataset.desc,
            null
        );
        return;
    }

    if (e.target.classList.contains('close-modal') || e.target.id === 'card-modal') {
        const modal = document.getElementById('card-modal');
        if (modal) modal.style.display = 'none';
    }

    if (e.target.id === 'btn-back-to-top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('card-modal');
        if (modal) modal.style.display = 'none';
        return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target.closest('[role="button"]');
        if (target) {
            e.preventDefault();
            target.click();
        }
    }
});

window.addEventListener('scroll', () => {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;
    if (window.scrollY > 400) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});
