var cart = JSON.parse(localStorage.getItem("cart")) || [];

var removeItem = document.getElementsByClassName("remove-item");
var continueBuy = document.getElementById("TIẾP TỤC MUA HÀNG");
var removeAll = document.getElementById("XÓA");
var payment = document.getElementById("THANH TOÁN");

var OldCart = document.querySelectorAll(
  ".cart__list .wrapper table .cart__list__item"
);
var classCart = document.querySelector(".cart__list .wrapper table");
var classSum = document.querySelector(
  ".cart__sum .wrapper .cart__sum__container"
);

function removeOldCart() {
  OldCart.forEach(function (a) {
    a.remove();
  });
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

function updateCart() {
  var sumPrice = 0;

  if (cart.length == 0) {
    classCart.innerHTML += `<tr class="cart__list__item--empty">
                              <td colspan="6">
                                <p>The Cart Is Empty !!!</p>
                              </td>
                            </tr>`;
  } else {
    for (var i = 0; i < cart.length; i++) {
      classCart.innerHTML += `<tr class="cart__list__item">
                                <td><img src="${cart[i].link}"></td>
                                <td>${cart[i].title}</td>
                                <td>
                                  <p>${cart[i].price
                                    .toString()
                                    .replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}<sup>đ</sup></p>
                                </td>
                                <td>${cart[i].inCart}</td>
                                <td>
                                  <p>${(cart[i].price * cart[i].inCart)
                                    .toString()
                                    .replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}<sup>đ</sup></p>
                                </td>
                                <td>
                                  <a class="remove-item">
                                    <i class="fas fa-trash-alt"></i>
                                  </a>
                                </td>
                              </tr>`;
      sumPrice += cart[i].price * cart[i].inCart;
    }
  }
  classSum.innerHTML += `<p class="cart__sum__price">
                          ${sumPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <sup>đ</sup>
                        </p>`;
}

removeOldCart();
updateCartNumbers();
updateCart();

continueBuy.onclick = function () {
  location.href = "./products-grid.html";
};

removeAll.onclick = function () {
  localStorage.removeItem("cart");
  location.reload();
};

payment.onclick = function () {
  if (cart) {
    location.href = "./your-info.html";
  } else {
    alert("The Cart Is Empty !!!");
  }
};

for (let i = 0; i < removeItem.length; i++) {
  removeItem[i].onclick = function () {
    cart.splice(i, 1);
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };
}