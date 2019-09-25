function average(scores){
	var num = 0;
	var avg;
	var len=scores.length;
	for(var i =0;i<scores.length;i++){
	    num +=scores[i];
	}   
	avg = num / len ;
	return Math.round(avg);
}
var scores = [90,98,89,100,100,86,94];
console.log(average(scores));

var scores2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(scores2));
