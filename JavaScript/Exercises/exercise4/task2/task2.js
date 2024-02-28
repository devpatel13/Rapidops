let nameList = [];
let namesMap = new Map();
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");

function addName() {
  let fnameValue = fname.value;
  let lnameValue = lname.value;
  if (!fnameValue || !lnameValue) {
    alert("Name cannot be null");
    return;
  }
  let fullNameKey = fnameValue.toLowerCase() + lnameValue.toLowerCase();
  if (namesMap.has(fullNameKey)) {
    alert("Name cannot be same");
    return;
  }
  let index =
    nameList.push({
      fname: fnameValue[0].toUpperCase() + fnameValue.slice(1).toLowerCase(),
      lname: lnameValue[0].toUpperCase() + lnameValue.slice(1).toLowerCase(),
      fullName: fullNameKey,
    }) - 1;
  namesMap.set(fullNameKey, index);
  let innerHtml = "";

  for (let names of nameList) {
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
  fname.value = "";
  lname.value = "";
  document.getElementById("nameList").innerHTML = innerHtml;
  console.log(namesMap);
}

function clickEvent(event) {
  if (event.target.value === "edit") {
    editName(event.target.closest(".row").id);
  }
  if (event.target.value === "delete") deleteName(event.target.closest(".row"));
}

function editName(fullName) {
  console.log(nameList);
  let deleteBtns = document.querySelectorAll(".delete");
  for (let deleteBtn of deleteBtns) {
    deleteBtn.disabled = false;
  }
  document.querySelector(`#${fullName} .delete`).disabled = true;
  fname.value = "";
  lname.value = "";
  fname.placeholder = nameList[namesMap.get(fullName)].fname;
  lname.placeholder = nameList[namesMap.get(fullName)].lname;
  let addButton = document.getElementById("addBtn");
  addButton.hidden = true;
  document.getElementById("updateBtn").hidden = false;
  document.getElementById("updateBtn").value = fullName;
}

function deleteName(event) {
  fullName = event.id;
  nameList.splice(namesMap.get(fullName), 1);
  let tempMap = new Map();
  nameList.forEach((name, index) => {
    tempMap.set(name.fullName, index);
  });
  namesMap = tempMap;
  document.getElementById(fullName).remove();
  console.log(nameList);
  console.log(namesMap);
}

function updateName(event) {
  let fnameValue = fname.value;
  let lnameValue = lname.value;
  if (!fnameValue || !lnameValue) {
    alert("Name cannot be empty, changes are not saved");
    fname.placeholder = "";
    lname.placeholder = "";
    fname.value = "";
    lname.value = "";
    document.getElementById("updateBtn").hidden = true;
    document.getElementById("addBtn").hidden = false;
    let deleteBtns = document.querySelectorAll(".delete");
    for (let deleteBtn of deleteBtns) {
      deleteBtn.disabled = false;
    }
    return;
  }
  let newFullName = fnameValue.toLowerCase() + lnameValue.toLowerCase();
  if (namesMap.has(newFullName)) {
    alert("Name already exists");
    return;
  }
  let fullName = event.target.value;
  let targetElements = document.getElementById(fullName).children;
  targetElements[0].innerText =
    fnameValue[0].toUpperCase() + fnameValue.slice(1).toLowerCase();
  targetElements[1].innerText =
    lnameValue[0].toUpperCase() + lnameValue.slice(1).toLowerCase();
  nameList[namesMap.get(fullName)] = {
    fname: fnameValue[0].toUpperCase() + fnameValue.slice(1).toLowerCase(),
    lname: lnameValue[0].toUpperCase() + lnameValue.slice(1).toLowerCase(),
    fullName,
  };
  document.getElementById(fullName).id = newFullName;
  namesMap.set(newFullName, namesMap.get(fullName));
  namesMap.delete(fullName);
  fname.placeholder = "";
  lname.placeholder = "";
  fname.value = "";
  lname.value = "";
  document.getElementById("updateBtn").hidden = true;
  document.getElementById("addBtn").hidden = false;
  console.log(nameList);
  console.log(namesMap);
}

// enable delete btn on update
