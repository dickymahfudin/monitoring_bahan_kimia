
//   var str = "Box 1";
//   console.log(str.replace(/\s/g,'').toLowerCase());
const pad = (n) => (n < 10 ? `0${n}` : n);


const dateTime = new Date();
const tm = `${dateTime.getFullYear()}${pad(dateTime.getMonth()+1)}${pad(dateTime.getDate())}${pad(dateTime.getHours())}${pad(dateTime.getMinutes())}`

const waktu = `${dateTime.getFullYear()}-${pad(dateTime.getMonth()+1)}-${pad(dateTime.getDate())} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`

console.log({tm,waktu});