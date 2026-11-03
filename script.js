
const API_URL = "https://script.google.com/a/macros/jalsd.org/s/AKfycbyndNGga2a7EiXn9uyWljsX71y2njJ2PKvU-PLA9gRjvfNB46Z_GCx6sFX_pdxZHpjNFQ/exec";

const input = document.getElementById("url");
const message = document.getElementById("message");

function openWebsite(value) {
  let url;

  try {
    url = new URL(
      value.includes("://") ? value : "https://" + value
    );

    if (url.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    message.textContent = "Please enter a valid HTTPS address.";
    return;
  }

  message.textContent = "Checking website...";

  const oldScript = document.getElementById("apiRequest");
  if (oldScript) oldScript.remove();

  const callback = "handleMyProxyResponse";

  window[callback] = function(data) {
    message.textContent = data.success
      ? "Website approved: " + url.hostname
      : data.message;

    delete window[callback];
  };

  const script = document.createElement("script");
  script.id = "apiRequest";
  script.src = API_URL +
    "?url=" + encodeURIComponent(url.href) +
    "&callback=" + callback;

  script.onerror = function() {
    message.textContent = "Could not connect to MyProxy.";
    delete window[callback];
  };

  document.body.appendChild(script);
}

document.getElementById("searchForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();
    openWebsite(input.value.trim());
  });

document.querySelectorAll(".shortcut").forEach(item => {
  item.addEventListener("click", () => {
    const url = item.dataset.url;
    input.value = url;
    openWebsite(url);
  });
});
