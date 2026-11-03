
const input = document.getElementById("url");
const message = document.getElementById("message");

document.getElementById("searchForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const value = input.value.trim();

    if (!value) {
      message.textContent = "Enter a website first!";
      return;
    }

    message.textContent = "Button works! You entered: " + value;
  });
