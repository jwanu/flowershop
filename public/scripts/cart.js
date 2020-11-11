async function clearCart (){
//   await axios.get(`/carts/deleteAll`);
//   location.replace(`/carts/deleteAll`);

  const res = await axios.get(`/carts/deleteAll`);
  console.log(res);
};

async function changeQuantity (index, quantity) {
//   await axios.get(`/carts?idx=${index}&ea=${quantity}`);
  location.replace(`/carts?idx=${index}&ea=${quantity}`);
};

async function deleteItem (itemIndex) {
//   await axios.get(`/carts/delete?idx=${itemIndex}`);
  location.replace(`/carts/delete?idx=${itemIndex}`);
};

// document.querySelector(".clearCart").addEventListener("click", clearCart);

// document.querySelectorAll(".quantity").forEach((quantityController, index) => {
//   quantityController.addEventListener(
//     "change",
//     changeQuantity(index, quantityController.value)
//   );
// });

// document.querySelectorAll(".remove").forEach((v) => {
//   v.addEventListener("click", deleteItem(v.dataset.idx));
// });
