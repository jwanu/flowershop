const clearCart = () => {
  document.querySelectorAll('.item').forEach(item => item.remove());
  axios.get(`/carts/deleteAll`);
  changeOrdertotal();
};

const changeItemtotal = (index, quantity) => {
  document.querySelectorAll('.total')[index].innerHTML = (document.querySelectorAll('.item>.action>.price')[index].innerHTML * quantity).toFixed(2);
  changeOrdertotal();
};

const changeQuantity = (index, quantity) => {
  axios.get(`/carts?idx=${index}&ea=${quantity}`);
  changeItemtotal(index,quantity);
};

const deleteItem = (itemIndex) => {
  axios.get(`/carts/delete?idx=${itemIndex}`);
  document.querySelectorAll('.item')[itemIndex].remove();
  changeOrdertotal();
};

const changeOrdertotal = () => {
  const ordertotal = [...document.querySelectorAll('.item>.action>.total')].length > 0 ? ([...document.querySelectorAll('.item>.action>.total')].map(v => v = Number(v.innerHTML)).reduce((acc,cur) => acc + cur)).toFixed(2) : 0;
  ordertotal? ordertotal : 0 ;
  document.querySelectorAll('.bill>div>.price').forEach(total => total.innerHTML = ordertotal);
};