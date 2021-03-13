
<template>
  <div id="app" class="col-sm-12">
  <div class="offset">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>User ID</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="p in displayedPosts" v-bind:key="p.user_id">
      <td>{{p.first_name}}</td>
      <td>{{p.last_name}}</td>

      <td><router-link :to="`/friends/${p.user_id}`" >{{p.user_id}}</router-link></td>
    </tr>
    </tbody>
  </table>
    <nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber" v-bind:key="pageNumber"> {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
				</li>
			</ul>
		</nav>	
  </div>
</div>

</template>
<script>
export default {
  name: 'Users',
    data() {
		return {
			posts: [''],
			page: 1,
			perPage: 9,
			pages: []
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
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>