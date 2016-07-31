var Node = function (element){
	this.element = element;
	this.next = null;
}
var LList = function (){
	this.head = new Node('head');
	this.find = find;
	this.insert = insert;
	this.display = display;
	this.findPrevious = findPrevious;
	this.remove = remove;
}
var findPrevious = function (item){
	var currNode = this.head;
	while (currNode.next != null && currNode.next.element != item){
		currNode = currNode.next;
	}
	return currNode;
}
var remove = function (item){
	var prevNode = this.findPrevious(item);
	if (prevNode.next != null){
		prevNode.next = prevNode.next.next;
	}
}
var display = function (){
	var currNode = this.head;
	while (currNode.next != null){
		console.log(currNode.next.element);
		currNode = currNode.next;
	}
}
var find = function (item){
	var currNode = this.head;
	while (currNode.element != item){
		currNode = currNode.next;
	}
	return currNode;
}
var insert = function (newElement, item){
	var newNode = new Node(newElement);
	var current = this.find(item);
	newNode.next = current.next;
	current.next = newNode;
}

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();