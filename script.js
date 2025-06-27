
let data = [];

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
  });

const items = document.querySelectorAll('.item');
const detailBox = document.getElementById('detail-box');
let activeItem = null;

function renderBlock(block) {
  const templates = {
    heading: (b) => `<h${b.level || 2}>${b.text}</h${b.level || 2}>`,
    paragraph: (b) => `<p>${b.text}</p>`,
    image: (b) => `<img src="${b.src}" style="max-height: 200px; border-radius: 8px; margin-top: 1rem;">`,
    button: (b) => `<button>${b.text}</button>`,
    divider: () => `<hr>`,
    list: (b) => `<ul>${b.items.map(item => `<li>${item}</li>`).join('')}</ul>`,
    bar: (b) => `<div class="bar">${b.text}</div>`
  };
  const render = templates[block.type];
  return render ? render(block) : '';
}

function renderDetailContent(blocks) {
  return blocks.map(renderBlock).join('');
}

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
    if (!detail || !detail.content) return;

    detailBox.innerHTML = renderDetailContent(detail.content);
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






