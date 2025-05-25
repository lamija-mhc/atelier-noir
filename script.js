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

  console.log("JavaScript povezan!");


