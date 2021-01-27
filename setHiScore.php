<?php




$dbname = 'shinkeisuijaku';        // データベース名
$host = 'localhost';        // ホスト
$user = 'root';         // mysqlに接続するユーザー
$password = 'skytree';    // パスワード
$dns = 'mysql:dbname='.$dbname.';host='.$host.';charset=utf8';
try {

    $pdo = new PDO($dns, $user, $password,);
    
    
    $sql = "INSERT INTO mytable (name,score) VALUES (:pname, :hiscore)";
	$stmt = $pdo->prepare($sql);
    
} catch (PDOException $e) {
    echo ('データベースに接続できませんでした。' . $e->getMessage());
}
	//接続を閉じる
	$dbh = null;
	
	$citys = array('長谷'=>129, '張'=>43);

	foreach ($citys as $key => $val) {
 
  	// 連想配列のキーを :name に、値を :hiscore にセットし、executeでSQLを実行する
  	$stmt->execute(array(':name' => $key, ':hiscore' => $val));
 
	}
	
	
	
	
	
?>	