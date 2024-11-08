import { NodeRBT } from "./node_rbt";

export class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private printNode(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf)
            this.printNode(nodo.getLeftChild());
        console.log(nodo.getData() + "(" + nodo.getColor() + ")");
        if (nodo?.getRightChild() !== this.leaf)
            this.printNode(nodo.getRightChild());
    }
    
    private inordenTraversal(nodoActual: NodeRBT): void{
      if (nodoActual != this.leaf){
        this.inordenTraversal(nodoActual.getLeftChild())
        console.log(nodoActual.getData() + "(" + nodoActual.getColor() + ")")
        this.inordenTraversal(nodoActual.getRightChild())
      }  
    }
    
    public inorden(): void{
      return this.inordenTraversal(this.root)
    }
    public printAll(): void {
        this.printNode(this.root);
    }
  
    private searchNode(nodoActual: NodeRBT, buscado: number): void | string{
      if (nodoActual != this.leaf){
        if (nodoActual.getData() == buscado)
          return String(nodoActual.getData()) + "(" + String(nodoActual.getColor()) + ")"
        else if (buscado > nodoActual.getData())
          return this.searchNode(nodoActual.getRightChild(), buscado)
        else if (buscado < nodoActual.getData())
          return this.searchNode(nodoActual.getLeftChild(), buscado)
      }
      return "-1"
    }
    public insert(data: number): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }
    public search(buscado: number):void | string{
      return this.searchNode(this.root, buscado);
    }
}
