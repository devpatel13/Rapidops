class TreeNode {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      this._recursiveInsert(this.root, value);
    }
  }

  _recursiveInsert(node, value) {
    if (node.value > value) {
      if (!node.left) node.left = new TreeNode(value);
      else this._recursiveInsert(node.left, value);
    } else {
      if (!node.right) node.right = new TreeNode(value);
      else this._recursiveInsert(node.right, value);
    }
  }
}

const tree = new BinaryTree();
// const heap = new Heap();

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    // Swap arr[i] with arr[largest]
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

function treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    const value = node?.value;
    if (value && value !== null) result.push(value);
    if (node) {
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  return result;
}

function heapSort() {
  const arr = treeToArray(tree.root);
  arr.sort();
  const n = arr.length;
  console.log(arr);

  //   // Start from the last non-leaf node and heapify all nodes
  //   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
  //     heapify(arr, n, i);
  //   }
  //   arr.unshift(null);
  //   console.log(arr);
  document.getElementById("root").innerHTML = "";
  renderHeap(arr, n - 1, "root");
}

function addNode() {
  const value = +document.getElementById("nodeInput").value;
  tree.insert(value);
  console.log(tree);
  document.getElementById("root").innerHTML = "";
  render(tree.root, "root");
}

function renderHeap(arr, index, id) {
  if (arr[index] === undefined || arr[index] === null) {
    document.getElementById(id).innerText = "null";
    return;
  }
  let parent = document.getElementById(id);
  const newA = document.createElement("a");
  let newUl;
  if (parent.querySelector("ul") !== null) newUl = parent.querySelector("ul");
  else newUl = document.createElement("ul");
  const newLiLeft = document.createElement("li");
  const newLiRight = document.createElement("li");
  newLiLeft.id = `${id}Left`;
  newLiRight.id = `${id}Right`;
  newA.innerText = arr[index];
  newUl.append(newLiLeft, newLiRight);
  parent.append(newA, newUl);
  renderHeap(arr, index - 1, `${id}Left`);
  renderHeap(arr, index - 2, `${id}Right`);
}

function render(node, id) {
  if (!node) {
    document.getElementById(id).innerText = "null";
    return;
  }
  let parent = document.getElementById(id);
  const newA = document.createElement("a");
  let newUl;
  if (parent.querySelector("ul") !== null) newUl = parent.querySelector("ul");
  else newUl = document.createElement("ul");
  const newLiLeft = document.createElement("li");
  const newLiRight = document.createElement("li");
  newLiLeft.id = `${id}Left`;
  newLiRight.id = `${id}Right`;
  newA.innerText = node.value;
  newUl.append(newLiLeft, newLiRight);
  parent.append(newA, newUl);
  render(node.left, `${id}Left`);
  render(node.right, `${id}Right`);
}
