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