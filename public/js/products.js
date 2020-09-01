function removeOldProducts() {
  var oldProduct = document.querySelectorAll(
    ".products__right__items--grid .product"
  );

  oldProduct.forEach(function (a) {
    a.remove();
  });
}

removeOldProducts();

var xhttp = new XMLHttpRequest();

var dataProducts = [];

xhttp.open("GET", "http://localhost:3007/products", true);

xhttp.send();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    dataProducts = JSON.parse(this.responseText);
    updateProducts(dataProducts);
  }
};

function updateProducts(dataProducts) {
  var products = document.querySelector(".products__right__items--grid");

  for (var i = 0; i < dataProducts.length; i++) {
    products.innerHTML += `<div class="product">
                            <div class="product__image"><img src="${
                              dataProducts[i].link
                            }"/></div>
                            <div class="product__title">
                              <p>${dataProducts[i].title}</p>
                            </div>
                            <div class="product__price">
                              <p>${dataProducts[i].price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                <sup>đ</sup>
                              </p>
                              <p>-</p>
                              <p>${dataProducts[i].oldPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                <sup>đ</sup>
                              </p>
                            </div>
                            <div class="button-add-to-cart">
                              <button onclick="addToCart(${i})">ADD TO CART</button>
                            </div>
                            <div class="product__compare">
                              <a href="./error.html">
                                <i class="fa fa-heart"></i>
                                <p>Yêu thích</p>
                              </a>
                              <a href="./error.html">
                                <i class="fa fa-signal"></i>
                                <p>So sánh</p>
                              </a>
                              <a href="./error.html">
                                <i class="fa fa-compress"></i>
                              </a>
                            </div>
                          </div>`;
  }
}

function onLoadCartNumbers() {
  var cartNumbers = localStorage.getItem("cartNumbers");

  if (cartNumbers) {
    document.querySelector(
      ".header__top-menu__left ul li a span"
    ).innerHTML = cartNumbers;
  }
}

onLoadCartNumbers();

function addToCart(i) {
  var cartNumbers = localStorage.getItem("cartNumbers");
  cartNumbers = parseInt(cartNumbers);

  if (cartNumbers) {
    localStorage.setItem("cartNumbers", cartNumbers + 1);
    document.querySelector(".header__top-menu__left ul li a span").innerHTML =
      cartNumbers + 1;
    alert('Add To Cart Successfully !!!')
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(
      ".header__top-menu__left ul li a span"
    ).innerHTML = 1;
  }

  setItems(i);
  totalPrice(i);
}

function setItems(i) {
  var product = dataProducts[i];

  var productsInCart = localStorage.getItem("productsInCart");
  productsInCart = JSON.parse(productsInCart);

  if (productsInCart != null) {
    if (productsInCart[product.title] == undefined) {
      productsInCart = {
        ...productsInCart,
        [product.title]: product,
      };
    }
    productsInCart[product.title].inCart += 1;
  } else {
    product.inCart = 1;
    productsInCart = {
      [product.title]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}

function totalPrice(i) {
  var product = dataProducts[i];

  var totalInCart = localStorage.getItem("totalInCart");

  if (totalInCart != null) {
    totalInCart = parseInt(totalInCart);
    localStorage.setItem("totalInCart", totalInCart + product.price);
  } else {
    localStorage.setItem("totalInCart", product.price);
  }
}
