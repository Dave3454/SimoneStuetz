
  let data = [];

  fetch('data.json')
    .then(response => response.json())
    .then(json => {
      data = json;
    });

  const items = document.querySelectorAll('.item');
  const detailBox = document.getElementById('detail-box');
  let activeItem = null;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id);

      if (activeItem === item) {
        detailBox.classList.remove('active');
        item.classList.remove('active-item');
        activeItem = null;
        return;
      }

      items.forEach(i => i.classList.remove('active-item'));
      item.classList.add('active-item');
      activeItem = item;

      const detail = data.find(d => d.id === id);

      if (!detail) return;

      detailBox.innerHTML = `
        <h2>${detail.title}</h2>
        <p>${detail.text1}</p>
        <h3>${detail.header2}</h3>
        <p>${detail.text2}</p>
        <button>Erfahren Sie mehr</button>
        ${detail.image ? `<img src="${detail.image}" style="max-height: 200px; border-radius: 8px; margin-top: 1rem;">` : ''}
      `;
      detailBox.classList.add('active');
    });
  });

    document.querySelectorAll('a[href*="index.html#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const hash = this.getAttribute('href').split('#')[1];
        const target = document.getElementById(hash);
        const onIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
        if (onIndex && target) {
          e.preventDefault();
          const offset = window.innerHeight * 0.2;
          const scrollTo = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }
      });
    });






