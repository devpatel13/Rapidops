let nameList = [];
let namesMap = new Map();
let totalRows = 0;
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
  fname.value = "";
  lname.value = "";
  document.getElementById("nameList").innerHTML = innerHtml;
  totalRows++;
  updateSelectedCheckboxCount();
  console.log(namesMap);
}

function clickEvent(event) {
  //   console.log(event.target.value);
  if (event.target.value === "edit") {
    editName(event.target.closest(".row").id);
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
    document.getElementById("rowCount").innerHTML = ` ${totalSelectedRows} `;
    if (totalSelectedRows === totalRows) {
      document.getElementById("deleteChecked").disabled = false;
      document.getElementById("allChecked").checked = true;
    } else {
      document.getElementById("deleteChecked").disabled = true;
      document.getElementById("allChecked").checked = false;
    }
  }
}

function editName(fullName) {
  console.log(nameList);
  let deleteBtns = document.querySelectorAll(".delete");
  for (let deleteBtn of deleteBtns) {
    deleteBtn.disabled = false;
  }
  document.querySelector(`#${fullName} .delete`).disabled = true;
  console.log(document.querySelector(`#${fullName}Checked`));
  document.querySelector(`#${fullName}Checked`).disabled = true;
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
  totalRows--;
  updateSelectedCheckboxCount();
  console.log(nameList);
  console.log(namesMap);
}

function updateName(event) {
  let fnameValue = fname.value;
  let lnameValue = lname.value;
  let fullName = event.target.value;

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
    document.querySelector(`#${fullName}Checked`).disabled = false;
    return;
  }

  let newFullName = fnameValue.toLowerCase() + lnameValue.toLowerCase();

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
    fname[0].toUpperCase() + fname.slice(1).toLowerCase();
  targetElements[1].innerText =
    lname[0].toUpperCase() + lname.slice(1).toLowerCase();
  nameList[namesMap.get(fullName)] = {
    fname: fname[0].toUpperCase() + fname.slice(1).toLowerCase(),
    lname: lname[0].toUpperCase() + lname.slice(1).toLowerCase(),
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
  console.log(nameList);
  console.log(namesMap);
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
    nameList = [];
    namesMap.clear();
    document.getElementById("allChecked").checked = false;
    console.log(nameList);
    console.log(namesMap);
  }
  let allCheckboxes = document.querySelectorAll(".checkbox");
  for (let checkbox of allCheckboxes) {
    if (checkbox.checked) {
      let fullName = checkbox.id.split("Checked")[0];
      nameList.splice(namesMap.get(fullName), 1);
      document.getElementById(fullName).remove();
      let tempMap = new Map();
      nameList.forEach((name, index) => {
        tempMap.set(name.fullName, index);
      });
      namesMap = tempMap;
      console.log(nameList);
      console.log(namesMap);
      console.log(fullName);
    }
  }
}
