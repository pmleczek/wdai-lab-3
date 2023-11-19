const ListItem = (product) => {
  const container = document.createElement('li');
  container.className = 'list-item';

  const img = document.createElement('img');
  img.className = 'thumbnail';
  img.src = product.thumbnail;

  container.appendChild(img);

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';

  const title = document.createElement('h2');
  title.innerText = product.title;
  textContainer.appendChild(title);

  const description = document.createElement('p');
  description.className = 'description';
  description.innerText = product.description;
  textContainer.appendChild(description);

  container.appendChild(textContainer);

  return container;
};

const productList = document.querySelector('#product-list');

let products = [];
let sort = 'no-sorting';
let searchQuery = '';

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((product) => {
      productList.appendChild(ListItem(product));
    });
    products = data.products;
  });

const sortButtons = document.querySelectorAll('.sort-button');

const resetActive = () => {
  sortButtons.forEach((button) => {
    button.classList.remove('active');
  });
};

const onSort = (type) => {
  resetActive();

  let copy = products.slice();
  productList.innerHTML = '';
  sort = type;

  if (type === 'asc') {
    copy = copy.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
    );
  }

  if (type === 'desc') {
    copy = copy.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1,
    );
  }

  document.querySelector(`#${type}`).classList.add('active');

  copy
    .filter((product) => product.title.toLowerCase().includes(searchQuery))
    .forEach((product) => {
      productList.appendChild(ListItem(product));
    });
};

const ascButton = document.querySelector('#asc');
ascButton.addEventListener('click', () => onSort('asc'));

const descButton = document.querySelector('#desc');
descButton.addEventListener('click', () => onSort('desc'));

const noButton = document.querySelector('#no-sorting');
noButton.addEventListener('click', () => onSort('no-sorting'));

const onFilter = (query) => {
  productList.innerHTML = '';

  searchQuery = query;

  let copy = products.slice();

  if (sort === 'asc') {
    copy = copy.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  if (sort === 'desc') {
    copy = copy.sort((a, b) => (a.title > b.title ? -1 : 1));
  }

  copy
    .filter((product) => product.title.toLowerCase().includes(query))
    .forEach((product) => {
      productList.appendChild(ListItem(product));
    });
};

const searchSubmit = document.querySelector('#search-button');
const searchInput = document.querySelector('#search-input');
searchSubmit.addEventListener('click', () => onFilter(searchInput.value));
