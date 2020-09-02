var cart = JSON.parse(localStorage.getItem("cart")) || [];

var backCart = document.getElementById("QUAY LẠI GIỎ HÀNG");
var nextPay = document.getElementById("TIẾP THEO");

var valueInputReceiver = document.getElementById("Người nhận");
var valueInputAddress = document.getElementById("Địa chỉ");
var valueInputPhone = document.getElementById("Số điện thoại");
var valueInputEmail = document.getElementById("Email");

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

backCart.onclick = function () {
  location.href = "./cart.html";
};

nextPay.onclick = function () {
  
  if (
    valueInputReceiver.value == 0 ||
    valueInputAddress.value == 0 ||
    valueInputPhone.value == 0 ||
    valueInputEmail.value == 0
  ) {
    alert("Please Add Your Infomation !!!");
  } else {
    var valueInput = {
      receiver: valueInputReceiver.value,
      address: valueInputAddress.value,
      phone: valueInputPhone.value,
      email: valueInputEmail.value,
    };
    
    localStorage.setItem("yourInfo", JSON.stringify(valueInput));

    location.href = "./payment.html";
  }
};
