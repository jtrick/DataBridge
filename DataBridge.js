(function _DataBridge(){  // Encapsulate scope


// The js version of the DataBridge object. Pass object parameters as {host:host,data:data,user:user,pass:pass}
function DataBridge(obj) {
	if (!(obj=jsonToObj(obj)) { return; }
	var host = obj.host || 'local',  // Defaults to whatever the preferred context may be. Could be 'localhost', './', 'http://...'.
		data = obj.data || 'default',  // Typically a database name, but could also be any number of other options.
		user = obj.user || 'default',  // The user authentication identifier to be used to reference access privilages, if applicable. 
		pass = obj.pass || 'default',  // The authentication password used for the user, if applicable.
		type = obj.type || 'mongo',  // If specifying a database type. Would typically be inferred from other data?
		db = getDB(),  // Authenticate and instantiate correct database type.
		_api = {  // API functions.
				'get': function() {
				
				},
				'set': function() {
				
				},
				'add': function() {
				
				},
				'rem': function() {
				
				},
				'new': function() {
				
				},
				'del': function() {
				
				},
				'exe': function() {
				
				}
			};//{_api}
	
	
	// Resolves authentication and instantiation of the correct type of db interface.
	function getDB() {
		if (!type) { getDbType(); }
		if (type=='mongo') { return new MongoDb(); }
		
		// Identifies db type if not specified.
		function getDbType() {
			// Fix. Do something functional to infer correct db type...
			return type='mongo';
		}//getDbType()
	}//getDB()
	
	
	// Instantiates a persistent authenticated mongodb connection to a specific database for a particular user.
	function MongoDb() {
		var _this = this,
			_api = {  // API functions.
				'get': function() {
				
				},
				'set': function() {
				
				},
				'add': function() {
				
				},
				'rem': function() {
				
				},
				'new': function() {
				
				},
				'del': function() {
				
				},
				'exe': function() {
				
				}
			},//{_api}
			db;  // Overrides local reference to db var, which in this case now represents the actual mongodb instance used within this object.
			
			
			// Initialize the db connection using the 'global' authentication variables.
			(function init(){
				// Fix. Initialize mongodb connection using these items:
				// db = mongo(host,data,user,pass);
			})();//(init)()
			
	}//MongoDb
	
}//DataBridge



// *******  Utility Functions:  ************************************************************* //



// Performs basic checks for JSON structure and returns the extracted object if applicable, returns the original string otherwise.
function jsonToObj(str) {
	if (!is(str,'str')) { return str; }
	var b = str.charAt(0),
		e = str.charAt(str.length-1),
		obj;
	// Fix. Complete these checks:
	// if (!(b=='{'&&e=='}')&&!(b=='['&&e==']')) { return; }
	if (b=='[' && e==']') { 
		obj = JSON.parse('{"tmp":'+str+'}');
		if (obj && obj.tmp) { return obj.tmp; }
		return;  // flagError('Invalid JSON str', str);
	} else if (b=='{' && e=='}') { 
		obj = JSON.parse(str);
	} else { 
		return;  // flagError('Invalid JSON str', str);
	}
	return is(obj,'obj') ? obj : str;
}


// Shorthand for type comparisons. If typ is set, will return TRUE or FALSE against that type, or will check against undefined if typ is not passed.
function is(val,typ) {
	if (!typ) { return (typeof val != 'undefined'); }
	if (typ=='fnc'||typ=='function') { return (typeof val == 'function'); }
	if (typ=='str'||typ=='string') { return (typeof val == 'string'); }
	if (typ=='obj'||typ=='object') { return (val === Object(val)); }
	if (typ=='arr'||typ=='array') { 
		if (Array.isArray) { return Array.isArray(val); }
		return Object.prototype.toString.call(val) == '[object Array]';
	}
}//is()





/*  Taken from wiki, etc:

// Instantiate a new DataBridge object using the local language constructs:
  db = new DataBridge({
    'host': 'host_uri',  // Defaults to whatever the preferred context may be. Could be 'localhost', './', 'http://...'.
    'data': 'data_source',  // Typically a database name, but could also be any number of other options.
    'user': 'user',  // The user authentication identifier to be used to reference access privilages, if applicable. 
    'pass': 'pass'  // The authentication password used for the user, if applicable.
  });

// Which obviously could actually look like this:
  db = new DataBridge({host:host,data:data,user:user,pass:pass});  // Or whatever...


// Instantiate a new DataBridge object using a JSON string:
  db = new DataBridge('{
    "host" : "host_uri",
    "data" : "data_source",
    "user" : "user",
    "pass" : "pass"
  }');

// Which obviously could actually look like this:
  db = new DataBridge(loginString);  // Or whatever...


=== Access: ===
// Obtain data from an authenticated DataBridge object instance. Compare to the to the following SQL statement:
  SELECT "field1", "field2", "field3", "field4"
      FROM "table"
      WHERE "field1"="filterVal",
        "field2" >= "filterVal",
        "field3" < "filterVal",
        "field4" != "filterVal"
      ORDER BY "field1", "field2", "field3", "field4";


// Typical standard usage.
  db.get('{
    "table": {
      "field1": "filterVal",
      "field2": ">=filterVal",
      "field3": "<filterVal",
      "field4": "!filterVal"
    }
  }');


// Implicit Join:
	db.get('{
		"Table1": {
			"Field1" : "Val1"
		},
		"Table2": [
			"joinField1",
			"joinField1"
		]
	}');





// Ordered key-val set:

    {[
        "key1":"val1",
        "anotherKey":"keyVal"
     ]}
    
// ==> Becomes:

    [
        {"key1":"val1"},
        {"anotherKey":"keyVal"}
    ]

     {
        "_index_" : [
            "key1",
            "anotherKey"
        ],
        "key1":"val1",
        "anotherKey":"keyVal"
     }
     
     
    
	 * student: {
	 *	  time: timestamp
	 *	  loc: {lng:, lat:},
	 *	  ip: 0.0.0.0,
	 * }
	 * 
	 * db.student.aggregate([
	 *	  {$project:{ time: 1, loc: 1, ip: 0 }}, // somthing like this 
	 *	  {$group: blah blah}
	 * ]);
	 * 
	 * 
	 
*/

})();//(DataBridge)()
