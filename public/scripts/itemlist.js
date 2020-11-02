async function getItemlist(cond) {
  try {
    const res = await axios.get(`/itemlists/${cond}`);
    const itemlists = res.data;
    const tbody = document.querySelector('.items');
    tbody.innerHTML = '';
    itemlists.map(item => {
      const itemdiv = document.createElement('div');
      itemdiv.className = 'item';
      const itemlink = document.createElement('a');
      itemlink.setAttribute('href',`/iteminfo/${item.id}`);
      const imgdiv = document.createElement('div');
      imgdiv.className = 'image';
      const img = document.createElement('img');
      img.setAttribute('src',`${item.thumb}`);
      img.setAttribute('alt',`${item.name}`);
      const pricediv = document.createElement('div');
      pricediv.className = 'price';
      pricediv.innerHTML = item.price;
      const quickInfodiv = document.createElement('div');
      quickInfodiv.className = 'quickInfo';
      const namediv = document.createElement('div');
      namediv.className = 'name';
      namediv.innerHTML = item.name;
      const infop = document.createElement('p');
      infop.innerHTML = item.summary;
      const infodiv = document.createElement('div');
      infodiv.className = 'info';
      const namediv2 = document.createElement('div');
      namediv2.className = 'name';
      namediv2.innerHTML = item.name;
      
      itemdiv.appendChild(itemlink);
      itemlink.appendChild(imgdiv);
      itemlink.appendChild(infodiv);
      imgdiv.appendChild(img);
      imgdiv.appendChild(pricediv);
      imgdiv.appendChild(quickInfodiv);
      quickInfodiv.appendChild(namediv);
      quickInfodiv.appendChild(infop);
      infodiv.appendChild(namediv2);

      tbody.appendChild(itemdiv);
    })
  } catch (err) {
    console.error(err);
  }
}

const filters = document.querySelectorAll('input[name=flower]');
filters.forEach(filter => {
  filter.addEventListener('change', function(){
    if(this.checked){
      console.log(this.value);
      getItemlist(this.value);
    }else{

    }
  });
})