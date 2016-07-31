var Set = function (){
	this.dataStore = [];
	this.add = add;
	this.remove = remove;
	this.show = show;
	this.size = size;
	this.contains = contains;
	this.union = union;
	this.intersect = intersect;
	this.subset = subset;
	this.difference = difference;
}
var add = function (data){
	if (!~this.dataStore.indexOf(data)){	//不存在成员
		this.dataStore.push(data);
		return true;
	}else {
		return false;
	}
}
var remove = function (data){
	var pos = this.dataStore.indexOf(data);
	if (~pos){	//存在成员
		this.dataStore.splice(pos, 1);
		return true;
	}else {
		return false;
	}
}
var show = function (){
	return this.dataStore;
}
var size = function (){
	return this.dataStore.length();
}
var contains = function (data){
	if (~this.dataStore.indexOf(data)){
		return true;
	}else{
		return false;
	}
}
/**
 * union() - 求两个集合的并集
 * 首先将第一个集合里的成员加入一个临时集合，然后判断第二个集合中的成员是否同时属于第一个集合，如果属于则跳过该成员，否则将该成员加入临时集合，最后返回此临时集合
 */
var union = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		tempSet.add(this.dataStore[i]);
	}
	for (var i = 0, l = set.dataStore.length; i < l; i++){
		if (!tempSet.contains(set.dataStore[i])){
			tempSet.dataStore.push(set.dataStore[i]);
		}
	}
	return tempSet;
}
/**
 * intersect() - 求两集合的交集
 * 当发现第一个集合的成员也属于第二个集合时，便将该成员加入一个新集合，循环后返回此新集合
 */
var intersect = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		if (set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}
/**
 * subset() - 判断集合是否为子集
 * 首先判断两集合的长度，如果该集合比待比较的集合还要大，则该集合肯定不会是待比较集合的一个子集
 * 当长度满足时，再判断集合内的成员是否属于待比较集合。若存在任意一个成员不属于待比较集合，则返回false
 */
var subset = function (set){
	if (this.size() > set.size()){
		return false
	}else{
		for each (var member in this.dataStore){
			if (!set.contains(member)){
				return false;
			}
		}
	}
	return true;
}
/**
 * difference() - 求两个集合的补集
 * 返回一个新集合，该集合包含的是那些属于第一个集合但不属于第二个集合的成员
 */
var difference = function (set){
	var tempSet = new Set();
	for (var i = 0, l = this.dataStore.length; i < l; i++){
		if (!set.contains(this.dataStore[i])){
			tempSet.add(this.dataStore[i]);
		}
	}
	return tempSet;
}