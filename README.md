#Data Structures & Algorithms with JavaScript
##Directory  

[1.栈 - Stack](#stack)  
[2.列表 - List](#list)     
[3.队列 - Queue](#queue)    
[4.链表 - LinkedList](#linkedlist)  
[5.字典 - Dictionary](#dictionary)  
[6.集合 - Set](#set)  
[7.散列 - Hash](#hash)  
[8.二叉树 - Binary Tree](#binarytree)  
[9.图 - Graph](#graph)  
[10.排序 - Sort](#sort)  


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

<a name="linkedlist"></a>
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
循环链表和单向链相似，节点类型都是一样的。两者唯一区别是在创建循环链表时，让其头节点的next属性指向它本身。
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

<a name="dictionary"></a>
##字典 - Dictionary  
字典是一种以键 - 值对的形式进行存储数据的数据结构。其Dictionary类的基础是Array类而不是Object类。
下面定义一个Dictionary类
```javascript
/**
 * 定义字典Dictionary类
 */
var Dictionary = function (){
	this.datastore = new Array();
	this.add = add;
	this.find = find;
	this.remove = remove;
	this.showAll = showAll;
	this.count = count;
	this.clear = clear;
}
/**
 * add() - 添加元素到字典
 */
var add = function (key, value){
	this.datastore[key] = value;
}
/**
 * find() - 查找指定key的元素
 */
var find = function (key){
	return this.datastore[key];
}
/**
 * remove() - 删除指定key的元素
 */
var remove = function (key){
	delete this.datastore[key];
}
/**
 * showAll() - 显示字典全部元素
 */
var showAll = function (){
	var datakeys = Array.prototype.slice.call(Object.keys(this.datastore));
	console.log('>>>>>>', datakeys)
	for(var key in datakeys){
		console.log(datakeys[key] + " -> " + this.datastore[datakeys[key]])
	}
}
/**
 * count() - 计算字典中元素个数
 * 为什么不用length属性呢，是因为当键的类型为字符串时，length属性无效。
 * var nums() = new Array();
 * nums[0] = 1;
 * nums[1] = 2;
 * console.log(nums.length);	//	2
 * ========================
 * var arr = new Array();
 * arr["man"] = 1;
 * arr["wu"] = 2;
 * console.log(arr.length);	//	0
 */
var count = function (){
	var n = 0;
	for(var key in Object.keys(this.datastore)){
		++n;
	}
	return n;
}
/**
 * clear() - 清空字典
 */
var clear = function (){
	for each (var key in Object.keys(this.datastore)){
		delete this.datastore[key];;
	}
}
```
另外，很多时候用户想要看到的是有序的数据，所以需要为Dictionary类添加排序功能。由于存在以字符串作为键的字典，则直接对数组排序是无效的。为了达到我们想要的排序效果，我们需要*从数组datastore拿到键后，调用sore()或者其他排序方法对键重新排序*，则返回排序的字典。  

思考：使用字典实现MapReduce中的单词计数的demo。

<a name="set"></a>
##集合 - Set  
集合是一种包含不同元素的数据结构，集合中的成员是无序的并且不允许相同成员存在。关注ES6的鞋单会知道，在ES6里新增加这种数据结构。类似于数组。
Set类的实现基于数组，数组用来存储数据。其中对集合的基本操作有 *并集*、*交庥*、*补集* 、*子集* 。
直接抛代码吧。下面定义Set()构造函数：
```javascript
var Set = function (){
	this.dataStore = [];
	this.add = add;
	this.remove = remove;
	this.show = show;
	this.size = size;
	this.contains = contains;
	this.union = union;
	this.intersect = intersect;
	this.subset = subset;
	this.difference = difference;
}
var add = function (data){
	if (!~this.dataStore.indexOf(data)){	//不存在成员
		this.dataStore.push(data);
		return true;
	}else {
		return false;
	}
}
var remove = function (data){
	var pos = this.dataStore.indexOf(data);
	if (~pos){	//存在成员
		this.dataStore.splice(pos, 1);
		return true;
	}else {
		return false;
	}
}
var show = function (){
	return this.dataStore;
}
var size = function (){
	return this.dataStore.length();
}
var contains = function (data){
	if (~this.dataStore.indexOf(data)){
		return true;
	}else{
		return false;
	}
}
/**
 * union() - 求两个集合的并集
 * 首先将第一个集合里的成员加入一个临时集合，然后判断第二个集合中的成员是否同时属于第一个集合，如果属于则跳过该成员，否则将该成员加入临时集合，最后返回此临时集合
 */
var union = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		tempSet.add(this.dataStore[i]);
	}
	for (var i = 0, l = set.dataStore.length; i < l; i++){
		if (!tempSet.contains(set.dataStore[i])){
			tempSet.dataStore.push(set.dataStore[i]);
		}
	}
	return tempSet;
}
/**
 * intersect() - 求两集合的交集
 * 当发现第一个集合的成员也属于第二个集合时，便将该成员加入一个新集合，循环后返回此新集合
 */
var intersect = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		if (set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}
/**
 * subset() - 判断集合是否为子集
 * 首先判断两集合的长度，如果该集合比待比较的集合还要大，则该集合肯定不会是待比较集合的一个子集
 * 当长度满足时，再判断集合内的成员是否属于待比较集合。若存在任意一个成员不属于待比较集合，则返回false
 */
var subset = function (set){
	if (this.size() > set.size()){
		return false
	}else{
		for each (var member in this.dataStore){
			if (!set.contains(member)){
				return false;
			}
		}
	}
	return true;
}
/**
 * difference() - 求两个集合的补集
 * 返回一个新集合，该集合包含的是那些属于第一个集合但不属于第二个集合的成员
 */
var difference = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		if (!set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}
```

<a name="hash"></a>
##散列 - Hash  
散列使用的数据结构叫散列表。在散列表上插入、删除和取用数据的效率都非常快，但在查找操作方面效率较低。往往查找等操作需要借助于其他数据结构。  
散列表是基于数组进行设计的。数组的长度是预先设定的，但有需要时可随时增加。所有元素根据和该元素对应的键，保存在数组的特定位置。  
理想状态下散列函数每个键值映射为一个唯一的数组索引。然而键是无限的，数组长度是有限的，所以现实的目标是让散列函数尽量将键均匀地映射到数组中。  
对于上面所说的状况，存在将两个键映射成同一个值的可能，这种现象称之为 *碰撞(collision)* 。通常有两种处理方式：1、开链法；2、线性探测法。  
那么散列表中的数组究竟多大才适合呢？常见的限制是：*数组长度应该是一个质数(137等)*。  
下面使用一个类表示散列表  
```javascript
/**
 * [HashTable() - Hash类表示散列表]
 */
var HashTable = function (){
	this.table = new Array(137);
	this.values = [];
	this.simpleHash = simpleHash;
	this.newHash = newHash;
	this.showDistro = showDistro;
	this.put = put;
	//this.get = get;
	this.buildChains = buildChains;
}
```
选择一个散列函数，散列函数的选择赖于键值的数据类型。如果键是整型，最简单的散列函数就是以数组的长度对键取余。在一些情况下，比如数组的长度是10，而键值都是10的倍数时，就不推荐使用这种方式了。如果键是随机的整数，则散列函数应该更均匀地分布这些键。这种散列方式称为除留余数法。但在很多应用中，键是字符串类型。  
```javascript
var simpleHash = function (data){
	var total = 0;
	for (var i = 0; i < data.length; i++){
		total += data.charCodeAt(i);
	}
	return total % this.table.length;
}
/**
 * [newHash() - 优化散列函数]
 * 为了避免碰撞，给散列表一个合适的大小，然后选择一个更好的计算散列值的方法。
 * 先计算字符串中各字符的ASCⅡ码值，在求和时每次乘以一个质数(建议较小的，例如31或者37等)。
 */
var newHash = function (string, arr){
	const H = 37;
	var total = 0;
	for (var i = 0, l = string.length; i < l; i++){
		total += H * total + string.charCodeAt(i);
	}
	if(typeof(arr) == "undefined")
		arr = this.table;
	total = total % arr.length;
	return parseInt(total);
}
```

[put() - 将数据存入散列表]  

```javascript
var put = function (data){
	//var pos = this.simpleHash(data);
	var pos = this.newHash(data);
	this.table[pos] = data;
}
```

[showDistro() - 将数据存入散列表]  

```javascript
var showDistro = function (data){
	var n = 0;
	for (var i = 0; i < this.table.length; i++){
		if (this.table[i] != undefined){
			console.log(i + ": " + this.table[i]);
		}
	}
}
```
Demo
```javascript
var someNames = ["david", "jenifer", "donnie", "raymond", "cynthia", "mike", "claython", "danny", "jonathan"];
var hTable = new HashTable();
for (var i = 0, l = someNames.length; i < l; i++){
	hTable.put(someNames[i]);
}
hTable.showDistro();
```
###散列化整型键
[getRandomInt() - 获取指定范围随机数]  
```javascript
var getRandomInt = function (min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

[genStuData() - 生成学生的数据]  
里层的循环用来生成学生的ID，循环后面生成随机的成绩  
把ID和成绩分离，散列函数将学生ID里的数字相加，使用simpleHash()函数计算出散列值  
```javascript
var genStuData = function (arr){
	for (var i = 0, l = arr.length; i < l; i++){
		var num = "";
		for (var j = 1; j <= 9; j++){
			num += Math.floor(Math.random() * 10);
		}
		num += getRandomInt(50, 100);
		arr[i] = num;
	}
}
```
Demo  
```javacript
var numStudents = 10;
var arrSize = 97;
var idLen = 0;
var students = new Array(numStudents);
genStuData(students);
console.log('Student data: \n');
for (var i = 0, l = students.length; i < l; i++){
	console.log(students[i].substring(0,8) + " " + students[i].substring(9));
}
console.log("\n\nData distribution: \n");
var hTable = new HashTable();
for( var i = 0, l = students.length; i < l; i++){
	hTable.put(students[i]);
}
hTable.showDistro();
```
###碰撞处理
####开链法  
开链法是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如另一个数组，这样就能存储多个键了。  
实现开链法的方法是：在创建存储散列过的键值的数组时，通过调用一个函数创建一个新的空数组，然后将该数组赋给散列表里的每个数组元素。  
```javascript
/**
 * [buildChains() - 用来创建第二组数组，称之为链]
 */
var buildChains = function (){
	for (var i = 0, l = this.table.length; i < l; i++){
		this.table[i] = new Array()
	}
}
var showDistro = function (data){
	var n = 0;
	for (var i = 0; i < this.table.length; i++){
		if (this.table[i][0] != undefined){
			console.log(i + ": " + this.table[i]);
		}
	}
}
var hTable = new HashTable();
hTable.buildChains();
var someNames = ["david", "jenifer", "donnie", "raymond", "cynthia", "mike", "claython", "danny", "jonathan"];
for(var i = 0, l = someNames.length; i < l; i++){
	hTable.put(someNames[i]);
}
hTable.showDistro();
```
*使用开链法后，需重新定义put()和get()*  
```javascript
var put = function(key, data){
	var pos = this.newHash(key);
	var index = 0;
	if (this.table[pos][index] == undefined){
		this.table[pos][index + 1] = data;
	}else{
		while (this.table[pos][index] != undefined){
			index++;
		}
		this.table[pos][index + 1] = data;
	}
}
var get = function (key){
	var index = 0;
	var hash = this.newHash(key);
	if (this.table[pos][index] = key){
		return this.table[pos][index + 1];
	}else{
		while (this.table[pos][index] != key){
			index += 2;
		}
		return this.table[pos][index + 1];
	}
	return undefined;
}
```
####线性探测法
开放寻址散列。当发生碰撞时，线性探测法检查散列表中的下一个位置是否为空。  
如果为空，就将数据存入该位置；否则继续检查下一个位置，直到找到一个空的位置为止。  
```javascript
/**
 * 在put()方法中使用线性探测技术
 */
var put = function (key, data){
	var pos = this.newHash(key);
	if (this.table[pos] == undefined){
		this.table[pos] == key;
		this.values[pos] = data;
	}else{
		while (this.table[pos] != undefined){
			pos++;
		}
		this.table[pos] = key;
		this.values[pos] = data;
	}
}
/**
 * get()方法先搜索键在散列表中的位置，如果找到则返回数组values中对应位置上的数据
 * 否则循环搜索，直到找到对应的键或者数组中的单元为undefined时
 * 后者表示该键没有被存入散列表
 */
var get = function (key){
	var hash = -1;
	hash = this.newHash(key);
	if (hash > -1){
		for (var i = hash; this.table[hash] != undefined; i++){
			if (this.table[hash] == key){
				return this.values[hash];
			}
		}
	}
	return undefined;
}
```  


<a name="binarytree"></a>
##二叉树 - Binary Tree  

树是一种非线性的数据结构，以分层的方式存储数据。在这里主要学习*二叉树*  
树由一组以 *边* 连续的 *节点* 组成。  
一棵树最上面的节点称为 *根节点* ，如果一个节点下面连接多个节点，那么该节点被称为 *父节点* ，它下面的节点称为 *子节点* 。没有任何子节点的节点称为 *叶子节点* 。  
二叉树子节点个数不超过两个，有两个子节点时称之为*左节点*和*右节点*，并且左节点比右节点相对较小。因为在二叉树中操作数据的插入、查找和删除是非常高效的。  
下面实现二叉查找树
```javascript
var Node = function (data, left, right){
	this.data = data;
	this.left = left;
	this.right = right;
	this.show = show;
}
```
```javascript
var show = function (){
	return this.data;
}
```
```javascript
var BST = function (){
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
}
```
/**
 * [insert 向树中加入新节点]
 * 首先创建一个Node对象用来存储相应数据。
 * 其次检查BST是否有根节点，如果没有，该节点是根节点。
 * 如果待插入节点不是根节点，先准备遍历BST，找到插入的适当位置。[过程：用一个变量存储当前节点，一层层地遍历BST]
 * 进入BST后下一步要决定将节点放在哪个地方。找到正确的插入点时会跳出循环。
 * 查找正确插入点的算法：
 * >>>>	设根节点为当前节点
 * >>>>	如果待插入节点保存的数据小于当前节点，则新的当前节点为原节点的左节点，否则设置新的当前节点为原节点的右节点
 * >>>>	如果当前节点的左节点为null，就将新的节点插入这个位置，退出循环。反之继续执行下一个循环
 * >>>>	设新的当前节点为原节点的右节点
 * >>>>	如果当前节点的右节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环
 */
```javascript
var insert = function (data){
	var n = new Node(data, null, null);
	if (this.root == null){
		this.root = n;
	}else {
		var current = this.root;
		var parent;
		while (true){
			parent = current;
			if (data < current.data){
				current = current.left;
				if (current == null){
					parent.left = n;break;
				}
			}else {
				current = current.right;
				if (current == null){
					parent.right = n;break
				}
			}
		}
	}
}
```

###遍历二叉查找树  
有三种遍历BST的方式：*中序*、*先序*、*后序*。中序遍历按照节点上的键值，以升序访问BST上的所有节点。先序遍历先访问根节点，然后以同样方式访问左子树和右子树。后序遍历先访问叶子节点，从左子树到右子树，再到根节点。  
下面是各种遍历的代码：
```javascript
// 中序 - 按照节点上的键值，以升序访问BST上的所有节点。
var inOrder = function (node){
	if (node != null){
		inOrder(node.left);
		console.log(node.show() + " ");
		inOrder(node.right);
	}
}
// 先序 - 先访问根节点，然后以同样方式访问左子树和右子树。
var preOrder = function (node){
	if (node != null){
		console.log(node.show() + " ");
		preOrder(node.left);
		preOrder(node.right);
	}
}
// 后序 - 先访问叶子节点，从左子树到右子树，再到根节点。
var postOrder = function (node){
	if (node != null){
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.show() + " ");
	}
}
```

###查找
查找最小值和最大值
```javascript
//BST中较小的值总是在左子节点上，查找最小值时只需要遍历左子树，直到最后一个节点。
var getMin = function (){
	var current = this.root;
	while (current.left != null){
		current = current.left;
	}
	return current.data;
}
//同样道理，查找最大值时只需要遍历右子树
var getMax = function (){
	var current = this.root;
	while (current.right != null){
		current = current.right;
	}
	return current.data;
}
```
在BST上查找给定值。
```javascript
var find = function (data){
	var current = this.root;
	while (current != null){
		if (current.data == data){
			return current;
		}else if (data < current.data){
			current = current.left;
		}else {
			current = current.right;
		}
	}
	return null;
}
```

###计数
BST可用于记录一组数据集中数据出现的次数。例如给定一组考试成绩，将它们逐一加入一个BST，如果某成绩尚未在BST中出现，就将其加入BST；如果已经出现就将出现的次数加1.
实现代码如下：
```javascript
//在BST类定义的对象里加入update(data)
var update = function (data){
	var grade = this.find(data);
	grade.count++;
	return grade;
}
//增加随机产生成绩及显示它们的函数
var prArray = function (arr){
	console.log(arr[0].toString() + ' ');
	for (var i = 1, l = arr.length; i < l; i++){
		console.log(arr[i].toString() + ' ');
		if (i % 10 == 0){
			console.log('\n');
		}
	}
}
var genArray = function (length){
	var arr = [];
	for (var i = 0; i < length; i++){
		arr[i] = Math.floor(Math.randow() * 101);
	}
	return arr;
}
```

<a name="graph"></a>
##图 - Graph
图是由 *边* 的集合及 *顶点* 的集合组成。边由顶点对(v1,v2)定义，v1和v2分别是图中的两个顶点。顶点也有权重(成本)。如果一个图的顶点对是有序的则称为 *有向图* ，否则称为 *无序图* 。
图中的一系列顶点构成 *路径* ，路径中所有的顶点都由边连接。路径的长度用路径中第一个顶点到最后一个顶点之间边的数量表示。由指向自身的顶点组成的路径称为 *环* 。环的长度为0。  
如果两个顶点之间有路径，那么这两个顶点就是强连通的，反之亦然。  

###构造图类
用节点来表示每个顶点。注意图可能增长到非常大，因此用基于对象的方式去处理就会有问题。  

表示顶点  
创建图类的第一步就是要创建一个Vertex类来保存顶点和边。这个类的作用与链表和二叉搜索树的Node类一样。Vertex类有两个数据成员：一个用于标识顶点(*label*)，另一个是表明这个顶点是否被访问过的布尔值(*wasVisited*)。构造函数的代码如下：  
```javascript
var Vertex = function (label, wasVisited){
	this.label = label;
	this.wasVisited = wasVisited;
}
```
我们将所有顶点保存到数组中，在图类里可以通过它们在数组中的位置引用它们。  

表示边  
图的结构比较灵活，一个顶点可以有一条边也可以有多条边与它相邻。所以用*邻接表(邻接表数组)*表示图的边。这种方法将边存储为由顶点的相邻顶点列表构成的数组，并以此顶点作为索引。  
比如顶点2与顶点0、1、3、4相连，并且它存储在数组中索引为2的位置，那么访问这个元素我们可以访问到索引为2的位置处由顶点0、1、3、4组成的数组。
```javascript
0 -> 2
1 -> 2
2 -> 0 1 3 4
3 -> 2
4 -> 2
```
另一种表示图边的方法是*邻接矩阵*。它是一个二维数组，其中的元素表示两个顶点之间是否有一条边。  

####构建图
构建一个表示图的类的代码如下:  
```javascript
/*
 * Graph() - 表示图类
 * 记录一个图表示了多少条边，并使用一个长度与图的顶点数相同的数组来记录顶点的数量
 * 通过for循环为数组中的每个元素添加一个子数组来存储所有的相邻顶点，并将所有元素初始化为空字符串
 */
var Graph = function (v){
	this.vertices = v;
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; i++){
		this.adj[i] = [];
		this.adj[i].push(" ");
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
}
/*
 * addEdge() - 添加边
 * 传入顶点A和B时，先查找顶点A的邻接表，将顶点B添加到列表中
 * 然后再查找顶点B的邻接表，将顶点A加入列表。最近将边的数量加1
 */
var addEdge = function (v, w){
	this.adj[v].push(w);
	this.adj[w].push(v);
	this.edges++;
}
//	显示
var showGraph = function (){
	for (var i = 0; i < this.vertices; i++){
		console.log(i + " -> ");
		for (var j = 0; j < this.vertices; j++){
			if (this.adj[i][j] != undefined){
				console.log(this.adj[i][j] + "  ");
			}
		}
		console.log();
	}
}

//demo
var g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
```

###图的相关搜索
对图的搜索，在此讨论两种基础算法： *深度优先搜索* 和 *广度优先搜索* 。  

####深度优先搜索
从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯，继续追溯下一条路径，直到到达最后的顶点，如此往复直到没有路径为止。  
![Alt text](/Graph/dfs.png)  
图：深度优先搜索  
深度优先搜索算法思想如下：  
访问一个没有访问过的顶点，将它标记为已访问，再递归地去访问在初始顶点的邻接表中其他没有访问过的顶点。  
实现：需要在Graph类添加一个数组用来存储已访问过的顶点，将它所有元素的值全部初始化为false。如下
```javascript
//在Graph()里加入以下代码
this.marker = [];
for (var i = 0; i < this.vertices; i++){
	this.marker[i] = false;
}

var Graph = function (v){
	this.vertices = v;
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; i++){
		this.adj[i] = [];
		this.adj[i].push(" ");
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
	this.marker = [];
	for (var i = 0; i < this.vertices; i++){
		this.marker[i] = false;
	}
}
```
实现代码
```javascript
var dfs = function (v){
	this.marker[v] = true;
	//用于输出的if语句在这里不是必须的
	if (this.adj[v] != undefined)
		console.log("Visited vertex: " +v);
	for each (var w in this.adj[v]){
		if (!this.marker[w]){
			this.dfs(w);
		}
	}
}
```

####广度优先搜索
从第一个顶点开始，尝试访问尽可能靠近它的顶点。其实就是在图上逐层移动。  
首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。
![Alt text](/Graph/bfs.png)  
图：广度优先搜索  
其算法使用了抽象的队列而不是数组来对已访问过的顶点进行排序。其原理如下:  
1.查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中
2.从图中取出下一个顶点v，添加到已访问的顶点列表
3.将所有与v相邻的未访问顶点添加到队列  
代码实现
```javascript
var bfs = function (s){
	var queue = [];
	this.marker[s] = true;
	queue.push(s);	//添加到队尾
	while (queue.length > 0){
		var v = queue.shift();	//从队首移除
		if (typeof(v) == "undefined"){
			console.log("Visisted vertex: " + v);
		}
		for each (var w in this.adj[v]){
			if (!this.marker[w]){
				this.edgeTo[w] = v;
				this.marker[w] = true;
				queue.push(w);
			}
		}
	}
}
//demo
var g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
g.bfs(0);
```

###查找最短路径
要查找最短路径，需要修改广度优先搜索算法来记录从一个顶点到另一个顶点的路径。  
首先需要一个数组来保存从一个顶点到下一个顶点的所有边(命名为edgeTo)。每次都会遇到一个没有标记的顶点，除了对它进行标记外，还会从邻接列表中正在搜索的顶点添加一条边到这个顶点。  
相应代码如下：
```javascript
var Graph = function (v){
	this.vertices = v;
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; i++){
		this.adj[i] = [];
		this.adj[i].push(" ");
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
	this.marker = [];
	for (var i = 0; i < this.vertices; i++){
		this.marker[i] = false;
	}
	this.edgeTo = [];
	this.pathTo = pathTo;
	this.hasPathTo = hasPathTo;
}
var bfs = function (s){
	var queue = [];
	this.marker[s] = true;
	queue.push(s);	//添加到队尾
	while (queue.length > 0){
		var v = queue.shift();	//从队首移除
		if (typeof(v) == "undefined"){
			console.log("Visisted vertex: " + v);
		}
		for each (var w in this.adj[v]){
			if (!this.marker[w]){
				this.edgeTo[w] = v;
				this.marker[w] = true;
				queue.push(w);
			}
		}
	}
}
//pathTo() - 用于展示图中连接到不同顶点的路径
var pathTo = function (v){
	var source = 0;
	if (!this.hasPathTo(v)){
		return undefined;
	}
	var path = [];
	for (var i = v; i != source; i = this.edgeTo[i]){
		path.push(i)
	}
	//path.push(s);
	return path;
}
var hasPathTo = function (v){
	return this.marker[v];
}

//demo
var g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
var vertex = 4;
var paths = g.pathTo(vertex);
while (paths.length > 0){
	if (paths.length > 1){
		console.log(paths.pop() + '-');
	}else{
		console.log(paths.pop());
	}
}
//输出 0-2-4
```

####拓扑排序
拓扑排序会对有向图的所有顶点进行排序，使有向边从前面的顶点指向后面的顶点。  
拓扑排序算法与深度优先搜索类似。不同之处是拓扑排序算法不会立即输出已访问的顶点，而是访问当前顶点邻接表中的所有相邻顶点，直到这个列表穷尽时才将当前顶点压入栈中。  
算法分为两个函数实现：topSort()和topSortHelper().  
递归函数topSortHelper()，这个函数会将当前顶点标记为已访问，然后递归访问当前顶点邻接表中的每个相邻顶点，标记这些顶点为已访问。最后将当前顶点压入栈。
```javascript
var topSort = function (){
	var stack = [];
	var visited = [];
	for (var i = 0; i < this.vertices; i++){
		visited[i] = false;
	}
	for (var i = 0; i < this.vertices; i++){
		if (visited[i] === false){
			this.topSortHelper(i, visited, stack);
		}
	}
	for (var i = 0, l = stack.length; i < l; i++){
		if (stack[i] != undefined && stack[i] != false){
			console.log(this.vertexList[stack[i]]);
		}
	}
}

var topSortHelper = function (v, visited, stack){
	visited[v] = true;
	this.adj[v].forEach(function (w){
		if (!visited[w]){
			this.topSortHelper(visited[w], visited, stack);
		}
	})
	stack.push(v);
}
```

下面是整个Graph类的定义：
```javascript
var Graph = function (v){
	this.vertices = v;
	this.vertexList = [];
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; i++){
		this.adj[i] = [];
		this.adj[i].push("");
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
	this.dfs = dfs;
	this.marked = [];
	for (var i = 0; i < this.vertices; i++){
		this.marked[i] = false;
	}
	this.bfs = bfs;
	this.edgeTo = [];
	this.hasPathTo = hasPathTo;
	this.topSorthelper = topSortHelper;
	this.topSort = topSort;
}
var topSort = function (){
	var stack = [];
	var visited = [];
	for (var i = 0; i < this.vertices; i++){
		visited[i] = false;
	}
	for (var i = 0, l = stack.length; i < l; i++){
		if (visited[i] == false){
			this.topSortHelper(i, visited, stack);
		}
	}
	for (var i = 0, l = stack.length; i < l; i++){
		if (stack[i] != undefined && stack[i] != false){
			console.log(this.vertexList[stack[i]]);
		}
	}
}
var topSortHelper = function (v, visited, stack){
	visited[v] = true;
	this.adj[v].forEach(function (w){
		if (!visited[w]){
			this.topSortHelper(visited[w], visited, stack);
		}
	})
	stack.push(v);
}
var addEdge = function (v, w){
	this.adj[v].push(w);
	this.adj[w].push(v);
	this.edges++;
}
/*var showGraph = function (){
	for (var  i = 0; i < this.vertices; i++){
		console.log(i + "->");
		for (var j = 0; j < this.vertices; j++){
			if (this.adj[i][j] != undefined){
				console.log(this.adj[i][j] + " ");
			}
		}
		console.log();
	}
}*/
// 用于显示符号名字而非数字
var showGraph = function (){
	var visited = [];
	for (var i = 0; i < this.vertices; i++){
		console.log(this.vertexList[i] + " -> ");
		visited.push(this.vertexList[i]);
		for (var j = 0; j < this.vertices; j++){
			if (this.adj[i][j] != undefined){
				if (visited.indexOf(this.vertexList[j]) < 0){
					console.log(this.vertexlist[j] + " ");
				}
			}
		}
		console.log();
		visited.pop();
	}
}
var bfs = function (s){
	var queue = [];
	this.marked[s] = true;
	queue.unshift(s);
	while (queue.length > 0){
		var v = queue.shift();
		if (typeof(v) != 'string'){
			console.log('Visited vertex:' + v);
		}
		this.adj[v].forEach(function (w){
			if (!this.marked[w]){
				this.edgeTo[w] = v;
				this.marked[w] = true;
				queue.unshift(w);
			}
		})
	}
}
var hasPathTo = function (v){
	return this.marked[v];
}
var pathTo = function (v){
	var source = 0;
	if (!this.hasPathTo(v)){
		return undefined;
	}
	var path = [];
	for (var i = v; i != source; i = this.edgeTo[i]){
		path.push(i);
	}
	path.push(s);
	return path;
}
//demo
var g = new Graph(6);
g.addEdge(1,2);
g.addEdge(2,5);
g.addEdge(1,3);
g.addEdge(1,4);
g.addEdge(0,1);
g.vertexList = ["CS1", "CS2", "DataStructures", "Assembly Language", "Operating System", "Algorithms"];
g.showGraph();
g.topSort();
```

<a name="sort"></a>
##排序 - Sort
直接上代码  
基本排序算法包括有：冒泡排序、选择排序、插入排序。  
高级排序算法有：希尔排序、归并排序、快速排序 
```javascript
/**
 * 数组测试平台类
 */
var CArray = function (numElements){
	this.dataStore = [];
	this.pos = 0;
	this.numElements = numElements;
	this.insert = insert;
	this.toString = toString;
	this.clear = clear;
	this.setData = setData;
	this.swap = swap;
	for (var i = 0; i < numElements; i++){
		this.dataStore[i] = i;
	}
	this.bubbleSort = bubbleSort;
	this.selectionSort = selectionSort;
	this.insertionSort = insertionSort;
	this.gaps = [5,3,1];
	this.shellSort = shellSort;
}
var setData = function (){
	for (var i = 0; i < this.numElements; i++){
		this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
	}
}
var clear = function (){
	for (var i = 0,l = this.dataStore.length; i < l; i++){
		this.dataStore[i] = 0;
	}
}
var insert = function (element){
	this.dataStore[this.pos++] = element;
}
var toString = function (){
	var restr = "";
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		restr += this.dataStore[i] + " ";
		if (i > 0 && i % 10 == 0){
			restr += "\n";
		}
	}
	return restr;
}
var swap = function (arr, index1, index2){
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}

/*var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString())*/
/**
 * [bubbleSort() - 冒泡排序 ]
 */
var bubbleSort = function (){
	var numElements = this.dataStore.length;
	var temp;
	for (var outer = numElements; outer >= 2; outer--){
		for (var inner = 0; inner <= outer - 1; inner++){
			if (this.dataStore[inner] > this.dataStore[inner + 1]){
				swap(this.dataStore, inner, inner + 1);
			}
		}
	}
}
/**
 * [selectionSort() - 选择排序]
 * @return {[type]} [description]
 */
var selectionSort = function (){
	var min, temp;
	for (var outer = 0, l = this.dataStore.length; outer <= l - 2; outer++){
		min = outer;
		for (var inner = outer + 1, l = this.dataStore.length; inner <= l - 1; inner++){
			if (this.dataStore[inner] < this.dataStore[min]){
				min = inner;
			}
			swap(this.dataStore, outer, min);
		}
	}
}
//demo
/*myNums.selectionSort();
console.log(myNums.toString())*/
/**
 * [insertionSort() - 插入排序]
 * 插入排序对于少量元素比较有效。一定情况下效率比选择排序和冒泡排序更高
 * 插入排序有两个循环，外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及它后面的那个元素进行比较
 */
var insertionSort = function (){
	var temp, inner;
	for (var outer = 1, l = this.dataStore.length; outer < l; outer++){
		temp = this.dataStore[outer];
		inner = outer - 1;
		while (inner > -1 && (this.dataStore[inner] > temp)){
			this.dataStore[inner + 1] = this.dataStore[inner];
			inner--;
		}
		this.dataStore[inner + 1] = temp;
	}
}
//demo
/*var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString())
myNums.insertionSort();
console.log(myNums.toString())*/
/**
 * [shellSort() - 希尔排序]
 * 通过定义一个间隔序列来表示在排序过程中进行比较的元素之间有多远的间隔。
 * 参考间隔: 701, 301, 132, 57, 23, 10, 4, 1
 */
var shellSort = function (){
	for (var g = 0, len = this.gaps.length; g < len; g++){
		for (var i = 0, l = this.dataStore.length; i < l; i++){
			var temp = this.dataStore[i];
			for (var j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]){
				this.dataStore[j] = this.dataStore[j - this.gaps[g]];
			}
			this.dataStore[j] = temp;
		}
	}
}
//demo
/*myNums.shellSort();
console.log()
console.log(myNums.toString())*/
```