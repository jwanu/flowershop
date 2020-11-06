const quantities = document.querySelectorAll('.quantity');
quantities.forEach((v,i) => {
    v.addEventListener('change', async ()=>{
        const selected = v.value;
        const res = await axios.get(`/carts?idx=${i}&ea=${selected}`);
        location.reload();
    });
});

const removes = document.querySelectorAll('.remove');
removes.forEach((v) => {
    v.addEventListener('click', async () => {
        const res = await axios.get(`/carts/delete?idx=${v.dataset.idx}`);
        location.reload();
    });
})

const clearCart = document.querySelector('.clearCart');
clearCart.addEventListener('click', async () => {
    const res = await axios.get(`/carts/deleteAll`);
    location.reload();
})