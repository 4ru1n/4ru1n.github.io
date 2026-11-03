
document.getElementById("searchForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const input = document.getElementById("url");
    const message = document.getElementById("message");

    try {
      const url = new URL(
        input.value.includes("://")
          ? input.value
          : "https://" + input.value
      );

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("Invalid protocol");
      }

      message.textContent =
        "Website address accepted: " + url.hostname;
    } catch {
      message.textContent = "Please enter a valid URL.";
    }
  });
