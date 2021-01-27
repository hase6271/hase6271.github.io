var mixin_opening = {

	data : {
		startGameMess : false,
		scoreMin: {}
	},
	methods : {
		startGame: function(){
			this.startGameMess = false;
		}
	},
	mounted : function () {
		var self = this;

		// ハイスコアをサーバから取得して表示
		$.fancybox.open({
			src:"#startMessage", type:"inline"
		});
		$.ajax({
			url:'getHiScore.php',
			dataType:'json'
		}).done(function(data){
			self.scores 	= _.clone(data.scores);
			self.scoreMin 	= _.maxBy(self.scores, function(sc) {
				return sc.score;
			});
			// → { 'name': 'barney', 'age': 36 };			
			// self.startGameMess = true;
		}).fail(function(data){
			alert("サーバ通信エラー")
		});
	}
}