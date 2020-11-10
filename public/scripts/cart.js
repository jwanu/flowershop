document.querySelectorAll('.quantity').forEach((v,i) => {
    v.addEventListener('change', async ()=>{
        const selected = v.value;
        const res = await axios.get(`/carts?idx=${i}&ea=${selected}`);
        location.reload();
    });
});

document.querySelectorAll('.remove').forEach((v) => {
    v.addEventListener('click', async () => {
        const res = await axios.get(`/carts/delete?idx=${v.dataset.idx}`);
        location.reload();
    });
})

const clearCart = async () => {
    const res = await axios.get(`/carts/deleteAll`);
    location.reload();
}

document.querySelector('.clearCart').addEventListener('click', clearCart());