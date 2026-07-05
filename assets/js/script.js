/**
 * nufototext.github.io - Gallery Script
 * ======================================
 */

// Globale Variablen für Lightbox-Navigation
let currentCategory = '';
let currentImageIndex = 0;
let currentImages = [];

// Touch-Navigation Variablen
let touchStartX = 0;
let touchEndX = 0;

/**
 * Zeigt die Bilder einer Kategorie an
 * @param {string} category - Die Kategorie (cityscape, nature, stage, things)
 */
function showImages(category) {
    // Hauptgalerie ausblenden
    document.getElementById('main-gallery').style.display = 'none';
    
    // Alle Bildgalerien ausblenden
    document.querySelectorAll('.image-grid').forEach(function(grid) {
        grid.style.display = 'none';
    });

    // Zurück-Buttons anzeigen (oben und unten)
    document.getElementById('back-button').style.display = 'inline-block';
    document.getElementById('back-button-bottom').style.display = 'inline-block';

    const grid = document.getElementById(category + '-images');
    grid.style.display = 'flex';
    grid.innerHTML = '';

    // Bilder für diese Kategorie laden (001-999)
    const images = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= 999; i++) {
        const paddedI = String(i).padStart(3, '0');
        const imgUrl = `assets/images/${category}/${category}-${paddedI}.webp`;
        const img = new Image();
        img.src = imgUrl;
        img.alt = `${category} ${paddedI}`;
        img.onload = function() {
            img.onclick = function() {
                openLightbox(imgUrl, category, images.indexOf(imgUrl), images);
            };
            img.style.maxWidth = '150px';
            img.style.height = 'auto';
            grid.appendChild(img);
            images.push(imgUrl);
            loadedCount++;
        };
        img.onerror = function() {
            // Bild existiert nicht, ignorieren
        };
    }
    
    // Falls keine Bilder geladen wurden
    setTimeout(function() {
        if (loadedCount === 0) {
            grid.innerHTML = '<p>No images in this category.</p>';
        }
    }, 500);
}

/**
 * Zeigt die Hauptgalerie (Übersicht) an
 */
function showMainGallery() {
    document.getElementById('main-gallery').style.display = 'flex';
    document.querySelectorAll('.image-grid').forEach(function(grid) {
        grid.style.display = 'none';
    });
    // Zurück-Buttons ausblenden (oben und unten)
    document.getElementById('back-button').style.display = 'none';
    document.getElementById('back-button-bottom').style.display = 'none';
}

/**
 * Öffnet die Lightbox mit einem Bild
 * @param {string} src - Die Bild-URL
 * @param {string} category - Die Kategorie
 * @param {number} index - Der Index des Bildes in der Liste
 * @param {Array} images - Die Liste aller Bilder in der Kategorie
 */
function openLightbox(src, category, index, images) {
    currentCategory = category;
    currentImageIndex = index;
    currentImages = images;
    
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Schließt die Lightbox
 */
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
}

/**
 * Navigiert in der Lightbox (vorheriges/nächstes Bild)
 * @param {number} direction - -1 für vorheriges, 1 für nächstes Bild
 */
function navigateLightbox(direction) {
    if (!currentImages || currentImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Begrenze den Index
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }
    
    if (currentImages[currentImageIndex]) {
        document.getElementById('lightbox-img').src = currentImages[currentImageIndex];
    }
}

/**
 * Behandelt Wisch-Gesten für die Lightbox-Navigation
 */
function handleSwipe() {
    const swipeThreshold = 50; // Mindestdistanz für Wischen
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Wischen nach links -> nächstes Bild
            navigateLightbox(1);
        } else {
            // Wischen nach rechts -> vorheriges Bild
            navigateLightbox(-1);
        }
    }
}

// Event-Listener registrieren, wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Tastatursteuerung für Lightbox
    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Touch-Navigation für Smartphones
    document.getElementById('lightbox').addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.getElementById('lightbox').addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
});
