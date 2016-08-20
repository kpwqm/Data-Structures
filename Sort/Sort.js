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
console.log(myNums.toString())*/
/**
 * [shellSort1 - 动态计算间隔序列]
 */
var shellSort1 = function (){
	var N = this.dataStore.length;
	var h = 1;
	while (h < N/3){
		h = 3 * h + 1;
	}
	while (h >= 1){
		for (var i = h; i < N; i++){
			for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h){
				swap(this.dataStore, j, j - h);
			}
		}
		h = (h - 1) / 3;
	}
}
/**
 * 快速排序处理对象是大型数据集，对于小数据集性能反而下降
 * 是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。
 * 这个算法首先要在列表中选择一个元素作为基准值(pivot)，将小于基准值的元素移到数组底部，大于基准值的元素移到数组的顶部。
 * 快速排序算法如下：
 * 1)	选择一个基准元素，将列表分隔成两个子序列
 * 2)	对列表重新排序，将所有小于基准值的元素放在基准值的前面，所有大于基准值的元素放在基准值的后面
 * 3)	分别对较小元素的子序列和较大元素的子序列重复步骤1和2
 */
/**
 * [qSort - 快速排序]
 * 创建两个数组，一个用来存放比基准值小的元素，另一个存放比基准大的元素
 * 当递归结束时，再将较大的数组和较小的数组连接起来
 */
var qSort = function (arr){
	if(arr.length == 0){
		return [];
	}
	var left = [];
	var right = [];
	var pivot = arr[0];
	for (var i = 1; i < arr.length; i++){
		if (arr[i] < pivot){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return qSort(left).concat(pivot, qSort(right));
}
var a = [];
for (var i = 0; i < 10; i++){
	a[i] = Math.floor((Math.random() * 100) + 1);
}
console.log(a);
console.log(qSort(a));

/**
 * 归并排序是把一系列排序好的子序列合并成一个大的完整有序序列  
 * 需要两个排序好的子数组，然后通过比较数据大小，先从最小的数据开始插入，最后合并得到第三个数组。
 * 自顶向下的归并排序(使用递归)
 * 在javascript中不使用递归去实现此算法，因为递归深度太深了。因此使用一种非递归的方式来实现，此策略称为自底向上的归并排序。
 * 自底向上：
 * 首先将数据集分解为一组只有一个元素的数组。
 * 然后通过创建一组左右子数组将它们慢慢合并起来，每次合并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序。
 */
/**
 * [自底向上归并排序算法]
 * mergeSort()函数中的关键点就是step这个变量，用来控制mergeArrays()函数生成的leftArr和rightArr这两个子序列的大小。
 * 通过控制子序列的大小，处理排序是比较高效的。
 */
var mergeSort = function (arr){
	if (arr.length < 2)
		return;
	var step = 1;
	var left, right;
	while(step < arr.length){
		left = 0;
		right = step;
		while (right + step <= arr.length){
			mergeArrays(arr, left, left + step, right, right + step);
			left = right + step;
			right = left + step;
		}
		if (right < arr.length){
			mergeArrays(arr, left, left + step, right, arr.length);
		}
		step *= 2;
	}
}
var mergeArrays = function (arr, startLeft, stopLeft, startRight, stopRight){
	var rightArr = new Array(stopRight - stopRight + 1);
	var leftArr = new Array(stopLeft - stopLeft + 1);
	k = startRight;
	for (var i = 0, l = rightArr.length; i < l-1; i++){
		rightArr[i] = arr[k];
		k++;
	}
	k = startLeft;
	for (var i = 0, l = leftArr.length; i < l-1; i++){
		leftArr[i] = arr[k];
		k++;
	}
	rightArr[rightArr.length - 1] = Infinity;	//哨兵值，表示存放正无穷大的数值
	leftArr[leftArr.length - 1] = Infinity;	//哨兵值
	var m = 0;
	var n = 0;
	for (var k = startLeft; k < stopRight; k++){
		if (leftArr[m] <= rightArr[n]){
			arr[k] = leftArr[m];
			m++;
		}else{
			arr[k] = rightArr[n];
			n++;
		}
	}
	console.log("left array - ", leftArr);
	console.log("right array - ", rightArr);
}
