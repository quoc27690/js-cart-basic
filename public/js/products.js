var xhttp = new XMLHttpRequest();
var dataProducts = [];
var cart = JSON.parse(localStorage.getItem("cart")) || [];

var oldProduct = document.querySelectorAll(
  ".products__right__items--grid .product"
);
var products = document.querySelector(".products__right__items--grid");

function removeOldProducts() {
  oldProduct.forEach(function (a) {
    a.remove();
  });
}

removeOldProducts();

xhttp.open("GET", "http://localhost:3007/products", true);

xhttp.send();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    dataProducts = JSON.parse(this.responseText);
    updateProducts(dataProducts);
  }
};

function updateProducts(dataProducts) {
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

function updateCartNumbers() {
  var sumCartNumbers = 0;

  for (var i = 0; i < cart.length; i++) {
    sumCartNumbers += cart[i].inCart;
  }

  document.querySelector(
    ".header__top-menu__left ul li a span"
  ).innerHTML = sumCartNumbers;
}

updateCartNumbers();

function addToCart(i) {
  var repeat = false;

  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id == dataProducts[i].id) {
      repeat = true;
      cart[j].inCart += 1;
      break;
    }
  }

  if (repeat == false) {
    cart.push(dataProducts[i]);
  }

  localStorage.setItem("cart", JSON.stringify(cart) || []);
  alert("Add To Cart Successfully !!!");
  updateCartNumbers();
}
