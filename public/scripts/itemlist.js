console.log('슝');
async function getItemlist() {
  try {
    const res = await axios.get('/itemlists');
    const itemlists = res.data;
  } catch (err) {
    console.error(err);
  }
}