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
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.toString());
mynums.selectionSort();
console.log()
console.log(mynums.toString())