/**
 * 创建循环链表节点
 */
var LList_cycle = function (){
	this.head = new Node('head');
	this.head.next = this.head;
	this.find = find;
	this.insert = insert;
	this.display = display;
	this.findPrevious = findPrevious;
	this.remove = remove;
}
/**
 * 循环列表中的display()方法
 */
var display = function (){
	var currNode = this.head;
	while (currNode.next != null && currNode.next.element != "head"){
		console.log(currNode.next.element);
		currNode = currNode.next;
	}
}