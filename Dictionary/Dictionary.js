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
var pbook = new Dictionary();
pbook.add("Mike", "123");
pbook.add("David", "345");
pbook.add("Cynthia", "567");

pbook.showAll();
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