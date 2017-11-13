
const app = new Vue({
	router,
	data: {
		app: {
			showBack: false,
			title: '听写小应用'
		},
		index: ''
	},
	methods: {
		routes: function () {
			const path = this._route.path;
			switch (path) {
				case '/':
					this.app.showBack = false;
					this.app.title = '听写小应用';
					break;
				case '/dictation':
					this.app.showBack = true;
					this.app.title = '听写准备中';
					break;
				case '/words':
					this.app.showBack = true;
					this.app.title = '词语本';
					break;
				case '/history':
					this.app.showBack = true;
					this.app.title = '听写记录';
					break;
				case '/setting':
					this.app.showBack = true;
					this.app.title = '设置';
					break;
			}
		}
	},
	created: function () {
		this.routes();
	},
	beforeCreate: () => {
		this.index = {
			menuData: [
				{
					path: '/dictation',
					class: 'box box-big bgdc-green',
					text: '进入听写'
				},
				{
					path: '/words',
					class: 'box box-medium bgdc-red',
					text: '词语本'
				},
				{
					path: '/history',
					class: 'box box-medium bgdc-orange',
					text: '听写记录'
				},
				{
					path: '/setting',
					class: 'box box-small bgdc-dark-blue',
					text: '设置'
				}
			]
		}
	},
	watch: {
		"$route": function () {
			this.routes();
		}
	}
}).$mount('#app')