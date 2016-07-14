#Data Structures & Algorithms with JavaScript
##Directory  

[1.栈 - Stack](#stack)  
[2.列表 - List](#list)     
[3.队列 - Queue](#queue)    


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
  for (var i = 0; i < word.length; ++i){
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

<a name="list"></a>
##列表 - List

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
