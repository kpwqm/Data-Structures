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