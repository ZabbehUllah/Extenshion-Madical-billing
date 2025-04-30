
  document.getElementById("fillBtn").addEventListener("click", () => {
    const value = document.getElementById("fieldValue").value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (val) => {
          const input = document.getElementById("tin");
          if (input) {
            input.value = val;
            input.style.border = "2px solid green"; // visual feedback
          }
        },
        args: [value]
      });
    });
  });