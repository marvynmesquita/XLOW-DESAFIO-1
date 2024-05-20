const productsApi = 'https://desafio.xlow.com.br/search';

const products = [];


const getProducts = async () => {
  if (products.length === 0) {
    const response = await fetch(productsApi);
    const data = await response.json();
    products.push(...data);
  }

  return products;
};

const getProductInfo = async (id) => {
  const products = await fetch(productsApi + '/' + id)
  .then(response => response.json())
  .then(data => {
    const product = document.createElement('div');
    product.classList.add('productCard');
    const mainProductImage = document.createElement('img');
    mainProductImage.src = data[0].items[0].images[0].imageUrl;
    mainProductImage.alt = data[0].items[0].nameComplete;
    product.appendChild(mainProductImage);

    const productName = document.createElement('h2');
    productName.textContent = data[0].items[0].nameComplete;
    product.appendChild(productName);
    
    const images = data[0].items[0].images;
    if (images.length > 1) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('imageContainer');
      for (let i = 1; i < images.length; i++) {
        const productImage = document.createElement('img');
        productImage.src = images[i].imageUrl;
        productImage.alt = data[0].items[0].nameComplete;
        productImage.classList.add('miniThumb');
        productImage.addEventListener('click', () => {
          const newSrc = mainProductImage.src;
          mainProductImage.src = productImage.src;
          productImage.src = newSrc;
        })
        imageContainer.appendChild(productImage);
      }
      product.appendChild(imageContainer);
    }
    
    const PriceWithoutDiscount = parseFloat(data[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount).toFixed(2)
    const Price = parseFloat(data[0].items[0].sellers[0].commertialOffer.Price).toFixed(2)

    if(Price < PriceWithoutDiscount){
      const origPrice = document.createElement('h4');
      origPrice.textContent = "R$ " + PriceWithoutDiscount.toString();
      const actualPrice = document.createElement('h3');
      actualPrice.textContent = "R$ " + Price.toString();
      origPrice.classList.add('origPrice');
      product.appendChild(origPrice);
      product.appendChild(actualPrice);
    } else {
      Price.toString();
      const actualPrice = document.createElement('h3');
      actualPrice.textContent = "R$ " + Price;
      product.appendChild(actualPrice);
    }

    const btnComprar = document.createElement('button');
    btnComprar.textContent = "Comprar";
    product.appendChild(btnComprar);
    document.querySelector('.container').appendChild(product);
  })
}

const renderProducts = async () => {
  const products = await getProducts();
  products.forEach(async (product) => {
    const id = product.productId;
    getProductInfo(id);
  });
}

const screenCheck = () => {
  if (screen.width <= 560) {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-5');
      document.querySelector('.container').classList.add('layout-2');
      document.querySelector('.layoutSvg').src = './img/1-bars.svg';
    }, 100)
  }
  else {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-2');
      document.querySelector('.container').classList.remove('layout-1');
      document.querySelector('.container').classList.add('layout-5');
      document.querySelector('.layoutSvg').src = './img/4-bars.svg';
    }, 100)
  }
}

window.addEventListener('resize', screenCheck);

const changeLayout = () => {
  if (document.querySelector('.container').classList.contains('layout-4')) {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-4');
      document.querySelector('.container').classList.add('layout-5');
      document.querySelector('.layoutSvg').src = './img/4-bars.svg';
    }, 100)
  }
  if (document.querySelector('.container').classList.contains('layout-5')) {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-5');
      document.querySelector('.container').classList.add('layout-4');
      document.querySelector('.layoutSvg').src = './img/5-bars.svg';
    }, 100)
  }
  if (document.querySelector('.container').classList.contains('layout-1')) {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-1');
      document.querySelector('.container').classList.add('layout-2');
      document.querySelector('.layoutSvg').src = './img/1-bars.svg';
    }, 100)
  }
  if (document.querySelector('.container').classList.contains('layout-2')) {
    setTimeout(() => {
      document.querySelector('.container').classList.remove('layout-2');
      document.querySelector('.container').classList.add('layout-1');
      document.querySelector('.layoutSvg').src = './img/2-bars.svg';
    }, 100)
  } 
}


renderProducts();