async function addToCart(itemname,itemprice,itemimg,amount){
    const res = await axios.post(`/carts?name=${itemname}&price=${itemprice}&img=${itemimg}&ea=${amount}`);
    const cartlists = res.data;
    document.querySelector('.howMany').innerHTML = amount;
    document.querySelector('.cartAmount').innerHTML = cartlists.length;

    //res.data에 내가 보낸 res쿠키가 있으니 이거로 카트미리보기 생성시키기
}

const addCart = document.querySelector('.addCart');
addCart.addEventListener('click', ()=>{
    const amount = document.getElementById('amount').value;
    const itemname = addCart.dataset.name;
    const itemprice = addCart.dataset.price;
    const itemimg = addCart.dataset.img;
    addToCart(itemname,itemprice,itemimg,amount);
})