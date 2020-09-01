var productsInCart = localStorage.getItem("productsInCart");

function removeOldCart() {
  var OldCart = document.querySelectorAll(
    ".cart__list .wrapper table .cartItem"
  );

  OldCart.forEach(function (a) {
    a.remove();
  });
}

removeOldCart();

function updateCartNumbers() {
  var cartNumbers = localStorage.getItem("cartNumbers");
  cartNumbers = parseInt(cartNumbers);

  if (cartNumbers) {
    document.querySelector(
      ".header__top-menu__left ul li a span"
    ).innerHTML = cartNumbers;
  }
}

updateCartNumbers();

function updateCart() {
  var classCart = document.querySelector(".cart__list .wrapper table");

  if (productsInCart) {
    productsInCart = JSON.parse(productsInCart);
    var arrayProductsInCart = Object.values(productsInCart);

    for (var i = 0; i < arrayProductsInCart.length; i++) {
      classCart.innerHTML += `<tr class="cartItem">
                              <td><img src="${
                                arrayProductsInCart[i].link
                              }"></td>
                              <td>${arrayProductsInCart[i].title}</td>
                              <td>
                                <p>${arrayProductsInCart[i].price
                                  .toString()
                                  .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )}<sup>đ</sup></p>
                              </td>
                              <td>${arrayProductsInCart[i].inCart}</td>
                              <td>
                                <p>${(
                                  arrayProductsInCart[i].price *
                                  arrayProductsInCart[i].inCart
                                )
                                  .toString()
                                  .replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )}<sup>đ</sup></p>
                              </td>
                              <td><i class="fas fa-trash-alt"></i></td>
                            </tr>`;
    }
  }
}

updateCart();

var continueBuy = document.getElementById("TIẾP TỤC MUA HÀNG");
var deleteAll = document.getElementById("XÓA");
var payment = document.getElementById("THANH TOÁN");

continueBuy.onclick = function () {
  location.href = "./products-grid.html";
};

deleteAll.onclick = function () {
  localStorage.clear();
  location.reload();
};

payment.onclick = function () {
  if (productsInCart) {
    location.href = "./payment.html";
  } else {
    alert("The Cart Is Empty !!!");
  }
};
