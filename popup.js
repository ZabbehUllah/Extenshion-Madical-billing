
  
  // functions 
  function show(id) {
      document.getElementById(id).classList.remove("hidden");
    } 
  /*function cons(id) {
      const id = document.getElementById(id).value;;
  }*/
  

  //get to know which site is open moo
  document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const pgurl = tabs[0].url;
      
  
      // For exact match
      if (pgurl.includes("mutualofomaha.com")) {

        if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/") {
          show("Sign-MOO");
        } 
        else if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/claimSearch") {
          show("Detail-MOO");
          /*show("sec_id");
          show("p_dob");
          show("dos_s");
          show("dos_e");
          show("btn");
          let ins = moo; // ✅ clearer variable name
          document.getElementById("tempBtn").id = "fil_" + ins + "_fom";
          */
        }
        //else if (pgurl === "https://www31.mutualofomaha.com/ProviderAccess/eligibilitySearch") {
        //}
        else {
        show("Sign-MOO");
        }
      }
      else if (pgurl.includes("apps.availity.com")) {
        const form = document.getElementById('all_input');
        show("availity");
        show("sec_id");
        show("p_name");
        show("p_dob");
        show("dos_s");
        show("dos_e");
        show("btn");
        form.insertBefore(sec_id, p_name, p_dob, dos_s, dos_e);
        console.log("btn trigerd 1");
        console.log("btn trigerd 5555555555555555");
        //const btn = document.getElementById('fil_fom');
        //btn.id = 'availity_btn';

      }
      else if (pgurl.includes("secure.uhcprovider")) {
        const form = document.getElementById('all_input');
        show("sec_id");
        show("p_dob");
        show("dos_s");
        show("dos_e");
        show("btn");
        form.insertBefore(sec_id, p_dob, dos_s, dos_e);


        document.getElementById("Claim_Sec_Insurance_ID_in").addEventListener("paste", (event) => {
        // Wait for the paste to actually insert the content
        setTimeout(() => {
          
          const fullText = event.target.value.trim();
          const parts = fullText.split("\t"); // tab-separated values from Excel
      
          // Assign values to inputs if available
          if (parts.length >= 4) {
            document.getElementById("Claim_Sec_Insurance_ID_in").value = parts[0]; // already pasted
            document.getElementById("Patient_DOB_in").value = parts[1];
            document.getElementById("Claim_DOSs_in").value = parts[2];
            document.getElementById("Claim_DOSe_in").value = parts[3];
          }
        }, 10); // short delay so paste completes
  });


      }
      else if (pgurl.includes("emr mremind.com")) {
        show("emr");
      }
      else {
        show("nothing");
      }




      //Run when page is completely loaded
      //window.addEventListener("load", () => {});
      //For partial match (e.g., contains '123')
      /*else if (url.includes("123")) {
      show("match-123");
      }*/
      
    });
  });

// mutual fill start
 //fill tin Moo
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
    //not workink
    //async function t_stop() {
    //await new Promise(r => setTimeout(r, 1000));
   // }
    //t_stop();

    //const ch_moo = "https://www31.mutualofomaha.com/ProviderAccess/claimSearch";
    //if (ch_moo) {
   // chrome.tabs.update({ ch_moo });
   // }

    //location.href = "https://www31.mutualofomaha.com/ProviderAccess/claimSearch";//new
    //swindow.location.replace("https://www31.mutualofomaha.com/ProviderAccess/claimSearch");//new
  });
  //mew fill moo fill
  //paste data on multipal input moo
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
  // When the "Fill on Website" button is clicked moo
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
         
          document.getElementById("claimsSearchSubmit").click();
        },
        // These are the values passed into the function
        args: [cinsid, cdob, cdos, cdose]
      });
    });
  });
// mutual fill end
// uhc is working
  document.getElementById("fil_fom").addEventListener("click", () => {
    // Get the values from the popup form inputs
    const ainsid = document.getElementById("Claim_Sec_Insurance_ID_in").value;
    const adob = document.getElementById("Patient_DOB_in").value;
    const adoss = document.getElementById("Claim_DOSs_in").value;
    const adose = document.getElementById("Claim_DOSe_in").value;

    // Find the current active tab in Chrome
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]; // the current tab

      // Inject and run a script in that tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // This is the function that runs in the webpage
        func: (osid, osdob, osdoss, osdose) => {
          // Fill the webpage inputs by ID
          document.querySelector('input[name="search.claim.memberId"]').value = osid;
          document.querySelector('input[name="search.claim.dateOfBirth"]').value = osdob;
          document.querySelector('input[name="search.dates.firstServiceDate"]').value = osdoss;
          document.querySelector('input[name="search.dates.lastServiceDate"]').value = osdose;
          console.log("its just the try and again ");
        },
        // These are the values passed into the function
        args: [ainsid, adob, adoss, adose]
      });
    });
  });



// Avality fill start
 /* document.getElementById("fil_fom").addEventListener("click", () => {
    // Get the values from the popup form inputs
    console.log("btn trigerd 2");
    const ainsid = document.getElementById("Claim_Sec_Insurance_ID_in").value;
    const aname = document.getElementById("Patient_Name_in").value;
    const adob = document.getElementById("Patient_DOB_in").value;
    const adoss = document.getElementById("Claim_DOSs_in").value;
    const adose = document.getElementById("Claim_DOSs_in").value;
    console.log("btn trigerd oknot");

    // Find the current active tab in Chrome
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]; // the current tab

      // Inject and run a script in that tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        // This is the function that runs in the webpage
        func: (osinsid, osln, osdob, osdoss, osdose) => {
          // Fill the webpage inputs by ID
          document.getElementById("patientMemberId").value = osinsid;
          document.getElementById("patientLastName").value = osln;
          //document.getElementById("patientFirstName").value = osdoss;
          document.getElementById("patientBirthDate").value = osdob;
          document.getElementById("serviceDates-start").value = osdoss;
          document.getElementById("serviceDates-end").value = osdose;

          console.log("its just the try and again ");
          //submit btn
          //document.getElementById("submit-by276").click();
          //document.getElementById("clearForm").click();
          
        },
        // These are the values passed into the function
        args: [ainsid, aname, adob, adoss, adose]
      });
    });
  });*/
// Avality fill end
  //go for the site 
  document.getElementById("openSite").addEventListener("click", () => {
  
    const churl = document.getElementById("siteSelect").value;
  if (churl) {
    chrome.tabs.create({ churl });
  }
  });
