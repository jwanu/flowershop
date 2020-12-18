
async function getItemlist(flowers, colors, priceRange) {
  try {
    const tbody = document.querySelector('.items');
    const catid = window.location.href.split('/itemlist/').length > 1 ? window.location.href.split('/itemlist/')[1] : 0;
    const res = await axios.get(`/itemlists?category=${catid}&flowers=${flowers}&colors=${colors}&priceRange=${priceRange}`);
    const itemlists = res.data;
    tbody.innerHTML = '';
    itemlists.map((item) => {
      const itemdiv = document.createElement('div');
      itemdiv.className = 'item';
      const itemlink = document.createElement('a');
      itemlink.setAttribute('href', `/iteminfo/${item._id}`);
      const imgdiv = document.createElement('div');
      imgdiv.className = 'image';
      const img = document.createElement('img');
      img.setAttribute('src', `${item.thumb}`);
      img.setAttribute('alt', `${item.name}`);
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
    });
  } catch (err) {
    console.error(err);
  }
}

document.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
  checkbox.checked = false;
  checkbox.addEventListener('change', function () {
    const checkedBox = {};
    checkedBox.flower = [];
    checkedBox.color = [];
    checkedBox.priceRange = [];
    [...document.querySelectorAll('input[type=checkbox]:checked')].forEach((f) => {
      checkedBox[f.name].push(f.value);
    });
    getItemlist(checkedBox.flower, checkedBox.color, checkedBox.priceRange);
  });
});