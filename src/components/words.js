
const Words = {
	template: `
		<div class="container-fluid">
			<div class="clear-both">
				<p class="pull-right d-flex">
					编辑&nbsp;&nbsp;<d-switch-btn :class="words.editor" @switchChoose="openEditor"></d-switch-btn>
				</p>
			</div>
			<d-word-list :data="words.dataList" :show-add-btn="words.editor"></d-word-list>
			
			<div class="choose-panel">
				<div class="panel-heading">
					<h4 class="panel-title">123</h4>
				</div>
				<div class="panel-body">
					<form>
						<div class="form-group">
							<div class="col-xs-10">
						  		<input type="text" class="form-control" placeholder="输入要添加的词语">
							</div>
							<button class="btn btn-primary col-sm-2">添加</button>
						</div>
					</form>
					<div class="alert alert-info"><i class="fa fa-info-circle"></i> 可以选择词本中的词语进行添加</div>
					<d-word-list :data="words.dataList"></d-word-list>
				</div>
			</div>
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
				editor: false
			}
		}
	},
	methods: {
		openEditor (bool) {
			this.words.editor = bool
		}
	}
}