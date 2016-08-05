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