#Data Structures & Algorithms with JavaScript

#栈 - Stack
栈，是一种后进先出(lifo)的数据结构，只能在栈顶添加或删除，所以如果对对象进行添加或删除等操作使用栈更友好。但在查找数据操作方面不那么友好。
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
此外，经常提到的回文，使用栈更好地实现。
