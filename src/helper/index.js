const pad = (n) => (n < 10 ? `0${n}` : n);

export const jsonToTable =  (datas) => {
  if (datas !== 0) {
    let object = Object.keys(datas[0]);
    let columns = [];
    object.forEach((element) => {
      columns.push({
        name: element,
        label: element.toLocaleUpperCase(),
      });
    });
    return {
      columns: columns,
      data: datas,
    };
  }

  return datas;
};

export const timestamp = ()=>{
  const dateTime = new Date();
  return `${dateTime.getFullYear()}${pad(dateTime.getMonth()+1)}${pad(dateTime.getDate())}${pad(dateTime.getHours())}${pad(dateTime.getMinutes())}`
}

export const dateTime = ()=>{
 const dateTime = new Date();
 return `${dateTime.getFullYear()}-${pad(dateTime.getMonth()+1)}-${pad(dateTime.getDate())} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`
}
