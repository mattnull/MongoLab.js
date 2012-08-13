/**
 * MongoLab.js
 *
 * JavaScript Library for the MongoLab REST API
 * http://support.mongolab.com/entries/20433053-rest-api-for-mongodb
 *
 * Copyright 2012 Matt Null 
 * http://mattnull.com
 *
 * Released under the MIT license
 *
 */

var MongoLab = function(apiKey, apiVersion){
	apiVersion = apiVersion || 1;
	this.apiKey = apiKey || false;
	this.apiUrl = 'https://api.mongolab.com/api/'+apiVersion;
};

MongoLab.prototype.listDatabases = function(callback){
	callback = callback || function(){};
	var endpoint = 'databases';

	this.get(endpoint, callback);
};

MongoLab.prototype.listCollections = function(database, callback){
	callback = callback || function(){};
	database = database || '';

	var endpoint = 'databases/'+database+'/collections';

	this.get(endpoint, callback);
};

/*
	database (required) - the name of your database
	collection (required)  - the name of your collection

	optionalParams (optional) - [q=<query>][&c=true][&f=<fields>][&fo=true][&s=<order>][&sk=<skip>][&l=<limit>]

	example - {c : true, fo : true, l : 500}

	q=<query> - restrict results by the specified JSON query
	c=true - return the result count for this query
	f=<set of fields> - specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
	fo=true - return a single document from the result set (same as findOne() using the mongo shell
	s=<sort order> - specify the order in which to sort each specified field (1- ascending; -1 - descending)
	sk=<num results to skip> - specify the number of results to skip in the result set; useful for paging
	l=<limit> - specify the limit for the number of results


	callback (optional) - function(){}

*/

MongoLab.prototype.listDocuments = function(database, collection){

	callback = typeof arguments[2] === 'function' ? arguments[2] : (typeof arguments[3] === 'function' ? arguments[3] : function(){});
	optionalParams = arguments[2] && arguments[2] !== 'function' ? arguments[2] : false;
	database = database || '';
	collection = collection || '';

	var endpoint = 'databases/'+database+'/collections/'+collection;
	var params = '';

	if(typeof optionalParams === 'object'){
		for(var i in optionalParams){
			params += '&'+i+'='+optionalParams[i];
		}
	}

	this.get(endpoint, callback, params);
};

MongoLab.prototype.insertDocuments = function(database, collection, data, callback){
	callback = callback || function(){};
	database = database || '';
	collection = collection || '';

	var endpoint = 'databases/'+database+'/collections/'+collection;

	this.post(endpoint, data, callback);
};

MongoLab.prototype.deleteDocument = function(database, collection, id, callback){
	callback = callback || function(){};
	database = database || '';
	collection = collection || '';

	var endpoint = 'databases/'+database+'/collections/'+collection+'/'+id;

	this.delete(endpoint, callback);
};

/** Utility methods for making requests **/

MongoLab.prototype.get = function(endpoint, callback, params){

	callback = callback || function(){};
	params = params || '';

	this.request(this.apiUrl+'/'+endpoint+'?apiKey='+this.apiKey+params, 'GET', callback);
};

MongoLab.prototype.post = function(endpoint, data, callback){

	callback = callback || function(){};
	data = typeof data === 'object' ? data : false;

	this.request(this.apiUrl+'/'+endpoint+'?apiKey='+this.apiKey, 'POST', JSON.stringify(data), callback);
};

MongoLab.prototype.put = function(endpoint, callback, data){

	callback = callback || function(){};
	params = params || '';
	data = typeof data === 'object' ? data : false;

	this.request(this.apiUrl+'/'+endpoint+'?apiKey='+this.apiKey, 'PUT', JSON.stringify(data), callback);
};

MongoLab.prototype.delete = function(endpoint, callback){

	callback = callback || function(){};

	this.request(this.apiUrl+'/'+endpoint+'?apiKey='+this.apiKey, 'DELETE', callback);
};

MongoLab.prototype.request = function(url, type){
	var callback = typeof arguments[2] === 'function' ? arguments[2] : (typeof arguments[3] === 'function' ? arguments[3] : function(){});
	data = typeof arguments[2] === 'string' || typeof arguments[2] === 'object' ? arguments[2] : false;

	$.ajax({
		url : url,
		data : data,
		type : type,
		contentType : 'application/json',
		success : function(res){
			callback(res);
		}
	});
};
