
const Words = {
	template: `
		<div class="container-fluid">
			<div class="clear-both">
				<p class="pull-right d-flex">
					编辑&nbsp;&nbsp;<d-switch-btn :checked="words.editor" @switchChoose="openEditor"></d-switch-btn>
				</p>
			</div>
			<d-word-list :data="words.dataList" :editor-state="words.editor" @clickAdd="openChooseModal" @clickRemove="wordRemove" :nowActive="words.prevChooseModalKey" @clickRemoveBook="wordBookRemove" :editor-title="words.editorTitle" @clickEditorTitle="changeWordTitle" @newWordTitle="saveWordTitle"></d-word-list>
			<button class="add-btn text-center col-xs-12" v-show="words.editor" @click="createWordBook">添加词本</button>
			
			<transition name="fadeInUp">
				<div class="choose-panel" v-show="words.chooseModal">
						<div class="panel-heading">
							<h4 class="panel-title">
								{{ words.nowWordBook.title }}
								<i class="fa fa-angle-down pull-right" @click="closeChooseModal"></i>
							</h4>
						</div>
						<div class="panel-body">
							<form onsubmit="return false">
								<div class="form-group d-flex d-flex-between">
									<div class="col-xs-10 row">
								  		<input type="text" class="form-control" placeholder="输入要添加的词语" v-model="words.addWordInput" @keyup.13="addWord">
									</div>
									<button class="btn btn-primary col-sm-2 add" type="button" @click="addWord">添加</button>
								</div>
							</form>
							<div class="alert alert-info"><i class="fa fa-info-circle"></i> 可以选择词本中的词语进行添加</div>
							<d-word-list :data="words.dataList" :hidden-key="words.hideKey" @clickRemove="addWordToWordBook"></d-word-list>
						</div>
				</div>
			</transition>
	    <div>
	`,
	props: {
		words: {
			type: Object,
			default: {
				dataList: [
					{
						open: 'in',
						class: true,
						title: '默认词语本',
						words: ['你好']
					}
				],
				editor: false, // 编辑状态
				hideKey: null, // 要隐藏词本列表中的指定词本的id
				chooseModal: false, // 用于是否弹出选择对话层
				nowWordBook: {
					title: '' // 当前选择词本的标题
				},
				prevChooseModalKey: '', // 上一次选择词本的id，用于关掉编辑状态时，去除词本的高亮状态
				addWordInput: '', // 要添加的词语
				editorTitle: '' // 编辑词本标题，的id
			}
		},
	},
	created: function () {
		this.getLocalWordsData()
	},
	methods: {
		openEditor (bool) {
			this.words.editor = bool
			if ( this.words.editor === false ) {
				this.closeChooseModal()
			}
		},
		openChooseModal (key) {
			this.words.chooseModal = true; // 显示选择对话层
			this.words.hideKey = key; // 对话层词本列表，要隐藏当前选择的词本的id
			this.words.nowWordBook.title = this.words.dataList[key].title; // 当前选择词本的标题
			this.words.dataList[key].active = true; // 当前选择词本高亮

			this.words.prevChooseModalKey = key;
		},
		closeChooseModal () {
			this.words.editorTitle = false; // 关闭编辑词本标题
			this.words.chooseModal = false; // 关闭选择对话层
			if ( this.words.prevChooseModalKey !== '' ) {
				this.words.dataList[this.words.prevChooseModalKey].active = false; // 去除词本的高亮

				this.words.prevChooseModalKey = ''; // 清空选择词本的id
			}
		},
		wordRemove (selfK, parentK) { // 删除词语
			if ( this.words.editor ) {
				let localWordList = JSON.parse(localStorage.wordList);

				localWordList[parentK].words.splice(selfK, 1);
				localStorage.wordList = JSON.stringify(localWordList);

				this.getLocalWordsData();
			}
		},
		getLocalWordsData () {
			if ( localStorage.wordList === undefined || localStorage.wordList === '' ) {
				localStorage.wordList = JSON.stringify(this.words.dataList);
			} else {
				this.words.dataList = JSON.parse(localStorage.wordList);
			}
		},
		addWord () {
			if ( this.words.editor && this.words.prevChooseModalKey !== '' && this.words.addWordInput !== '' ) {
				let localWordList = JSON.parse(localStorage.wordList);

				localWordList[this.words.prevChooseModalKey].words.push(this.words.addWordInput);
				localStorage.wordList = JSON.stringify(localWordList);

				this.words.addWordInput = '';

				this.getLocalWordsData();
			}
		},
		wordBookRemove (key) {
			if ( this.words.editor ) {
				let localWordList = JSON.parse(localStorage.wordList);

				localWordList.splice(key, 1);
				localStorage.wordList = JSON.stringify(localWordList);

				this.getLocalWordsData();
			}
		},
		createWordBook () {
			const date = new Date(),
				arr = {
					open: '',
					class: true,
					title: '词本'+ date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds(),
					words: []
				},
				localWordList = JSON.parse(localStorage.wordList);

			localWordList.push(arr);
			localStorage.wordList = JSON.stringify(localWordList);

			this.getLocalWordsData();
		},
		changeWordTitle (key) {
			this.words.editorTitle = key;
		},
		saveWordTitle (key) {
			console.log(this.words.dataList[key].title)
		},
		addWordToWordBook (slefK, parentK) {
			if ( this.words.editor ) {
				let localWordList = JSON.parse(localStorage.wordList);

				if ( localWordList[this.words.prevChooseModalKey].words.indexOf(this.words.dataList[parentK].words[slefK]) === -1 ) {
					localWordList[this.words.prevChooseModalKey].words.push(this.words.dataList[parentK].words[slefK]);
					localStorage.wordList = JSON.stringify(localWordList);

					this.getLocalWordsData();
				}
			}
		}
	}
}