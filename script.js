
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
	el: "#app",
	router,
	data() {
		return {
			posts: [''],
			page: 1,
			perPage: 9,
			pages: [],
		}
	},
	methods: {
		async getPosts() {
			const res = await fetch('http://localhost:5001/fetch/users', {
				headers: new Headers({
					pageSize:100,
					pageNo:1
				})
			});
			const data = await res.json();
			console.log(data)
			this.posts = data;
			// let data = [];
			// for (let i = 0; i < 50; i++) {
			// 	this.posts.push({
			// 		first: 'John',
			// 		last: 'Doe',
			// 		suffix: '#' + i
			// 	});
			// }
		},
		setPages() {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate(posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return posts.slice(from, to);
		}
	},
	computed: {
		displayedPosts() {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts() {
			this.setPages();
		}
	},
	created() {
		this.getPosts();
	},
	filters: {
		trimWords(value) {
			return value.split(" ").splice(0, 20).join(" ") + '...';
		}
	}
}).$mount('#app')