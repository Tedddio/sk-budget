<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>Profile</h1>
<p>User id: {data.user.userId}</p>
<p>Full name: {data.user.fullname}</p>
<p>Email: {data.user.email}</p>
