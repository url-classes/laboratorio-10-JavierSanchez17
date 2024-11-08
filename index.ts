import { RBTree } from "./rbt";

const myRBTree: RBTree = new RBTree();
myRBTree.insert(7);
myRBTree.insert(15);
myRBTree.insert(11);
myRBTree.insert(20);
myRBTree.insert(30);
myRBTree.insert(50);
myRBTree.insert(45);
myRBTree.printAll();

console.log("\nBuscaremos el nodo 30: ")
let encontrado = myRBTree.search(30)

if (encontrado != "-1")
  console.log("Nodo encontrado: "+encontrado)
else
  console.log("Nodo no encontrado")
  
console.log("\nRecorrido In-orden")
myRBTree.inorden()
