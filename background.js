/*chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const { readyToRedirect } = await chrome.storage.local.get("readyToRedirect");

    if (readyToRedirect) {
      console.log("Redirect triggered:", details.url);
      // Reset flag so future requests don't redirect unless triggered again
      chrome.storage.local.set({ readyToRedirect: false });
      return { redirectUrl: "https://www31.mutualofomaha.com/ProviderAccess/claimSearch" };
    }
  },
  { urls: ["https://www31.mutualofomaha.com/ProviderAccess/eligibilitySearch"] },  // Match the URL you want to block or redirect
  ["blocking"]
);*/


