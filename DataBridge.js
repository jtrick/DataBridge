(function () {
	
	function is(val,typ) {
        if (!typ) return (typeof val != 'undefined');
        if (typ=='fnc'||typ=='function') return (typeof val == 'function');
        if (typ=='str'||typ=='string') return (typeof val == 'string');
        if (typ=='obj'||typ=='object') return (val === Object(val));
        if (typ=='arr'||typ=='array') { 
			if (Array.isArray) return Array.isArray(val);
			return Object.prototype.toString.call(val) == '[object Array]';
        }
	}
	
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
	
	function extend() {
		for (var i = 1, n = arguments.length, i < n; ++i) {
			for (var key in arguments[i]) {
				arguments[0][key] = arguments[i][key];
			}
		}
	
		return arguments[0];
	}	
	
	var _bridge = Object.freeze({
		"mongo": function (conn) {
			var db = require("mongodb").MongoClient("mongodb://%{host}s/%{database}s");
			
			return {
				"get": function (k, v) {
					return db.collection.find({k:v});
				},
				"set": function (k, v, set) {
					return db.collection.update({k, v}, $set:set);
				},
				"rem": function () {
					
				},
				"new": function () {
					return db.collection.insert(arguments[0]);
				},
				"delete": function () {
					
				},
				"exe": function () {
					
				}
			};
		},
		"sql": function (conn) {
		
		},
		"postgres": function () {
	
		},
		"redis": function () {
	
		}
	});
	
	function DataBridge(kwargs) {
		if (!(kwargs = jsonToObj(kwargs))) return;
		
		var conn = extend({
			"driver"  : "",	// database type
			"username": "",	// user authentication
			"password": "",	// authentication password		
			"host"    : "",	// location of database instance
			"port"    : "",	// port where the instance is listening
			"database": ""	// name of the database
		}, kwargs);

		return new _bridge[kwargs.driver](conn);
	}

})();
