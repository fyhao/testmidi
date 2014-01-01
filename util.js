var replaceTemplateValue = function(data, values) {
	
	for(var i in values) {
		data = replaceText(data, '##' + i + '##', values[i]);
	}
	return data;
}

var replaceText = function(source, from, to) {
	while(source.indexOf(from) != -1) {
		source = source.replace(from,to);
	}	
	return source;
}

module.exports = {
	replaceTemplateValue : replaceTemplateValue,
	replaceText : replaceText
};
