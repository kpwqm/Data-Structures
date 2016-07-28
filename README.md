#Data Structures & Algorithms with JavaScript
##Directory  

[1.栈 - Stack](#stack)  
[2.列表 - List](#list)     
[3.队列 - Queue](#queue)    
[4.链表 - LinkedList](#LinkedList)


<a name="stack"></a>
##栈 - Stack
栈，是一种后进先出(LIFO)的数据结构，只能在栈顶添加或删除，所以如果对对象进行添加或删除等操作使用栈更友好。但在查找数据操作方面不那么友好。
###如下面实现栈类的实现代码
```javascript

var push = function(element){
  this.dataStore[this.top++] = element;
}
var peek = function(){
  return this.dataStore[this.top - 1];
}
var pop = function(){
  return this.dataStore[--this.top];
}
var clear = function(){
  this.top = 0;
}
var length = function(){
  return this.top;
}
var Stack = function(){
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.length = length;
}

```
此外，在学习中会提到一种情况。回文(一个单词、短语、数字，正序倒序排列一样)，使用栈可以轻松判断一个字符串是否回文。
以下是方法的实现。
```javascript

var isPalindrome = function (word){
  var s = new Stack();
  for (var i = 0; i < word.length; i++){
    s.push(word[i]);
  }
  var rword = "";
  while (s.length() > 0){
    rword += s.pop();
  }
  if (word == rword){
    return true;
  }else{
    return false;
  }
}

```
使用栈模拟递归过程
```javascript
//模拟阶乘
var factorial =  function (n){
  var s = new Stack();
  while (n > 1) {
    s.push(n--);
  }
  var product = 1;
  while (s.length > 0) {
    product *= s.pop();
  }
  return product;
}
```

<a name="list"></a>
##列表 - List
列表是一组有序的数据，每个数据项称为元素。对于javascript，列表中的元素可以是任意数据类型。列表能保存元素的数量并没有理论上的限定，但其数量受程序内存的限制。
列表用于数据结构不那么复杂的情况，例如当不需要在一个很长的序列中查找元素或者排序时，列表显得龙为有用。


 ###列表List类的实现代码
 ```javascript
var append = function (element){	//给列表添加元素
	this.dataStore[this.listSize++] = element;
}
var find = function (element){	//在列表中查找某一元素
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		if (this.dataStore[i] == element){
			return i;
		}
	}
	return -1;
}
var contains = function (element){	//判断给定值是否在列表中
	for (var i = 0, l = this.dataStore.length; i++){
		if (this.dataStore[i] == element){
			return true;
		}
	}
	return false;
}
var remove = function (element){	//在列表中删除元素
	var index = this.find(element);
	if (~index){
		this.dataStore.splice(index, 1);
		--this.listSize;
		return true;
	}
	return false;
}
var length = function (){	//列表中有多少个元素
	return this.listSize;
}
var toString = function (){	//显示列表中的元素
	return this.dataStore;
}
var insert = function (element, after){	//向列表中插入一个元素
	var insertPos = this.find(after);
	if (!insertPos){
		this.dataStore.splice(insertPos+1, 0, element);
		this.listSize++;
		return true;
	}
	return false;
}
var clear = function (){	//清空列表中所有的元素
	delete this.dataStore;
	this.dataStore.length = 0;
	this.listSize = this.pos = 0;
}
var List = function (){
	this.dataStore = [];	//初始化一个空数组用来保存列表元素
	this.listSize = 0;
	this.pos = 0;
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.contains = contains;
}
```
###使用迭代器访问列表
和使用数据索引的方式对比，使用迭代器的几个优点：
1.使用迭代器，访问列表元素时不必关心底层的数据结构。
2.当为列表添加一个新的元素时，索引的值就不对了，此时只用更新列表，而不用更新迭代器。
3.可以用不同类型的数据存储方式实现cList类，迭代器为访问列表里的元素提供了一种统一的方式
###例子
```javascript
for (names.front(); names.currPos() < names.length(); names.next()){
  //循环从第一个元素开始，当currPos的值小于列表的长度，每一次循环都调用next()方法将当前位置向前移动一位
  console.log(names.getElement());
}

//从后向前遍历列表
for (names.end(); names.currPos() >= 0; names.prev()){
  //循环从列表的最后一个元素开始，当当前位置大于或等于0时，调用prev()方法后移一位
  console.log(names.getElement());
}
```
迭代器只用来在列表上随意移动元素，而不应该和任何为列表增加或删除元素的方法一起使用。

<a name="queue"></a>
##队列 - Queue
队列是一种列表的实现，先进先出(FIFO)。与栈不一样。队列主要两种操作：插入操作(入队,在队尾插入新元素)，删除操作(出队，在队头删除元素)。
###如下面实现栈类的实现代码
```javascript

var enqueue = function (element){
  this.dataStore.push(element);
}
var dequeue = function (){
  return this.dataStore.shift();
}
var front = function (){
  return this.dataStore[0];
}
var back = function (){
  return this.dataStore[this.dataStore.length - 1];
}
var toString = function (){
  var retStr = "";
  for (var i = 0; i < this.dataStore.length; i++){
    retStr += this.dataStore[i] + "\n";
  }
  return retStr;
}
var empty = function (){
  if (this.dataStore.length == 0){
    return true;
  }else{
    return false;
  }
}
var Queue = function(){
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.front = front;
  this.back = back;
  this.toString = toString;
  this.empty = empty;
}

```
这次的数据结构知识学习，主要原因是在工作中是遇到需要排序的问题。因此对于排序方面的知识比较敏感。在书中提到可以使用队列来模拟**基数排序**。什么是基数排序呢，某科解释：基数排序（radix sort）属于“分配式排序”（distribution sort），又称“桶子法”，顾名思义，它是透过键值的部份资讯，将要排序的元素分配至某些“桶”中，藉以达到排序的作用，基数排序法是属于稳定性的排序，其时间复杂度为O (nlog(r)m)，其中r为所采取的基数，而m为堆数，在某些时候，基数排序法的效率高于其它的稳定性排序法。  

例如对0~99的数字进行排序，排序过程需要对数集扫描两次。先扫描个位上的数字进行排序，然后扫描十位上的数字进行排序，然后每个数字放到不同的“桶”中。
###如下面的实现代码
```javascript
var distribute = function (nums, queues, n, digit){
  for (var i = 0; i < n; ++i){
    if (digit == 1){
      queues[nums[i] % 10].enqueue(nums[i]);
    }else{
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
    }
  }
}  
var collect = function (queues, nums){
  var i = 0;
  for (var digit = 0; digit < 10; ++digit){
    while (!queues[digit].empty()) {
      nums[i++] = queues[digit].dequeue();
    }
  }
}  
var dispArray = function (arr){
  var putstr = [];
  for (var i = 0; i < arr.length; ++i){
    putstr += arr[i] + " ";
  }
  return putstr;
}
```

<a name="LinkedList"></a>
##链表 - LinkedList  
###定义  
链表是由一组*节点*组成的集成。每个节点都使用一个对象的引用指向它的后一个节点，指向另一个节点的引用叫做*链*。
###基于对象的链表
此链表为单向链表(过后会有双向链表，循环链表)，包含两个类。Node类用来表示节点，LinkedList类提供了插入节点、删除节点、显示列表元素、以及其他一些辅助方法。
如下面的实现代码
```javascript
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
	this.display = display;
	this.findPrevious = findPrevious;
	this.remove = remove;
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
/**
 * remove() - 删除节点
 * 从链表中删除节点时，是使待删除节点的前面的节点的next属性指向待删除节点的下一个节点。
 * 因此需要先从链表中找到待删除节点前面的节点，这里定义findPrevious()方法。然后修改其next属性。
 */
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
```
###双向链表
上面提到的是单向链表，从其头节点遍历到尾节点很容易，但反过来从后向前遍历则没那么简单。则需要给Node对象增加一个previous属性，使其指向前驱节点。
此时向链表插入一个新的节点需要更多的工作——需要指出该节点正确的前驱和后继。但是从链表中删除节点时，不需要查找前驱节点，只需要设置该节点前驱的next属性指向待删除节点的后继节点，设置该节点后继的previous属性指向待删除节点的前驱节点。
实现代码如下  
```javascript
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
```

###循环链表  
循环链表和单向鍡相似，节点类型都是一样的。两者唯一区别是在创建循环链表时，让其头节点的next属性指向它本身。
这样在创建每个节点时next属性都指向链表的头节点。就是说链表的尾节点指向头节点形容一个循环链表。
代码如下
```javascript
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
```
###拓展
advance(n)  //在链表中向前移动n个节点
back(n) //在双向链表中向后移动n个节点
show()  //只显示当前节点
