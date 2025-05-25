function getMaxCardsToShow() {
  const container = document.getElementById('all-products');
  const cardWidth = 250 + 32; // Širina karte + gap (prilagodi gap ako treba, ovde 2rem ~ 32px)
  const containerWidth = container.clientWidth;
  const maxCards = Math.floor(containerWidth / cardWidth);
  return Math.min(maxCards, 5);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const renderCards = (arr, containerId, limit = null) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // očisti prije dodavanja

        const itemsToRender = limit ? arr.slice(0, limit) : arr;

        itemsToRender.forEach(kafa => {
          const card = document.createElement('div');
          card.className = 'coffee-card';
          card.innerHTML = `
            <div class="card-image">
              <img src="${kafa.slika}" alt="${kafa.naziv}">
            </div>
            <div class="card-content">
              <h3>${kafa.naziv}</h3>
              <p class="card-description">${kafa.opis}</p>
              <p class="card-weight">${kafa.gramaza}</p>
              <p class="cijena">${kafa.cijena}</p>
              <div class="card-bottom">
                <div class="stars">
                  <span>★★★★★</span>
                  <span class="count">(120)</span>
                </div>
                <button class="cart-btn">
                  <img src="./images/korpa.png" alt="Korpa" height="20">
                    <path d="..."/>
                  </svg>
                </button>
              </div>
            </div>
          `;


          container.appendChild(card);
        });
      };

      // Prikazujemo koliko kafa stane u red, max 5
      const showAllBtn = document.getElementById('show-all');

      const initialLimit = getMaxCardsToShow();
      renderCards(data.svi, 'all-products', initialLimit);

      showAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderCards(data.svi, 'all-products'); // prikazuje sve
        showAllBtn.style.display = 'none'; // sakrije dugme
      });

      // Osvežavanje broja prikazanih kafa prilikom resize-a (ako dugme nije kliknuto)
      window.addEventListener('resize', () => {
        if (showAllBtn.style.display !== 'none') {
          const newLimit = getMaxCardsToShow();
          renderCards(data.svi, 'all-products', newLimit);
        }
      });

      // Ostale sekcije
      renderCards(data.preporuke, 'recommended');
      renderCards(data.best, 'bestsellers');
    })
    .catch(err => {
      console.error('Greška pri dohvaćanju kafa:', err);
    });
});




  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });



function animateNumber(element, target) {
  let current = 0;
  const duration = 1000;
  const stepTime = Math.max(10, duration / target);

  const step = () => {
    const increment = Math.ceil(target / (duration / stepTime));
    current += increment;

    if (current >= target) {
      element.textContent = target.toLocaleString();
    } else {
      element.textContent = current.toLocaleString();
      setTimeout(step, stepTime);
    }
  };

  step();
}

document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".stats-wrapper");
  const stats = document.querySelectorAll(".stats-numbers strong");
  let hasAnimated = false; // sprječava višestruko pokretanje

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\s/g, ""));
            animateNumber(stat, target);
          });
          hasAnimated = true;
          observer.unobserve(statsSection); // prestani pratiti kad animirano
        }
      });
    },
    {
      threshold: 0.5 // 50% elementa mora biti u vidljivom dijelu
    }
  );

  observer.observe(statsSection);
});

