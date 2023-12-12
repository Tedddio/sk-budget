<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="firstName">First name</label>
	<input name="firstName" id="firstName" /><br />
	<label for="lastName">Last name</label>
	<input name="lastName" id="lastName" /><br />
	<label for="email">Email</label>
	<input name="email" id="email" type="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
<a href="/signin">Sign in</a>
