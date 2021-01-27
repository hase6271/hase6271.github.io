var mixin_closing = {

	data : {
	},

	methods : {
		sendAjax: function(){ // ハイスコア書込
			$.ajax({
				url: 'setHiScore.php',
				data: self.myScore,
				dataType: 'json',
				type: 'post'
			}).done(function(data){
				if (data.result){
					alert('データ保存完了しました')
				};			
			}).fail(function(data){
				alert("サーバ通信エラー")
			});
		}
	}

}