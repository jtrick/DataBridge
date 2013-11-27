

function DataBridge(obj) {
	obj = 
	var host = obj.host || 'local',
		data = obj.data || 'default',
		data = obj.data || 'default',
		data = obj.data || 'default';
		
}



// Performs basic checks for JSON structure and returns the extracted object if applicable, returns the original string otherwise.
function jsonToObj(str) {
	if (!$.isString(str)) { return str; }
	// Fix. Complete these checks.
	var obj = JSON.parse(str);
	return $.isPlainObject(obj) ? obj : str;
}






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
     
     
     /**
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
