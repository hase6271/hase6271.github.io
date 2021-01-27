var app = new Vue({

	el: '#content',

	mixins:[ mixin_opening, mixin_closing ],

	data: {
		scores: 	[],
		cards: 	[], // [{s:'d',n:'01', state:false}, {s:'h',n:'02', state:false}
		dummycards: new Array(13),

		actionCount: 0,	// アクション回数 = スコア
		isMatch: 	false,
		index_past : null,
		okSound: null,
		ngSound: null,
		finishSound: null,

		matchOKmess: false,
		matchNGmess: false,
		finishMess: false,
		finishRegMess: false,

		message: '',
		myScore : { name : '',　score: 0　},

	},
	methods:{
		finishedMessage(){
			this.finishMess = true;
			this.finishSound.play();
			setTimeout(function(){
				self.matchOKmess = false;
				self.matchNGmess = false;
			},3000);
			if (this.actionCount < _.maxBy(this.scores, "score")){
				this.finishMess = true;
				this.finishSound.play();
			};
		},
		flipMe: function(index){
			var self 	= this;
			if (self.cards[index].state) return; // Flip済はNG
			self.cards[index].state = true;

			if (self.index_past === null){ // 開き置きがない場合
				self.index_past = index;

			} else { // 開き置きがある場合
				++ self.actionCount;

				if (self.cards[self.index_past].n != self.cards[index].n){
					// 数字が合致しなかった場合
					this.showMatchMessage(false);
					this.resetPairCards(self.index_past, index);
				} else {
					// 数字が合致した場合
					if (_.some(self.cards, { state: false })) {
						this.showMatchMessage(true);
					} else {
						this.finishedMessage();

					} // true

				}
				self.index_past = null;
			}
		},
		resetPairCards:function(index, index2){
			var self = this;
			self.index_past = null;
			setTimeout(function(){
				self.cards[index].state = false;
				self.cards[index2].state = false;
			}, 1000, index, index2);
		},
		showMatchMessage: function(result){
			var self = this;
			if (result) {
				this.matchOKmess = true;
				this.okSound.play();
			} else {
				this.matchNGmess = true;
				this.ngSound.play();
			}
			setTimeout(function(){
				self.matchOKmess = false;
				self.matchNGmess = false;
			},1000)
		},
		showFinishedMessage: function(){
			this.finishMess = true;
			this.ngSound.play();
		}
	},
	mounted : function () {

		var self = this;

		// cardsを生成して乱数化する
		var tmp = [];
		var suites = ['s','h','d','c'];
		for (var i=0; i<4; i++){
			for (var j=10; j<=13; j++){
				var card = { s:suites[i], n: ('00' + j).substr(-2), state:false };
				tmp.push(card);
			}
		}
		this.cards = _.sampleSize(tmp, 52);

		this.okSound = new Audio('se/correct.mp3');
		this.ngSound = new Audio('se/incorrect.mp3');
		this.finishSound = new Audio('se/finish.mp3');

	},
	computed : {
		getMyPicture: function(){
			self = this;
			return function (index) {
				if (!self.cards[index].state) {
					return self.cards[index].s + self.cards[index].n + '.png';
				} else {
					return 'bk0.png';
				}
			};			
		},
		isCompleted: function(){
			return !(_.some(this.cards, function(cd) {
				return (cd.state == false);
			}));
		}

	}

})
