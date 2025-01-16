import fcsdk from "https://esm.sh/@farcaster/frame-sdk@0.0.26";

// Global variable to expose the `isInFrame` flag
window.isInFrame = false;

// Initialize the Farcaster SDK and set the frame context
(async () => {
  await fcsdk.actions.ready();
  console.log("SDK initialized, context:", fcsdk.context);

  // Set the global `isInFrame` flag
  window.isInFrame = fcsdk.context.isInFrame || false;
  console.log("isInFrame:", window.isInFrame);

  // Define a global function to add a frame
  window.addFrame = async () => {
    try {
      await fcsdk.actions.addFrame();
      console.log("Frame added successfully!");
    } catch (error) {
      console.error("Error adding frame:", error);
    }
  };

  // Define a global function to close a frame
  window.closeFrame = async () => {
    try {
      await fcsdk.actions.close();
      console.log("Frame closed successfully!");
    } catch (error) {
      console.error("Error closing frame:", error);
    }
  };

  // Attach a click event listener to document for handling clicks
  document.addEventListener("click", (event) => {
    const target = event.target;

    // Check if the target is a button or a link
    if (target.tagName === "BUTTON" || target.tagName === "A") {
      console.log("Click detected on:", target.textContent);

      // Trigger addFrame if the text content matches "Add Frame"
      if (target.textContent?.trim() === "Add Frame") {
        window.addFrame();
      }

      // Trigger closeFrame if the text content matches "Close"
      if (target.textContent?.trim() === "Close") {
        window.closeFrame();
      }
    }
  });
})();
