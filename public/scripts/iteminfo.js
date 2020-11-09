async function addToCart(itemname,itemprice,itemimg,amount){
    const res = await axios.post(`/carts?name=${itemname}&price=${itemprice}&img=${itemimg}&ea=${amount}`);
    const cartlists = res.data;
    document.querySelector('.howMany').innerHTML = amount;
    document.querySelector('.cartAmount').innerHTML = cartlists.length;
    popupControl('block');
}

let popup = false;

function popupControl(how) {
    if(how == 'block') popup = true;
    else popup = false;
    console.log(popup);
    document.querySelector('.cartPreview').style.display = how;
    document.querySelector('.blackout').style.display = how;
}

document.querySelector('.closethis').addEventListener('click',()=>{
    popupControl('none');
});

// function eaControl(how){
//     document.querySelector('#amount').value += 1;
//     console.log(document.querySelector('#amount').value);
// }
// document.querySelector('.controller .up').addEventListener('click', eaControl('up'))


const addCart = document.querySelector('.addCart');
addCart.addEventListener('click', ()=>{
    const amount = document.getElementById('amount').value;
    const itemname = addCart.dataset.name;
    const itemprice = addCart.dataset.price;
    const itemimg = addCart.dataset.img;
    addToCart(itemname,itemprice,itemimg,amount);
})