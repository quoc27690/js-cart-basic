var cart = JSON.parse(localStorage.getItem("cart"));
var yourInfo = JSON.parse(localStorage.getItem("yourInfo"));

var backInfo = document.getElementById("QUAY LẠI THÔNG TIN");
var finish = document.getElementById("HOÀN TẤT");

var paymentContentInfo = document.querySelector(".payment__content__info");
var paymentContentCart = document.querySelector(
  ".payment__content__cart table"
);

var classSum = document.querySelector(".payment__cart__sum");

function updateCartNumbers() {
  var sumCartNumbers = 0;

  for (var i = 0; i < cart.length; i++) {
    sumCartNumbers += cart[i].inCart;
  }

  document.querySelector(
    ".header__top-menu__left ul li a span"
  ).innerHTML = sumCartNumbers;
}

function showInfo() {
  paymentContentInfo.innerHTML += `<div class="payment__info__detail">
                                    <p>Người nhận: ${yourInfo.receiver}</p>
                                    <p>Địa chỉ: ${yourInfo.address}</p>
                                    <p>Số điện thoại: ${yourInfo.phone}</p>
                                    <p>Email: ${yourInfo.email}</p>
                                  </div>`;
}

function showCart() {
  var sumPrice = 0;

  for (var i = 0; i < cart.length; i++) {
    paymentContentCart.innerHTML += `
    <tr>
      <td><img src="${cart[i].link}"></td>
      <td>${cart[i].title}</td>
      <td>
        <p>${cart[i].price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<sup>đ</sup></p>
      </td>
      <td>${cart[i].inCart}</td>
      <td>
        <p>${(cart[i].price * cart[i].inCart)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<sup>đ</sup></p>
      </td>
    </tr>`;

    sumPrice += cart[i].price * cart[i].inCart;
  }

  classSum.innerHTML += `<p>
                          ${sumPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <sup>đ</sup>
                        </p>`;
}

backInfo.onclick = function () {
  location.href = "./your-info.html";
};

finish.onclick = function () {
  alert("Successful Purchase !!!");

  localStorage.clear();

  location.href = "./index.html";
};

updateCartNumbers();
showInfo();
showCart();
