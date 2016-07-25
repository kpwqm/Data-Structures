/**
 * [Node 类]
 * @param element [保存节点上的数据]
 * @param next [保存指向下一个节点的链接]
 */
var Node = function (element){
	this.element = element;
	this.next = null;
}
/**
 * [LinkedList 类]
 * 该类包括有插入、删除节点，在列表中查找相应的值等功能
 * 链表只有一个属性——使用一个Node对象来保存该链表的头节点
 */
var LinkedList = function (){
	this.head = new Node("head");
	this.find = find;
	this.insert = insert;
	this.remove = remove;
	this.display = display;
}
/**
 * 插入新节点 - insert()
 * 该方法向链表插入一个节点，插入时需要明确指出要在哪个节点前面或后面插入
 * 在已知节点后面插入元素时，先要找到“后面”的节点。此时需要辅助find()
 * find() - 该方法遍历链表，查找给定的数据。如果找到则返回保存该数据的节点。
 */
var find = function (item){
	var currNode = this.head;
	while (currNode.element != item) {
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
/**
 * display() - 该方法用来显示链表中的元素
 * 该方法先将列表的头节点赋给一个变量，然后循环遍历链表，当前节点的next属性为null时循环结束。
 */
var display = function (){
	var currNode = this.head;
	while (!(currNode.next == null)) {
		console.log(currNode.next.element);
		currNode = currNode.next;
	}
}