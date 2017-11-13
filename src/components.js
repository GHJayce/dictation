
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


Vue.component('d-header', header);
Vue.component('d-menu', menu);
