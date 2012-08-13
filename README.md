MongoLab.js
==========

This library wraps calls from the <a href="http://support.mongolab.com/entries/20433053-rest-api-for-mongodb" target="_blank">MongoLab API</a>

Dependencies
------------

<a href="http://jquery.com" target="_blank">jQuery</a>

Usage
-----

```javascript
	$(function(){
		var mongoDB = new MongoLab('YOUR_API_KEY');

		//list databases
		mongoDB.listDatabases(function(data){
			console.log('List Databases : ', data);
		});

		//list collections
		mongoDB.listCollections('blog', function(data){
			console.log('List Collections : ', data);
		});

		//list documents
		mongoDB.listDocuments('blog', 'posts', function(data){
			console.log('List Documents : ', data);
		});

		//insert documents
		mongoDB.insertDocuments('blog', 'posts', {mytest : 'testing'}, function(data){
			console.log('Insert Documents : ', data);
		});

		//delete document
		mongoDB.deleteDocument('blog', 'posts', '5028514623526e4b0bd023523623623b0bbb328a23432', function(data){
			console.log('Delete Document : ', data);
		});
	});
```

Copyright
---------

Copyright (c) 2012 Matt Null. See LICENSE.txt for further details.
