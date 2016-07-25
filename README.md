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

<a name="stack"></a>
##链表 - LinkedList
