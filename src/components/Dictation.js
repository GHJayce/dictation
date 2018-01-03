const Dictation = {
	template: `
		<div class="container-fluid">
			<p class="words" @click="openChooseModal">
				<template v-if="listenWord.length === 0 && status === 0">
					<span class="text-gray">点我添加听写词语</span>
				</template>
				<template v-else-if="status === 1">
					<span>正在播报词语语音</span>
				</template>
				<template v-else-if="listenWord.length > 0 && status === 0">
					<template v-for="(v, k) in listenWord">
	                	<label class="word" @click="removeWord(k)">
	                		{{ v }} <i class="fa fa-close remove"></i>
	            		</label>
					</template>
				</template>
			</p>

			<transition name="fadeInUp">
				<div class="choose-panel" v-show="chooseModal">
						<div class="panel-heading">
							<h4 class="panel-title">
								选择要听写的词语
								<i class="fa fa-angle-down pull-right" @click="closeChooseModal"></i>
							</h4>
						</div>
						<div class="panel-body">
							<form onsubmit="return false">
								<div class="form-group d-flex d-flex-between">
									<div class="col-xs-10 row">
								  		<input type="text" class="form-control" placeholder="输入要添加的词语" v-model="addWordInput" @keyup.13="addWord">
									</div>
									<button class="btn btn-primary col-sm-2 add" type="button" @click="addWord">添加</button>
								</div>
							</form>
							<d-word-list :data="wordDataList" @clickRemove="chooseWord"></d-word-list>
						</div>
				</div>
			</transition>

			<button class="btn btn-primary col-xs-12 btn-lg" @click="dictation" :disabled="status !== 0">开始听写</button>
		</div>
	`,
	props: {
		listenWord: {
			type: Array,
			default: []
		},
		status: {
			default: 0
		},
		wordDataList: '',
		chooseModal: false,
		addWordInput: '',
	},
	created: function () {
		this.getLocalWordsData();
	},
	methods: {
		openChooseModal () {
			this.chooseModal = true;
		},
		closeChooseModal () {
			this.chooseModal = false;
		},
		addWord () {
			if ( this.listenWord.indexOf(this.addWordInput) === -1 ) {
				this.listenWord.push(this.addWordInput);
				this.addWordInput = '';
			}
		},
		getLocalWordsData () {
			if ( localStorage.wordList !== undefined || localStorage.wordList !== '' ) {
				this.wordDataList = JSON.parse(localStorage.wordList);
			}
		},
		chooseWord (selfK, parentK) {
			if ( this.listenWord.indexOf(this.wordDataList[parentK].words[selfK]) === -1 ) {
				this.listenWord.push(this.wordDataList[parentK].words[selfK]);
			}
		},
		removeWord (key) {
			this.listenWord.splice(key, 1);
		},
		dictation () {
			if ( this.status === 0 && this.listenWord.length > 0 ) {
				const autoListen = new autoDictation({
					audioElement: new Audio(),
					data: this.listenWord,
					over: (bool) => {
						if ( bool ) {
							console.log(this)
							this.status = 0;
						}
					}
				});
				autoListen.begin();
				this.status = 1;
			}
		}
	}
}