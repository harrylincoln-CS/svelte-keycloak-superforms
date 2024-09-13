<script lang="ts">
	import Form from '../lib/Form.svelte';
	import TextField from '../lib/TextField.svelte';
	import User from "../components/user.svelte";
	import type { LayoutServerData } from "./$types.js";

	export let data: LayoutServerData;
</script>

<h3>Multiple componentized Forms</h3>
<hr />

<h3>User stuff</h3>
<User
        data={{
          user: data?.session?.user,
          status: Boolean(data?.session),
        }}
      />

<h4>Register Form (only when logged in)</h4>
{#if data?.session?.user}
<!-- Form with dataType 'form' -->
<Form action="?/register" data={data.regForm} invalidateAll={false} let:message let:superform>
	{#if message}
		<div
			class="status"
			class:error={message.status >= 400}
			class:success={!message.status || message.status < 300}
		>
			{message.text}
		</div>
	{/if}

	<TextField type="text" {superform} field="name" label="Name"></TextField>
	<TextField type="text" {superform} field="email" label="E-Mail"></TextField>
	<p><button>Submit</button></p>
</Form>
{/if}

<hr />
<p>
	<a target="_blank" href="https://superforms.rocks/components"
		>Documentation about componentization here</a
	>
</p>

<style>
	.status {
		color: white;
		padding: 6px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
		margin-block: 0.75em;
	}

	.status.success {
		background-color: seagreen;
	}

	.status.error {
		background-color: #ff2a02;
	}

	hr {
		margin: 2rem 0;
	}
</style>
