
  document.getElementById("tinfillBtn").addEventListener("click", () => {
    const value = document.getElementById("tinfieldValue").value;
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (val) => {
          const input = document.getElementById("tin");
          const radio = document.getElementById("terms");
          const btn = document.getElementById("sign-in");
          if (input) {
            input.value = val;
          }
          if (radio) radio.checked = true;
          if (btn) btn.click();
        },
        args: [value]
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const pgurl = tabs[0].url;
      
  
      // For exact match
      if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/") {
        show("Sign-MOO");
      } 
      else if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/claimSearch") {
        show("Detail-MOO");
      }
      else if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/eligibilitySearch") {
      
      }
      else {
        show("match-other");
      }




       
      // For partial match (e.g., contains '123')
      /*else if (url.includes("123")) {
      show("match-123");
      }*/
      
    });
  
    function show(id) {
      document.getElementById(id).classList.remove("hidden");
    }
  });


  document.getElementById("openSite").addEventListener("click", () => {
  
    const url = document.getElementById("siteSelect").value;
  if (url) {
    chrome.tabs.create({ url });
  }
  });
