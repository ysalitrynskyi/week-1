<script>
</script>

<style>
    h1 {
        font-size: 2rem;
        text-align: center;
        margin: 2rem 0;
    }

    h2 {
        font-size: 1.25rem;
        margin: 1.5rem 0 1rem;
    }

    p {
        margin: 1rem 0;
        line-height: 1.6;
    }
</style>

<h1>Convert Any Website to a Frame V2</h1>
<p>Warpcast Frame V2 makes it simple to turn any website into a Farcaster-compatible frame. By adding a single script to the bottom of your HTML file, your website will be compatible with the Farcaster ecosystem.</p>

<h2>Steps to Enable Warpcast Frame V2</h2>
<p>Follow these steps to convert your website into a Farcaster-compatible frame:</p>
<ol>
    <li>Edit your website's main HTML file.</li>
    <li>Add the following script tag just before the closing <code>&lt;/body&gt;</code> tag:</li>
		<p></p>
    <pre><code>&lt;script
	type="module"
	src="https://esm.town/v/dbee/fcReadyPublic" async&gt;
&lt;/script&gt;</code></pre>
	<p></p>
    <li>Ensure you include a <code>farcaster.json</code> file in your website's .well-known directory. This file is required for your frame to be recognized by the Farcaster ecosystem.</li>
    <li>Also, add the necessary meta tag to your HTML <code>&lt;head&gt;</code> section for proper functionality.</li>
    <p></p>
    <li>Save your changes and deploy your website.</li>
</ol>
<p>Once these steps are completed, your website will work seamlessly as a Warpcast Frame V2!</p>
