var seqSearch = function (arr, data){
	for (var i = 0, l = arr.length; i < l; i++){
		if (arr[i] == data){
			return true;
		}
	}
	return false;
}
/**
 * 对于查找频繁的数据集，将查找到的元素置于数据集的起始位置来最小化查找次数
 */
var findMin = function (arr){
	var min = arr[0];
	for (var i = 0; l = arr.length; i < l; i++){
		if (arr[i] < min){
			min = arr[i];
		}
	}
	return min;
}
var findMax = function (arr){
	var max = arr[0];
	for (var i = 0; l = arr.length; i < l; i++){
		if (arr[i] > max){
			max = arr[i];
		}
	}
	return max;
}

/**
 * [binSearch() - 二分查找算法]
 * 二分法只对有序的数据集有效，因此在查找着需将数据集排序。算法思路如下：
 * 1)将数组的第一个位置设置为下边界(0)
 * 2)将数组最后一个元素所在的位置设置为上边界(数组的长度减1)
 * 3)若下边界等于或小于上边界，则：
 * 	a.将中点设置为(上边界加上下边界)除以2
 * 	b.如果中点的元素小于查询的值，则将下边界设置为中点元素所在下标加1
 * 	c.如果中点的元素大于查询的值，则将上边界设置为中点元素所在下标减1
 * 	d.否则中点元素则为要查找的数据，可以进行返回
 */
var binSearch = function (arr, data){
	var upperBound = arr.length - 1;
	var lowerBound = 0;
	while (lowerBound <= upperBound){
		var mid = Math.floor((upperBound + lowerBound) / 2);
		if (arr[mid] < data){
			lowerBound = mid + 1;
		}else if (arr[mid] > data){
			upperBound = mid - 1;
		}else{
			return mid;
		}
	}
	return -1;
}