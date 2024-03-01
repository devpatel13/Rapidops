// let uniqueNameSet = new Set();

// for (let name of namesArray) {
//   uniqueNameSet.add(name.fname);
//   uniqueNameSet.add(name.lname);
// }

// console.log(uniqueNameSet);

const namesArray = [
  { name: "Ashish Shah" },
  { name: "Rashmin Chhatrala" },
  { name: "Yash Dubey" },
  { name: "Prakash Jain" },
  { name: "Yashraj Singh" },
  { name: "Viraj Sinha" },
  { name: "Rajesh Kumar" },
  { name: "Mahesh Marwadi" },
  { name: "Suresh Sahni" },
  { name: "Amar Vilas" },
  { name: "Virdas Singhania" },
  { name: "Rajeshwari Bindra" },
  { name: "Birendra Bhalerao" },
  { name: "Virendra Bhupati" },
  { name: "Bhupendra Singh" },
  { name: "Bhuvam Bam" },
  { name: "Shri Raj" },
  { name: "Prashant Kamle" },
  { name: "Kamlesh Tomar" },
  { name: "Risabh Khare" },
  { name: "Rishi Kohli" },
  { name: "Kunwar Kharwanda" },
  { name: "Kartik Koli" },
  { name: "Komal Jain" },
  { name: "Kartikey Pandey" },
];

// const namesArray = [{ name: "Ashish" }, { name: "Rashmin" }, { name: "Yash" }];

const namesLowerCase = [];
for (let elem of namesArray) {
  namesLowerCase.push({ name: elem.name.toLowerCase() });
}

let searchBar = document.getElementById("searchBar");

function searchNames() {
  let searchKey = searchBar.value.toLowerCase();
  let searchResults = document.getElementById("searchResults");
  //   console.log(searchBar.value);
  if (searchKey === " ") {
    // searchResults.innerHTML = "";
    return;
  }
  if (searchKey === "") {
    searchResults.innerHTML = "";
    return;
  }
  let tempElem = document.createElement("div");
  namesLowerCase.forEach((elem, index) => {
    if (elem.name.includes(searchKey)) {
      let pElem = document.createElement("p");
      let span = document.createElement("span");
      let prefixIndex = namesLowerCase[index].name.indexOf(searchKey);
      let suffixIndex =
        namesLowerCase[index].name.indexOf(searchKey) + searchKey.length;
      let prefix = namesArray[index].name.slice(0, prefixIndex);
      let suffix = namesArray[index].name.slice(suffixIndex);
      span.style.color = "red";
      span.innerHTML = namesArray[index].name.slice(prefixIndex, suffixIndex);
      pElem.append(prefix);
      pElem.append(span);
      pElem.append(suffix);
      tempElem.append(pElem);
    }
  });
  searchResults.innerHTML = "";
  searchResults.append(tempElem);
}
