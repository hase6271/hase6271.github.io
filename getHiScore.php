<?php

$dbname 	= 'shinkeisuijaku';        // データベース名
$host 		= 'localhost';        // ホスト
$user 		= 'root';         // mysqlに接続するユーザー
$password 	= '';    // パスワード
$dns 		= 'mysql:dbname='.$dbname.';host='.$host.';charset=utf8';

try {

    $pdo = new PDO($dns, $user, $password);
    // SQL作成
	$sql 	= "SELECT * FROM mytable";
	$stmt 	= $pdo->prepare($sql);
	$stmt->execute();
	
	//エラーを表示する
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$scores = array();
	//データの取得
	while($res = $stmt->fetch(PDO::FETCH_ASSOC)){
		$scores[] = $res;
	}
	$result = ["res"=>true, "scores"=>$scores];

} catch (PDOException $e) {
	$result = ["res"=>false, "message"=>$e->getMessage()];

} finally {
	$dbh = null;	//接続を閉じる
}


	// 結果表示
	header( "Content-Type: application/json; charset=utf-8" );
	echo json_encode($result);
