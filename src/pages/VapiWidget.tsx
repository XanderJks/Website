import React from 'react';

export function VapiWidget() {
  return (
    <div className="relative z-50 max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Web Snippet_</h1>
      <p className="text-gray-300 mb-8">
        Easily integrate the Vapi Voice Widget into your website for enhanced user interaction.
      </p>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-6">
          Improve your website's user interaction with the Vapi Voice Widget. This robust tool enables your visitors to engage with a voice assistant for support and interaction, offering a smooth and contemporary way to connect with your services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">Steps for Installation</h2>
        
        <div className="space-y-10">
          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-3 tracking-wider">1. Insert the Widget Snippet</h3>
            <p className="text-gray-300 mb-4">
              Copy the snippet below and insert it into your website's HTML, ideally before the closing <code className="bg-gray-800 px-1 rounded">&lt;/body&gt;</code> tag.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
              <pre className="text-gray-300 text-sm"><code>{`<script>
  var vapiInstance = null;
  const assistant = "723fcb25-f4c2-4f79-b006-6d36f75341aa"; // Your assistant ID
  const apiKey = "13c0731f-dbde-4236-a9cd-fce5225d4b3d"; // Your Public API key
  const buttonConfig = {}; // Modify this as required

  (function (d, t) {
    var g = document.createElement(t),
      s = d.getElementsByTagName(t)[0];
    g.src =
      "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    g.defer = true;
    g.async = true;
    s.parentNode.insertBefore(g, s);

    g.onload = function () {
      vapiInstance = window.vapiSDK.run({
        apiKey: apiKey, // mandatory
        assistant: assistant, // mandatory
        config: buttonConfig, // optional
      });
    };
  })(document, "script");
</script>`}</code></pre>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-3 tracking-wider">2. Generate Your Assistant</h3>
            <p className="text-gray-300 mb-4">
              From your Vapi dashboard, create an assistant to get the assistant ID. Alternatively, define an assistant configuration directly in your website's code as demonstrated in the example below.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
              <pre className="text-gray-300 text-sm"><code>{`const assistant = {
  model: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    systemPrompt:
      "You're a versatile AI assistant named Vapi who is fun to talk with.",
  },
  voice: {
    provider: "11labs",
    voiceId: "paula",
  },
  firstMessage: "Hi, I am Vapi how can I assist you today?",
};`}</code></pre>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-3 tracking-wider">3. Modify the Button</h3>
            <p className="text-gray-300 mb-4">
              Modify the <code className="bg-gray-800 px-1 rounded">buttonConfig</code> object to align with your website's style and branding. Choose between a pill or round button and set colors, positions, and icons.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
              <pre className="text-gray-300 text-sm"><code>{`const buttonConfig = {
  position: "bottom-right", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
  offset: "40px", // decide how far the button should be from the edge
  width: "50px", // min-width of the button
  height: "50px", // height of the button
  idle: { // button state when the call is not active.
    color: \`rgb(93, 254, 202)\`, 
    type: "pill", // or "round"
    title: "Have a quick question?", // only required in case of Pill
    subtitle: "Talk with our AI assistant", // only required in case of pill
    icon: \`https://unpkg.com/lucide-static@0.321.0/icons/phone.svg\`,
  },
  loading: { // button state when the call is connecting
    color: \`rgb(93, 124, 202)\`,
    type: "pill", // or "round"
    title: "Connecting...", // only required in case of Pill
    subtitle: "Please wait", // only required in case of pill
    icon: \`https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg\`,
  },
  active: { // button state when the call is in progress or active.
    color: \`rgb(255, 0, 0)\`,
    type: "pill", // or "round"
    title: "Call is in progress...", // only required in case of Pill
    subtitle: "End the call.", // only required in case of pill
    icon: \`https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg\`,
  },
};`}</code></pre>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="text-xl font-semibold mb-3 tracking-wider">4. Add Functionality to Vapi Instance</h3>
            <p className="text-gray-300 mb-4">
              You can use the <code className="bg-gray-800 px-1 rounded">vapiInstance</code> returned from the run function in the snippet to further customize the behaviour. For instance, you might want to listen to various EventSource, or even send some messages to the bot programmatically.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6">
              <pre className="text-gray-300 text-sm"><code>{`vapiInstance.on('speech-start', () => {
  console.log('Speech has started');
});

vapiInstance.on('speech-end', () => {
  console.log('Speech has ended');
});

vapiInstance.on('call-start', () => {
  console.log('Call has started');
});

vapiInstance.on('call-end', () => {
  console.log('Call has stopped');
});

vapiInstance.on('volume-level', (volume) => {
  console.log(\`Assistant volume level: \${volume}\`);
});

// Function calls and transcripts will be sent via messages
vapiInstance.on('message', (message) => {
  console.log(message);
});

vapiInstance.on('error', (e) => {
  console.error(e)
});`}</code></pre>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-6">Customization</h2>
        <p className="text-gray-300 mb-6">
          Modify your assistant's behavior and the initial message users will see. Refer to the provided examples to customize the assistant's model, voice, and initial greeting.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">UI Customization</h2>
        <p className="text-gray-300 mb-6">
          For advanced styling, target the exposed CSS and other classes to ensure the widget's appearance aligns with your website's design. Here is a list of the classes you can customize:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-8">
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn</code>: The primary class for the Vapi button.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-is-idle</code>: The class for the Vapi button when the call is disconnected.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-is-active</code>: The class for the Vapi button when the call is active.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-is-loading</code>: The class for the Vapi button when the call is connecting.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-is-speaking</code>: The class for the Vapi button when the bot is speaking.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-pill</code>: The class for Vapi button to set pill variant.</li>
          <li><code className="bg-gray-800 px-1 rounded">.vapi-btn-round</code>: The class for Vapi button to set round variant.</li>
        </ul>
      </div>
    </div>
  );
}