/**
 * 双向链表，本质上是给Node节点对象添加previous属性。
 */
var Node = function (element){
	this.element = element;
	this.next = null;
	this.previous = null;
}
/**
 * insert()
 * 双向链表的insert()方法和单向链表的类似，但双向链表需要设置新节点的previoius属性，使其指向该节点的前驱。
 */
var insert = function (newElement, item){
	var newNode = new Node(newElement);
	var current = this.find(item);
	newNode.next = current.next;
	newNode.previous = current;
	current.next = newNode;
}
/**
 * remove()
 * 双向链表的删除节点时不需要查找前驱节点，因此比单向链表的效率更高。
 * 首先找到待删除节点，然后设置该节点前驱的next属性指向待删除节点的后继；
 * 设置该节点后继的previous属性指向待删除节点的前驱。
 */
var remove = function (item){
	var currNode = this.find(item);
	if (currNode.next != null){
		currNode.previous.next = currNode.next;
		currNode.next.previous = currNode.previous;
		currNode.next = null;
		currNode.previous = null;
	}
}
/**
 * findLast() - 找出链表中的最后一个节点。
 */
var findLast = function (){
	var currNode = this.head;
	while (currNode.next != null){
		currNode = currNode.next;
	}
	return currNode;
}
/**
 * dispReverse() - 反序显示双向链表中的元素
 */
var dispReverse = function (){
	var currNode = this.head;
	currNode = this.findLast();
	while (currNode.previous != null){
		console.log(currNode.element);
		currNode = currNode.previous;
	}
}