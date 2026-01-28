
  {
    "manifest_version": 3,
    "name": "AUTO FILL",
    "version": "1.0",
    "description": "Fills one input field on a page",
    "permissions": ["activeTab", "webRequest", "webRequestBlocking", "storage", "scripting", "tabs"],
    "host_permissions": ["<all_urls>"],
    "background": {"service_worker": "background.js"},
    "action": {"default_popup": "popup.html"}
    
  }
  
