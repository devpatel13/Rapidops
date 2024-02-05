// 14. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ print​​ array​ ​ of​ ​ object​ ​ in​ ​ ascending​ ​ order​ ​ of​ ​ age, &
// descending​ ​ order​ ​ of​ ​ name.​ ​ Make​ ​ array​ ​ of​ ​ object​ ​ with​ ​ three​ ​ fields​ ​which are​​:
// 1.​ ​ Id,​ ​
// 2.​ ​ Name,​ ​
// 3.  Age

let objArr = [];
for (let i = 0; i < 10; i++) {
  let obj = {};
  obj.id = i;
  if (i > 4 && i < 9) obj.age = 10;
  else obj.age = Math.round(Math.random() * 100);

  obj.name = `name${i}`;
  objArr.push(obj);
}

function sortObjArray(objArr) {
  objArr.sort((obj1, obj2) => {
    if (obj1.age > obj2.age) return 1;
    else if (obj1.age < obj2.age) return -1;
    else {
      if (obj1.name > obj2.name) return -1;
      else return 0;
    }
  });
  return objArr;
}

console.log(sortObjArray(objArr));
