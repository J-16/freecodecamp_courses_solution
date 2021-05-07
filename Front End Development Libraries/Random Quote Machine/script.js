let quote=[];

async function quotes(){
await fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=1')
.then(res => {return res.json()})
.then(data => {
  quote = [data[0].quote, data[0].character]
  console.log( data[0].quote, data[0].character ) })
  document.getElementById("text").innerHTML = quote[0];
  document.getElementById("author").innerHTML = '-'+quote[1];
  
  }