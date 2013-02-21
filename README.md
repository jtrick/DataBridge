DataBridge
==========

Abstract API/protocol for universal data interaction, regardless of language, database, platform, implementation, model, etc.

The goal for this project is to remove constraints for working with data to allow for a universal methodology that can be applied anywhere.  You can think of this as sort of like jQuery for data, or more directly like applying the concept of data abstraction like JSON to a working copy of the data itself.

The idea is to be able to chain together data constraints, modifiers, functions, or whatever, in a freeform way that suits the needs of the application and/or developer.  Instead of getting hung up on syntax, we can focus purely on the concepts.  We use an object model to allow for nested hierarchies of meaning, inherent to the structure and context of the data itself.

We're using PHP for the initial iteration because we're forking the Autonomous Collaboration Engine's DatabaseObj and modifying its level abstraction to a more extreme degree.  As the project evolves, we'll want to port it into any language that anyone wants to use it for, but the demos and examples will use PHP as a base.  An added benefit of PHP is that it's so widely used, simple, and has support for essentially any of the functionality that you might want for the task.

Default options for the class can be set directly on the class itself, inherited from the class and overridden, set in a config file, or specified using a string containing a path to a file, etc.  Flexibility and simplicity are primary goals of the project, so whatever mechanisms you prefer to use can be incorporated. 



== Examples: ==


=== Instantiation: ===

// Instantiate a new DataBridge object using the local language constructs:
$db = new DataBridge(array(
  'host' => 'host_uri',  // Defaults to whatever the preferred context may be. Could be 'localhost', './', 'http://...'.
  'data' => 'data_source',  // Typically a database name, but could also be any number of other options.
  'user' => 'user',  // The user authentication identifier to be used to reference access privilages, if applicable. 
  'pass' => 'pass'  // The authentication password used for the user, if applicable.
));

// Which obviously could actually look like this:
$db = new DataBridge(array('host'=>$Host,'data=>$Data,'user'=>$User,'pass':$Pass));  // Or whatever...


// Instantiate a new DataBridge object using a JSON string:
$db = new DataBridge('{
  "host" : "host_uri",
  "data" : "data_source",
  "user" : "user",
  "pass" : "pass"
}');

// Which obviously could actually look like this:
$db = new DataBridge('{"host":"{{host}}","data":"{{data}}","user":"{{user}}","pass":"{{pass}}"}');  // Or whatever...


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
$db->Get('{
  "table" : {
    "field1" : "filterVal",
    "field2" : ">=filterVal",
    "field3" : "<filterVal",
    "field4" : "!filterVal"
  }
}');





