var str = '3 + 5 * 6 - 2 / 4'
str = str.replace(/\s/g,'')
console.log(str)
var array = []
var op = '', pre = 0, cur=0

for( var i = 0; str.length>0; i++){

if(str.match(/^[0-9]+/)){
  op = str.match(/[0-9]+/)
  str = str.replace(op[0],'')
  array.push(op[0])
 }
 else {
  op = str.match(/[+]|[-]|[*]|[/]/)
  str = str.replace(op[0],'')
  array.push(op[0])
 }

}
console.log(array.length)
pre = array[0]

for( var i=2, j=1; j<array.length;){
  console.log(j)
  if( array[j] == '+'){
    pre = parseInt(pre) + parseInt(array[i])
  }
  else if( array[j] == '-'){
    pre = parseInt(pre) - parseInt(array[i])
  }
  else if( array[j] == '*'){
    pre = parseInt(pre) * parseInt(array[i])
  }
  else if( array[j] == '/'){
    pre = parseInt(pre) / parseInt(array[i])
  }
  i = i+2, j= j+2
}

console.log(pre)