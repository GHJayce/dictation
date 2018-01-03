
const header = {
	template: `
		<header>
			<a @click="goBack" class="back" v-show="showBack"><i class="fa fa-chevron-left"></i></a>
			<h3 class="title">{{ title }}</h3>
		</header>
	`,
	props: {
		title: {
			type: String,
			default: '听写小应用'
		},
		showBack: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		goBack () {
			router.back();
		}
	}
}


const menu = {
	template: `
		<ul>
			<template v-for="v in menuData">
				<li>
					<router-link :to="v.path" :class="v.class">{{ v.text }}</router-link>
				</li>
			</template>
		</ul>
	`,
	props: ['menuData']
}


const wordList = {
	template: `
		<div>
			<template v-for="(v, k) in data">
				<template v-if="hiddenKey !== k">
					<div class="panel" :class="{'panel-default': v.class, 'panel-active': nowActive === k}">
				        <div class="panel-heading">
				            <h4 class="panel-title">
				            	<template v-if="editorTitle === k">
				                	<input type="text" :value="v.title" v-model="data[k].title" @keydown="newWordTitle(k)">
				                </template>
				                <template v-else>
				                	<a data-toggle="collapse" :href="'#word'+ k">{{ v.title }}</a>
				                </template>
				                &nbsp;<i class="fa fa-edit text-primary" v-show="editorState" @click="editorWordTitle(k)"></i>
				                <i class="fa fa-trash pull-right text-remove" v-show="editorState" @click="removeWordBook(k)"></i>
				            </h4>
				        </div>
				        <div :id="'word'+ k" :class="v.open" class="collapse in">
				            <div class="panel-body">
				            	<template v-for="(w, wk) in v.words">
				                	<label class="word" @click="removeWord(wk, k)">
				                		{{ w }} <i class="fa fa-close remove" v-show="editorState"></i>
			                		</label>
				                </template>
				                <transition name="transition-opacity">
				                	<button class="btn add-btn" v-show="editorState" @click="addWord(k)"><i class="fa fa-plus"></i></button>
				                </transition>
				            </div>
				        </div>
				    </div>
				</template>
			</template>
		</div>
	`,
	props: {
		hiddenKey: {
			default: null
		},
		data: {
			type: Array,
			default: [
				{
					open: 'in',
					class: true,
					title: '默认词语本',
					words: ['你好']
				}
			]
		},
		editorState: {
			type: Boolean,
			default: false
		},
		nowActive: {
			default: null
		},
		editorTitle: null
	},
	methods: {
		addWord (key) {
			this.$emit('clickAdd', key);
		},
		removeWord (selfK, parentK) {
			this.$emit('clickRemove', selfK, parentK);
		},
		removeWordBook (key) {
			this.$emit('clickRemoveBook', key);
		},
		editorWordTitle (key) {
			this.$emit('clickEditorTitle', key);
		},
		newWordTitle (key) {
			this.$emit('newWordTitle', key);
		}
	}
}

const switchBtn = {
	template: `
		<button class="switch" :class="{'switch-checked': checked}" @click="choose"></button>
	`,
	props: {
		checked: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		choose () {
			if ( this.checked ) {
				this.checked = false;
			} else {
				this.checked = true;
			}
			this.$emit('switchChoose', this.checked);
		}
	}
}


Vue.component('d-header', header);
Vue.component('d-menu', menu);
Vue.component('d-word-list', wordList);
Vue.component('d-switch-btn', switchBtn);