let staticArray = [
  {
    fname: "Emma",
    lname: "Davis",
  },
  {
    fname: "John",
    lname: "Harris",
  },
  {
    fname: "Charlotte",
    lname: "Anderson",
  },
  // {
  //   fname: "Daniel",
  //   lname: "White",
  // },
  // {
  //   fname: "Mia",
  //   lname: "White",
  // },
  // {
  //   fname: "Ava",
  //   lname: "Smith",
  // },
  // {
  //   fname: "Ava",
  //   lname: "Jones",
  // },
  // {
  //   fname: "Charlotte",
  //   lname: "Smith",
  // },
  // {
  //   fname: "Alexander",
  //   lname: "Jones",
  // },
  // {
  //   fname: "Benjamin",
  //   lname: "Miller",
  // },
  // {
  //   fname: "Ava",
  //   lname: "Thomas",
  // },
  // {
  //   fname: "William",
  //   lname: "Smith",
  // },
  // {
  //   fname: "Daniel",
  //   lname: "Wilson",
  // },
  // {
  //   fname: "Michael",
  //   lname: "White",
  // },
  // {
  //   fname: "Mia",
  //   lname: "Harris",
  // },
];

let nameList = [];
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");

let namesMap = new Map();

function render() {
  let innerHtml = "";
  let fullName;

  staticArray.forEach((name) => {
    fullName = name.fname.toLowerCase() + name.lname.toLowerCase();
    if (!namesMap.has(fullName)) {
      let index =
        nameList.push({
          fname:
            name.fname[0].toUpperCase() + name.fname.slice(1).toLowerCase(),
          lname:
            name.lname[0].toUpperCase() + name.lname.slice(1).toLowerCase(),
          fullName: fullName,
        }) - 1;
      namesMap.set(fullName, index);
    }
  });

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
  document.getElementById("nameList").innerHTML = innerHtml;
  document.getElementById("addBtn").disabled = false;
  console.log(nameList);
  console.log(namesMap);
}

function addName() {
  console.log(namesMap);
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
  document.getElementById("renderBtn").disabled = true;
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
  console.log(nameList);
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
    document.getElementById("renderBtn").disabled = false;

    return;
  }
  let newFullName = fnameValue.toLowerCase() + lnameValue.toLowerCase();
  let fullName = event.target.value;

  if (namesMap.has(newFullName)) {
    alert("Name already exists");
    fname.value = "";
    lname.value = "";
    fname.placeholder = nameList[namesMap.get(fullName)].fname;
    lname.placeholder = nameList[namesMap.get(fullName)].lname;

    return;
  }
  let targetElements = document.getElementById(fullName).children;
  targetElements[0].innerText =
    fnameValue[0].toUpperCase() + fnameValue.slice(1).toLowerCase();
  targetElements[1].innerText =
    lnameValue[0].toUpperCase() + lnameValue.slice(1).toLowerCase();
  nameList[namesMap.get(fullName)] = {
    fname: fnameValue[0].toUpperCase() + fnameValue.slice(1).toLowerCase(),
    lname: lnameValue[0].toUpperCase() + lnameValue.slice(1).toLowerCase(),
    fullName: newFullName,
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
  let deleteBtns = document.querySelectorAll(".delete");
  for (let deleteBtn of deleteBtns) {
    deleteBtn.disabled = false;
  }
  document.getElementById("renderBtn").disabled = false;

  console.log(nameList);
  console.log(namesMap);
}
