
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

  //paste script
  document.getElementById("insid").addEventListener("paste", (event) => {
    // Wait for the paste to actually insert the content
    setTimeout(() => {
      const fullText = event.target.value.trim();
      const parts = fullText.split("\t"); // tab-separated values from Excel
  
      // Assign values to inputs if available
      if (parts.length >= 4) {
        document.getElementById("insid").value = parts[0]; // already pasted
        document.getElementById("dob").value = parts[1];
        document.getElementById("doss").value = parts[2];
        document.getElementById("dose").value = parts[3];
      }
    }, 10); // short delay so paste completes
  });
  
  // When the "Fill on Website" button is clicked
  document.getElementById("frmfill-moo").addEventListener("click", () => {
    // Get the values from the popup form inputs
    const cinsid = document.getElementById("insid").value;
    const cdob = document.getElementById("dob").value;
    const cdos = document.getElementById("doss").value;
    const cdose = document.getElementById("dose").value;

    // Find the current active tab in Chrome
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]; // the current tab

      // Inject and run a script in that tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // This is the function that runs in the webpage
        func: (osinsid, osdob, osdoss, osdose) => {
          // Fill the webpage inputs by ID
          document.getElementById("policy-1").value = osinsid;
          document.getElementById("dob-1").value = osdob;
          document.getElementById("dos-start").value = osdoss;
          document.getElementById("dos-end").value = osdose;
          document.getElementById("dos-end").value = osdose;

          //document.getElementById("claimsSearchSubmit").click();

        },
        // These are the values passed into the function
        args: [cinsid, cdob, cdos, cdose]
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




       // Run when page is completely loaded
      //window.addEventListener("load", () => {});
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
