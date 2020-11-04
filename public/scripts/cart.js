async function addToCart(itemId,amount){
    const res = await axios.post(`/carts?id=${itemId}&ea=${amount}`);
}

const addCart = document.querySelector('.addCart');
addCart.addEventListener('click', ()=>{
    const amount = document.getElementById('amount').value;
    const itemid = addCart.value;
    addToCart(itemid,amount);
})