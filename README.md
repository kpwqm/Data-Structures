#Data Structures & Algorithms with JavaScript

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