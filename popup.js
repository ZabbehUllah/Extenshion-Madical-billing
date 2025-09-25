
  
  // functions 
  function show(id) {
      document.getElementById(id).classList.remove("hidden");
    } 
  //variable
  let moo_btn = false;
  let uhc_btn = false; 
  let availity_btn = false;

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
         /*const form = document.getElementById('all_input');
          show("sec_id");
          show("p_dob");
          show("dos_s");
          show("dos_e");
          show("btn");
          form.insertBefore(sec_id, p_dob, dos_s, dos_e);
          moo_btn = true;*/


           document.getElementById("Claim_Sec_Insurance_ID_in").addEventListener("paste", (event) => {
            // Wait for the paste to actually insert the content
            setTimeout(() => {
              const fullText = event.target.value.trim();//.replace(/"/g, '');
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
        availity_btn = true;

        //console.log("btn trigerd 1");
        //const btn = document.getElementById('fil_fom');
        //btn.id = 'availity_btn';
        /*document.getElementById("Claim_Sec_Insurance_ID_in").addEventListener("paste", (event) => {
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
        });*/
        

      }
      else if (pgurl.includes("secure.uhcprovider")) {
        const form = document.getElementById('all_input');
        show("sec_id");
        show("p_dob");
        show("dos_s");
        show("dos_e");
        show("btn");
        form.insertBefore(sec_id, p_dob, dos_s, dos_e);
        uhc_btn = true;
        //window.umr_btn = document.getElementById('fil_fom'); 
        //umr_btn.id = 'uhc_btn';


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
      else if (pgurl.includes("https://emr.mremind.com/EMR/ReportCustomization/ReportCustomization.aspx")) {
        show("pre_set");
        show("btn_1");
      }
      else if (pgurl.includes("https://emr.mremind.com/EMR/Claims/BillingManager.aspx")) {
        
        //show("Category");
        show("Pri_Sts");
        show("Act");
        show("Fl_up");
        show("note");
        show("note_btn");
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
  // select the get file


  // Add an event listener to the "Select" button in the popup
/*document.getElementById('select_fom').addEventListener('click', async () => {
  // Get the value the user typed into the input field (the preset keyword)
  const keyword = document.getElementById('pre_set_in').value.trim().toLowerCase();

  // If no keyword was entered, stop the function
  if (!keyword) return;

  // Get the currently active tab in the current browser window
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject and execute a script into the active tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },          // Target the active tab
    func: selectValuesByPreset,         // The function to run inside the tab
    args: [keyword]                     // Pass the preset keyword as argument
  });
});

// This function will run inside the webpage
// It receives the preset keyword and selects matching <option> values
function selectValuesByPreset(presetKey) {
  // Define your presets here
  // Each presetKey maps to an array of <option> values to select
  const presets = {
    // "math" preset contains 23 example values (you can customize)
    sec: [
      "BillDate", "BillingGroup", "BillingPhysician"
    ],

    // Example of another preset ("science")
    science: [
      "bio101", "chem101", "phys101", "sci-general"
    ]

    // You can keep adding more presets below as needed
    // Example: history: ["hist101", "hist202", ...]
  };

  // Look up the array of values for the selected preset
  const valuesToSelect = presets[presetKey];

  // If the preset keyword doesn't exist, show an alert and stop
  if (!valuesToSelect) {
    alert("Preset not found: " + presetKey);
    return;
  }

  // Find all <select> elements on the page that allow multiple selection
  const select = document.getElementById('lstBox1');

  if (!select || !select.multiple) {
    alert("Select element not found or not multiple.");
    return;
  }
  select.dispatchEvent(new Event('change'));
  //const selects = document.querySelectorAll('select[multiple]');

  // Loop through each <select> found
  /*selects.forEach(select => {
    // Loop through every <option> inside the <select>
    for (const option of select.options) {
      // Select this option only if its value is included in the preset list
      option.selected = valuesToSelect.includes(option.value);
    }

    // Trigger a 'change' event so the page knows the selectio  n was updated
    select.dispatchEvent(new Event('change'));
  });
}*/


//preset toget task
document.getElementById("select_fom").addEventListener("click", () => {
    const prst = document.getElementById("pre_set_in").value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },

        func: (sval) => {
          const mselect = document.getElementById("lstBox1");
          const radio = document.getElementById("terms");
          const btn = document.getElementById("sign-in");
          
          if (input) {
            mselect.value = sval;
          }
          if (radio) radio.checked = true;
          if (btn) btn.click();
        },
        args: [prst]
      });
    });
  });
// add notes multy past
  /*document.getElementById("Category_in").addEventListener("paste", (event) => {
    // Wait for the paste to actually insert the content
    setTimeout(() => {
      const fullText = event.target.value.trim();
      const parts = fullText.split("\t"); // tab-separated values from Excel
  
      // Assign values to inputs if available
      if (parts.length >= 5) { 
        document.getElementById("Category_in").value = parts[0];// already pasted
        document.getElementById("Pri_Status_in").value = parts[1];
        document.getElementById("Action_Taken_in").value = parts[2];
        document.getElementById("Follow_Up_Status_in").value = parts[3];
        document.getElementById("note_in").value = parts[4]; 
      }
    }, 10); // short delay so paste completes
  });*/
  document.getElementById("Pri_Status_in").addEventListener("paste", (event) => {
    // Wait for the paste to actually insert the content
    setTimeout(() => {
      const fullText = event.target.value.trim();
      const parts = fullText.split("\t"); // tab-separated values from Excel
  
      // Assign values to inputs if available
      if (parts.length >= 4) { 
        document.getElementById("Pri_Status_in").value = parts[0];// already pasted
        document.getElementById("Action_Taken_in").value = parts[1];
        document.getElementById("Follow_Up_Status_in").value = parts[2];
        document.getElementById("note_in").value = parts[3]; 
      }
    }, 10); // short delay so paste completes
  });

// add notes
  document.getElementById("add_note").addEventListener("click", () => {
    //const pls = document.getElementById("AddNotebtn").click();
    const category = document.getElementById("Category_in").value;
    const cpri_sts = document.getElementById("Pri_Status_in").value;
    const caction = document.getElementById("Action_Taken_in").value;
    const cfu_up = document.getElementById("Follow_Up_Status_in").value;
    const cnotes = document.getElementById("note_in").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },

        func: (category, cpri_sts, caction, cfu_up, cnotes) => {
          document.getElementById("AddNotebtn").click();
          
          if (category !== "") {
            const drop_catogry = document.getElementById("ddlClaimNoteCategories");
            drop_catogry.value = drop_catogry.options[category].value;
            drop_catogry.dispatchEvent(new Event("change"));
          }
          
          if (cpri_sts !== "") {
            const drop_pri_status = document.getElementById("ddlPrimaryStatusForFollowUp");
            drop_pri_status.value = drop_pri_status.options[cpri_sts].value;
          }

          if (caction !== "") {
            const drop_Act = document.getElementById("ddlActionTaken");
            drop_Act.value = drop_Act.options[caction].value;
          }
          if (cfu_up !== "") {
            const sudrop_Fustatus = document.getElementById("substatusidddl");
            sudrop_Fustatus.value = sudrop_Fustatus.options[cfu_up].value;
          }
          if (cnotes !== "") {
            document.getElementById("txtClaimNotes").value = cnotes;
          }
          
        },
        args: [category, cpri_sts, caction, cfu_up , cnotes]
          
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
/*if (moo_btn) {
  document.getElementById('fil_fom').addEventListener("click", () => { 
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
          func: (osinsid, osdob, osdoss, osdose) => {
            // Fill the webpage inputs by ID
            document.getElementById("policy-1").value = osinsid;
            document.getElementById("dob-1").value = osdob;
            document.getElementById("dos-start").value = osdoss;
            document.getElementById("dos-end").value = osdose;
          
            document.getElementById("claimsSearchSubmit").click();
          },
          // These are the values passed into the function
          args: [ainsid, adob, adoss, adose]
        });
      });
    });
}*/


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

    document.getElementById('fil_fom').addEventListener("click", () => { 
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
            dropdown.dispatchEvent(new Event("change"));
            console.log("its just the try and again ");
          },
          // These are the values passed into the function
          args: [ainsid, adob, adoss, adose]
        });
      });
    });
  
// Avality fill start
  /*if (availity_btn) {
    document.getElementById("fil_fom").addEventListener("click", () => {
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
            
            document.querySelector('input[name="patientMemberId"]').value = osinsid;
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
    });
  }*/
// Avality fill end
  //go for the site 
  document.getElementById("openSite").addEventListener("click", () => {
  
    const churl = document.getElementById("siteSelect").value;
  if (churl) {
    chrome.tabs.create({ churl });
  }
  });
