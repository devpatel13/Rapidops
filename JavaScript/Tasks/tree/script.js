$(document).ready(function () {
  var $nodeCount = null;
  $("#family-tree").on("click", "a", function () {
    $(this).toggleClass("toggleBtn");
    if ($(this).hasClass("toggleBtn")) {
      $(this).after('<button class="addBtn">+</button>');
      $(this).after('<button class="subtractBtn">-</button>');
      $(this).after('<button class="moveBtn">Move</button>');
      $(this).after('<button class="mergeBtn">Merge</button>');
    } else {
      $(this).nextAll("button").remove();
    }
  });

  $("#family-tree").on("click", ".addBtn", function () {
    var $parent = $(this).parent();
    console.log($parent);
    if ($parent.find("ul").length) {
      const value = prompt("Enter node name:");
      if (value !== null) {
        const $newLi = $("<li>").addClass("leafNode");
        const $newA = $("<a>").text(value);
        $nodeCount++;
        $newA.attr("id", value);
        $newLi.append($newA);

        // Append the new <li> to the next <ul> element
        $(this).next("ul").append($newLi);
        console.log("Node added successfully");
      }
    } else if ($parent.hasClass("leafNode")) {
      const value = prompt("Enter node name:");
      if (value !== null) {
        $parent.removeClass("leafNode").addClass("nonLeafNode");
        const $newLi = $("<li>").addClass("leafNode");
        const $newUl = $("<ul>");
        const $newA = $("<a>").text(value);
        $nodeCount++;
        $newA.attr("id", value);

        $newLi.append($newA);
        $newUl.append($newLi);

        $(this).parent().append($newUl);
        console.log("Node added successfully");
      }
    } else {
      alert("leaf node");
    }
  });

  // Add functionality for other buttons (subtract, move, merge)
  $("#family-tree").on("click", ".subtractBtn", function () {
    $(this).parent().remove();
  });

  $("#family-tree").on("click", ".moveBtn", function () {
    value = prompt("Enter the node id:");
    if ($(`#${value}`).parent().hasClass("nonLeafNode")) {
      $(`#${value}`).parent().find("ul").append($(this).parent());
      console.log("Node added successfully non");
    } else if ($(`#${value}`).parent().hasClass("leafNode")) {
      console.log($(`#${value}`).parent());
      const $newUl = $("<ul>");
      $newUl.append($(this).parent());
      $(`#${value}`).parent().append($newUl);
      console.log("Node added successfully");
    } else {
      alert("leaf node");
    }
  });

  $("#family-tree").on("click", ".mergeBtn", function () {
    value = prompt("Enter the node id:");
    console.log($(`#${value}`).parent());
    if ($(`#${value}`).parent().hasClass("nonLeafNode")) {
      if ($(this).parent().find("ul").length) {
        $(`#${value}`)
          .parent()
          .find("ul")
          .append($(this).parent().find("ul")[0]);
        console.log("Node added successfully non");
      }
      $(this).parent().remove();
    } else if ($(`#${value}`).parent().hasClass("leafNode")) {
      console.log($(`#${value}`).parent());
      $(`#${value}`).parent().removeClass("leafNode").addClass("nonLeafNode");
      const $newUl = $("<ul>");
      $newUl.append($(this).parent().find("ul")[0]);
      $(`#${value}`).parent().append($newUl);
      console.log("Node added successfully");
      $(this).parent().remove();
    } else {
      alert("leaf node");
    }
  });
});

class TreeNode {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.children = [];
  }

  addChild(childNode) {
    childNode.parent = this;
    this.children.push(childNode);
  }
}

function buildTree(nodeElement) {
  const treeNode = new TreeNode(nodeElement.querySelector("a").textContent);
  const ulElement = nodeElement.querySelector("ul");
  if (ulElement) {
    ulElement.childNodes.forEach((childNode) => {
      if (childNode.nodeType === 1) {
        // Check if it's an element node
        const liElement = childNode;
        const childTreeNode = buildTree(liElement);
        treeNode.addChild(childTreeNode);
      }
    });
  }
  return treeNode;
}

function saveData() {
  const familyTree = buildTree(document.getElementById("family-tree"));
  localStorage.setItem("familyTree", JSON.stringify(treeNode));
  console.log(familyTree);
}
function renderTree(treeNode, parentElement) {
  const liElement = document.createElement("li");
  const aElement = document.createElement("a");
  aElement.textContent = treeNode.value;
  liElement.appendChild(aElement);

  if (treeNode.children.length === 0) {
    liElement.classList.add("leafNode");
  } else {
    liElement.classList.add("nonLeafNode");
    const ulElement = document.createElement("ul");
    treeNode.children.forEach((childNode) => {
      renderTree(childNode, ulElement);
    });
    liElement.appendChild(ulElement);
  }

  parentElement.appendChild(liElement);
}
