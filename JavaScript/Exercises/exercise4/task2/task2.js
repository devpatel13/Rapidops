let fullNameList = [];
let map = new Map();

function addName() {
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  if (!fname || !lname) {
    alert("Name cannot be null");
    return;
  }
  let fullNameKey = fname.toLowerCase() + lname.toLowerCase();
  if (map.has(fullNameKey)) {
    alert("Name cannot be same");
    return;
  }
  let index =
    fullNameList.push({
      fname: fname[0].toUpperCase() + fname.slice(1).toLowerCase(),
      lname: lname[0].toUpperCase() + lname.slice(1).toLowerCase(),
      fullName: fullNameKey,
    }) - 1;
  map.set(fullNameKey, index);
  let innerHtml = "";

  for (let names of fullNameList) {
    innerHtml += `<div class="row justify-content-around column-gap-3" id="${names.fullName}">
          <div class="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
            ${names.fname}
          </div>
          <div class="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
          ${names.lname}
          </div>
          <div class="col-2 d-flex justify-content-end">
            <button type="button" class="btn btn-info me-1 btn-sm px-3 edit" value="edit">
              Edit
            </button>
            <button type="button" class="btn btn-danger btn-sm delete" value="delete">
              Delete
            </button>
          </div>
        </div>`;
  }
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("nameList").innerHTML = innerHtml;
  console.log(map);
}

function edit(event) {
  //   console.log(event.target.value);
  if (event.target.value === "edit") {
    let fullName = event.target.closest(".row").id;
    console.log(fullNameList);
    document.getElementById("fname").placeholder =
      fullNameList[map.get(fullName)].fname;
    document.getElementById("lname").placeholder =
      fullNameList[map.get(fullName)].lname;
    let addButton = document.getElementById("addBtn");
    addButton.hidden = true;
    document.getElementById("updateBtn").hidden = false;
    document.getElementById("updateBtn").value = fullName;
    // let editButtons = document.querySelectorAll('.edit')
    // let deleteButtons = document.querySelectorAll('.delete')
    // for(let btn of editButtons){
    //     btn.disabled
    // }
  }
  if (event.target.value === "delete") deleteName(event.target.closest(".row"));
}

function deleteName(event) {
  fullName = event.id;
  fullNameList.splice(map.get(fullName), 1);
  document.getElementById(fullName).remove();
  map.delete(fullName);
  console.log(fullNameList);
  console.log(map);
}

function updateName(event) {
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  if (!fname || !lname) {
    alert("Name cannot be null");
    return;
  }
  let newFullName = fname.toLowerCase() + lname.toLowerCase();
  if (map.has(newFullName)) {
    alert("Name already exists");
    return;
  }
  let fullName = event.target.value;
  let targetElements = document.getElementById(fullName).children;
  targetElements[0].innerText =
    fname[0].toUpperCase() + fname.slice(1).toLowerCase();
  targetElements[1].innerText =
    lname[0].toUpperCase() + lname.slice(1).toLowerCase();
  fullNameList[map.get(fullName)] = {
    fname: fname[0].toUpperCase() + fname.slice(1).toLowerCase(),
    lname: lname[0].toUpperCase() + lname.slice(1).toLowerCase(),
    fullName,
  };
  document.getElementById(fullName).id = newFullName;
  map.set(newFullName, map.get(fullName));
  map.delete(fullName);
  document.getElementById("fname").placeholder = "";
  document.getElementById("lname").placeholder = "";
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("updateBtn").hidden = true;
  document.getElementById("addBtn").hidden = false;
  console.log(fullNameList);
  console.log(map);
}
