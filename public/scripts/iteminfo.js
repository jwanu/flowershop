const addCart = async () => {
  const item = {};
  item.name = document.querySelector('.title').innerHTML;
  item.price = document.querySelector('.price').innerHTML;
  item.img = document.querySelector('.thisitem>.imgbg>img').getAttribute('src');
  item.qty = document.getElementById('amount').value;
  const res = await axios.post(`/carts?name=${item.name}&price=${item.price}&img=${item.img}&ea=${item.qty}`);
  const cartlists = res.data;
  document.querySelector('.howMany').innerHTML = item.qty;
  document.querySelector('.cartAmount').innerHTML = cartlists.length;
  popupControl('block');
};

let popup = false;
const popupControl = how => {
  if (how == 'block') popup = true;
  else popup = false;
  console.log(popup);
  document.querySelector('.cartPreview').style.display = how;
  document.querySelector('.blackout').style.display = how;
}