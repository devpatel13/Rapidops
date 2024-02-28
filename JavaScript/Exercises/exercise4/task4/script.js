let fullNameList = [];
let map = new Map();
let totalRows = 0;

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
    <div class="col-1 d-flex border border-secondary text-bg-light justify-content-center">
    <input type="checkbox" class="checkbox" value="rowCheckbox" name="${names.fullName}Checked" id="${names.fullName}Checked" />
  </div>
          <div class="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
          <div>
          </div>
          <div>
            ${names.fname}
            </div>
          </div>
          <div class="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
          ${names.lname}
          </div>
          <div class="col-2 d-flex justify-content-end">
            <button type="button" class="btn btn-info me-1 btn-sm px-3 edit" value="edit">
              Edit
            </button>
            <button type="button" class="btn btn-danger btn-sm delete" value="delete" disabled>
              Delete
            </button>
          </div>
        </div>`;
  }
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("nameList").innerHTML = innerHtml;
  totalRows++;
  updateSelectedCheckboxCount();
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
  if (event.target.value === "rowCheckbox") {
    updateSelectedCheckboxCount();
  }
  if (event.target.value === "allChecked") {
    if (event.target.checked) allChecked(true);
    else allChecked(false);
  }
  if (event.target.value === "deleteChecked") deleteChecked();
}

function updateSelectedCheckboxCount() {
  let allCheckboxes = document.querySelectorAll(".checkbox");
  let totalSelectedRows = 0;
  for (let checkbox of allCheckboxes) {
    let fullName = checkbox.id.split("Checked")[0];
    if (checkbox.checked) {
      totalSelectedRows++;
      document.querySelector(`#${fullName} .edit`).disabled = true;
      document.querySelector(`#${fullName} .delete`).disabled = false;
    } else {
      document.querySelector(`#${fullName} .delete`).disabled = true;
      document.querySelector(`#${fullName} .edit`).disabled = false;
    }
    document.getElementById("rowCount").innerHTML = totalSelectedRows;
    if (totalSelectedRows === totalRows)
      document.getElementById("allChecked").checked = true;
    else document.getElementById("allChecked").checked = false;
  }
}

function deleteName(event) {
  fullName = event.id;
  fullNameList.splice(map.get(fullName), 1);
  let tempMap = new Map();
  fullNameList.forEach((name, index) => {
    tempMap.set(name.fullName, index);
  });
  map = tempMap;
  document.getElementById(fullName).remove();
  totalRows--;
  updateSelectedCheckboxCount();
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

function allChecked(flag) {
  if (flag) {
    document.getElementById("rowCount").innerHTML = totalRows;
    let deleteBtns = document.querySelectorAll(".delete");
    for (let btn of deleteBtns) {
      btn.disabled = false;
    }
    let editBtns = document.querySelectorAll(".edit");
    for (let btn of editBtns) {
      btn.disabled = true;
    }
  } else {
    document.getElementById("rowCount").innerHTML = 0;
    let deleteBtnsBtns = document.querySelectorAll(".delete");
    for (let btn of deleteBtnsBtns) {
      btn.disabled = true;
    }
    let editBtns = document.querySelectorAll(".edit");
    for (let btn of editBtns) {
      btn.disabled = false;
    }
  }
  let allCheckboxes = document.querySelectorAll(".checkbox");
  for (let checkbox of allCheckboxes) {
    checkbox.checked = flag;
  }
}

function deleteChecked() {
  if (document.getElementById("allChecked").checked) {
    document.getElementById("nameList").innerHTML = "";
    fullNameList = [];
    map.clear();
    document.getElementById("allChecked").checked = false;
    console.log(fullNameList);
    console.log(map);
  }
  let allCheckboxes = document.querySelectorAll(".checkbox");
  for (let checkbox of allCheckboxes) {
    if (checkbox.checked) {
      let fullName = checkbox.id.split("Checked")[0];
      fullNameList.splice(map.get(fullName), 1);
      document.getElementById(fullName).remove();
      let tempMap = new Map();
      fullNameList.forEach((name, index) => {
        tempMap.set(name.fullName, index);
      });
      map = tempMap;
      console.log(fullNameList);
      console.log(map);
      console.log(fullName);
    }
  }
}
