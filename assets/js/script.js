/**
 * nufototext.github.io - Gallery Script
 * ======================================
 */

// Konfiguration
const CONFIG = {
    categories: ['cityscape', 'nature', 'stage', 'people'],
    maxImagesPerCategory: 20, // Maximale Anzahl der zu prüfenden Bilder pro Kategorie
    imageBasePath: 'assets/images/',
    loadingMessage: 'Lade Bilder...',
    noImagesMessage: 'Keine Bilder in dieser Kategorie.'
};

// DOM-Elemente
const elements = {
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxClose: document.getElementById('lightbox-close'),
    imageGrids: {}
};

// Initialisierung
function init() {
    // Image-Grids referenzieren
    CONFIG.categories.forEach(category => {
        elements.imageGrids[category] = document.getElementById(`${category}-images`);
    });

    // Event-Listener für Lightbox
    elements.lightboxClose.addEventListener('click', closeLightbox);
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) {
            closeLightbox();
        }
    });

    // Tastatur-Steuerung für Lightbox (ESC zum Schließen)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Lade die Hauptbilder für die Kategorien
    loadCategoryThumbnails();
}

/**
 * Lädt die Hauptbilder für die Kategorien
 */
function loadCategoryThumbnails() {
    CONFIG.categories.forEach(category => {
        const categoryElement = document.querySelector(`.category[onclick="showImages('${category}')"]`);
        if (!categoryElement) return;

        const img = categoryElement.querySelector('img');
        if (!img) return;

        // Pfad zum WebP-Bild
        const webpPath = `${CONFIG.imageBasePath}${category}/${category}-1.webp`;
        
        // Prüfe, ob das Bild existiert
        fetch(webpPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    img.src = webpPath;
                } else {
                    // Falls nicht, zeige Platzhalter
                    img.style.display = 'none';
                    const placeholder = categoryElement.querySelector('.category-placeholder');
                    if (placeholder) {
                        placeholder.style.display = 'flex';
                    }
                }
            })
            .catch(() => {
                img.style.display = 'none';
                const placeholder = categoryElement.querySelector('.category-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            });
    });
}

/**
 * Zeigt die Bilder einer Kategorie an
 * @param {string} category - Die Kategorie
 */
function showImages(category) {
    // Alle Grids ausblenden
    Object.values(elements.imageGrids).forEach(grid => {
        grid.style.display = 'none';
    });

    const grid = elements.imageGrids[category];
    if (!grid) return;

    // Lade-Indikator anzeigen
    grid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>${CONFIG.loadingMessage}</p>
        </div>
    `;
    grid.style.display = 'flex';

    // Bilder laden
    loadImagesForCategory(category, grid);
}

/**
 * Lädt alle Bilder einer Kategorie
 * @param {string} category - Die Kategorie
 * @param {HTMLElement} grid - Das Grid-Element
 */
function loadImagesForCategory(category, grid) {
    let loadedImages = 0;
    let hasImages = false;

    for (let i = 1; i <= CONFIG.maxImagesPerCategory; i++) {
        const imgUrl = `${CONFIG.imageBasePath}${category}/${category}-${i}.webp`;
        
        // Prüfe, ob das Bild existiert
        fetch(imgUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    hasImages = true;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = getImageAltText(category, i);
                    img.loading = 'lazy';
                    img.onclick = () => openLightbox(img.src);
                    img.style.maxWidth = '150px';
                    img.style.height = 'auto';
                    
                    // Bild zum Grid hinzufügen
                    grid.appendChild(img);
                    loadedImages++;
                } else if (i === CONFIG.maxImagesPerCategory && !hasImages) {
                    // Keine Bilder gefunden
                    grid.innerHTML = `<p>${CONFIG.noImagesMessage}</p>`;
                }
            })
            .catch(() => {
                if (i === CONFIG.maxImagesPerCategory && !hasImages) {
                    grid.innerHTML = `<p>${CONFIG.noImagesMessage}</p>`;
                }
            });
    }
}

/**
 * Generiert einen beschreibenden Alt-Text für Bilder
 * @param {string} category - Die Kategorie
 * @param {number} index - Die Bildnummer
 * @returns {string} Der Alt-Text
 */
function getImageAltText(category, index) {
    const categoryNames = {
        cityscape: 'Stadtlandschaft',
        nature: 'Natur',
        stage: 'Bühne',
        people: 'Menschen'
    };
    return `${categoryNames[category] || category} Bild ${index}`;
}

/**
 * Öffnet die Lightbox mit einem Bild
 * @param {string} src - Die Bild-URL
 */
function openLightbox(src) {
    elements.lightboxImg.src = src;
    elements.lightbox.classList.add('active');
    elements.lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Schließt die Lightbox
 */
function closeLightbox() {
    elements.lightbox.classList.remove('active');
    elements.lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', init);
