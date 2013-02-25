<?php namespace Com\Aep\Database;
	
	abstract class Bridge {
		protected $sql = [
			'select' => "SELECT %s",
			'from'   => "FROM %s",
			'where'  => "WHERE %s=%s",
			'insert' => "INSERT INTO %s",
			'values' => "(%s)",
			'order'  => "ORDER BY %s",
			'update' => "UPDATE %s",
			'set'    => "SET %s=%s",
			'delete' => "DELETE"
		];

		protected $db_info;

		function __construct(array $args) {
			$this->db_info = $args;
		}

		abstract protected function connect();

		abstract protected function process(array $kwargs);

		public function query($kwargs) {
			$res = $this->process(json_decode($kwargs, true));
			
			return json_encode($res);
		}
	}
	
	class Dictionary extends ArrayObject {
		function __construct() {
			parent::__construct(array(), self::ARRAY_AS_PROPS);
		}
	}


	class MySQLBridge extends Bridge {
		protected function connect() {
			# mysql_connector
		}

		protected function process(array $kwargs) {
			# Build and execute sql query
			return $kwargs;
		}
	}


	class PostgreBridge extends Bridge {
		protected function connect() {
			# postgres connectot
		}

		protected function process(array $kwargs) {
			# Build and execute postgreSQL
		}		
	}


	class SQLiteBridge extends Bridge {
		protected function connect() {
			#sql lite connector
		}

		protected function process(array $kwargs) {

		}		
	}		


	class Engineer {
		/**
		 * Returns new dialect object.
		 * @param DataSourceName	<driver>://<username>:<password>@<host>[:<port>]/<database>
		 */
		public function create_bridge($dsn) {
			$regex = preg_split('([^\w+\.])', $dsn, -1 , PREG_SPLIT_NO_EMPTY);
		
			$db_info = array(
				'driver'   => $regex[0],
				'username' => $regex[1],
				'password' => $regex[2],
				'host'     => $regex[3],
				'port'     => $regex[4],
				'database' => $regex[5]
			);

			$bridge = NULL;

			switch ($db_info['driver']) {
				case 'mysql':
					$bridge = new MySQLBridge($db_info);
					break;

				case 'pgsql':
					$bridge = new PostgreBridge($db_info);
					break;

				case 'sqlite':
					$bridge = new SQLiteBridge($db_info);
					break;
			}

			return $bridge;
		}
	}

	$engineer = new DataBridge();
	$mysql_brdg = $engineer->create_bridge("mysql://jsantiago:mypassword@127.0.0.1:123/mydatabse");

	$res = $mysql_brdg->query('{"select":["name", "email"], "from":"users"}');
	
	print_r($res);
?>