
<?php
	include('components/Index.js');
	include('components/Dictation.js');
	include('components/Words.js');
?>

const routes = [
	{
		path: '/',
		component: Index
	},
	{
		path: '/dictation',
		component: Dictation
	},
	{
		path: '/words',
		component: Words
	}
];

const router = new VueRouter({
	routes
});
