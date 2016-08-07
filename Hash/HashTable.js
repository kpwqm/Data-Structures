/**
 * [HashTable() - Hash类表示散列表]
 */
var HashTable = function (){
	this.table = new Array(137);
	this.values = [];
	this.simpleHash = simpleHash;
	this.newHash = newHash;
	this.showDistro = showDistro;
	this.put = put;
	//this.get = get;
	this.buildChains = buildChains;
}
/**
 * 选择一个散列函数，散列函数的选择赖于键值的数据类型。如果键是整型，最简单的散列函数就是以数组的长度对键取余。
 * 在一些情况下，比如数组的长度是10，而键值都是10的倍数时，就不推荐使用这种方式了。如果键是随机的整数，则散列函数应该更均匀地分布这些键。这种散列方式称为除留余数法
 * 但在很多应用中，键是字符串类型。
 */
var simpleHash = function (data){
	var total = 0;
	for (var i = 0; i < data.length; i++){
		total += data.charCodeAt(i);
	}
	return total % this.table.length;
}
/**
 * [newHash() - 优化散列函数]
 * 为了避免碰撞，给散列表一个合适的大小，然后选择一个更好的计算散列值的方法。
 * 先计算字符串中各字符的ASCⅡ码值，在求和时每次乘以一个质数(建议较小的，例如31或者37等)。
 */
var newHash = function (string, arr){
	const H = 37;
	var total = 0;
	for (var i = 0, l = string.length; i < l; i++){
		total += H * total + string.charCodeAt(i);
	}
	if(typeof(arr) == "undefined")
		arr = this.table;
	total = total % arr.length;
	return parseInt(total);
}
/**
 * [put() - 将数据存入散列表]
 */
var put = function (data){
	//var pos = this.simpleHash(data);
	var pos = this.newHash(data);
	this.table[pos] = data;
}
/**
 * [showDistro() - 将数据存入散列表]
 */
var showDistro = function (data){
	var n = 0;
	for (var i = 0; i < this.table.length; i++){
		if (this.table[i] != undefined){
			console.log(i + ": " + this.table[i]);
		}
	}
}
/*var someNames = ["david", "jenifer", "donnie", "raymond", "cynthia", "mike", "claython", "danny", "jonathan"];
var hTable = new HashTable();
for (var i = 0, l = someNames.length; i < l; i++){
	hTable.put(someNames[i]);
}
hTable.showDistro();*/
//##散列化整型键
/**
 * [getRandomInt() - 获取指定范围随机数]
 */
var getRandomInt = function (min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * [genStuData() - 生成学生的数据]
 * 里层的循环用来生成学生的ID，循环后面生成随机的成绩
 * 把ID和成绩分离，散列函数将学生ID里的数字相加，使用simpleHash()函数计算出散列值
 */
var genStuData = function (arr){
	for (var i = 0, l = arr.length; i < l; i++){
		var num = "";
		for (var j = 1; j <= 9; j++){
			num += Math.floor(Math.random() * 10);
		}
		num += getRandomInt(50, 100);
		arr[i] = num;
	}
}
//demo
/*var numStudents = 10;
var arrSize = 97;
var idLen = 0;
var students = new Array(numStudents);
genStuData(students);
console.log('Student data: \n');
for (var i = 0, l = students.length; i < l; i++){
	console.log(students[i].substring(0,8) + " " + students[i].substring(9));
}
console.log("\n\nData distribution: \n");
var hTable = new HashTable();
for( var i = 0, l = students.length; i < l; i++){
	hTable.put(students[i]);
}
hTable.showDistro();*/

//###对散列表排序、从散列表中取值
/*var put = function (key, data){
	var pos = this.newHash(key);
	this.table[pos] = data;
}
var get = function (key){
	return this.table[this.newHash(key)];
}
var pnumbers = new HashTable();
var name, number;
for(var i = 0; i < 3; i++){
	console.log("Enter a name (space to quit): ");
	name = readline();
	putstr("Enter a number: ");
	number = readline();
}
name = "";
putstr("Name for number (Enter quit to stop): ");
while (name != "quit"){
	if (name == "quit")
		break;
	console.log(name + "'s number is " + pnumbers.get(name));
	putstr("Name for number (Enter quit to stop): ");
}*/
//###碰撞处理
//####开链法
//开链法是指实现散列表的底层数组中，每个数组元素又是一个新的数据结构，比如另一个数组，这样就能存储多个键了。
//实现开链法的方法是：在创建存储散列过的键值的数组时，通过调用一个函数创建一个新的空数组，然后将该数组赋给散列表里的每个数组元素。
/**
 * [buildChains() - 用来创建第二组数组，称之为链]
 */
var buildChains = function (){
	for (var i = 0, l = this.table.length; i < l; i++){
		this.table[i] = new Array()
	}
}
var showDistro = function (data){
	var n = 0;
	for (var i = 0; i < this.table.length; i++){
		if (this.table[i][0] != undefined){
			console.log(i + ": " + this.table[i]);
		}
	}
}
var hTable = new HashTable();
hTable.buildChains();
var someNames = ["david", "jenifer", "donnie", "raymond", "cynthia", "mike", "claython", "danny", "jonathan"];
for(var i = 0, l = someNames.length; i < l; i++){
	hTable.put(someNames[i]);
}
hTable.showDistro();
//使用开链法后，需重新定义put()和get()
var put = function(key, data){
	var pos = this.newHash(key);
	var index = 0;
	if (this.table[pos][index] == undefined){
		this.table[pos][index + 1] = data;
	}else{
		while (this.table[pos][index] != undefined){
			index++;
		}
		this.table[pos][index + 1] = data;
	}
}
var get = function (key){
	var index = 0;
	var hash = this.newHash(key);
	if (this.table[pos][index] = key){
		return this.table[pos][index + 1];
	}else{
		while (this.table[pos][index] != key){
			index += 2;
		}
		return this.table[pos][index + 1];
	}
	return undefined;
}
// ####线性探测法
// 开放寻址散列。当发生碰撞时，线性探测法检查散列表中的下一个位置是否为空。
// 如果为空，就将数据存入该位置；否则继续检查下一个位置，直到找到一个空的位置为止。
/**
 * 在put()方法中使用线性探测技术
 */
var put = function (key, data){
	var pos = this.newHash(key);
	if (this.table[pos] == undefined){
		this.table[pos] == key;
		this.values[pos] = data;
	}else{
		while (this.table[pos] != undefined){
			pos++;
		}
		this.table[pos] = key;
		this.values[pos] = data;
	}
}
/**
 * get()方法先搜索键在散列表中的位置，如果找到则返回数组values中对应位置上的数据
 * 否则循环搜索，直到找到对应的键或者数组中的单元为undefined时
 * 后者表示该键没有被存入散列表
 */
var get = function (key){
	var hash = -1;
	hash = this.newHash(key);
	if (hash > -1){
		for (var i = hash; this.table[hash] != undefined; i++){
			if (this.table[hash] == key){
				return this.values[hash];
			}
		}
	}
	return undefined;
}
