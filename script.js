document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const renderCards = (arr, containerId) => {
        const container = document.getElementById(containerId);
        arr.forEach(kafa => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
            <img src="${kafa.slika}" alt="${kafa.naziv}">
            <h3>${kafa.naziv}</h3>
            <p>${kafa.opis}</p>
            <p class="price">${kafa.cijena}</p>
          `;
          container.appendChild(card);
        });
      };

      renderCards(data.preporuke, 'recommended');
      renderCards(data.best, 'bestsellers');
      renderCards(data.svi, 'all-products');
    })
    .catch(err => {
      console.error('Greška pri dohvaćanju kafa:', err);
    });
});


  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

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
