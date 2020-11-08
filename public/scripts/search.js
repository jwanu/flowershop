async function getSearchResult(input){
    const res = await axios.get(`/search?q=${input}`);

}

const searchInput = document.querySelector('.mobileSearchInput');
searchInput.addEventListener('keypress', (e)=> {
    if(e.key === 'Enter') {
        getSearchResult(searchInput.value);
    }
});
