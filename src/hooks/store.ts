// Extends WindowEventMap interface including a custom event: "eip6963:announceProvider"
declare global{
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// Array that stores detected wallet providers and their details
let providers: EIP6963ProviderDetail[] = []

// Object containing two methods, the store holds the state of detected Ethereum wallet providers,
// it's implemented as an external store, making it available for subscription and synchronization across the dapp
export const store = {
  // Returns the current state of providers
  value: ()=> providers,
  // Subscribes to provider announcements and updates the store accordingly
  // Takes a callback function to be invoked on each store update returning a function to unsubscribe from the event
  subscribe: (callback: ()=> void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent){
      if(providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return
      providers = [...providers, event.detail]
      callback()
    }
    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement)
  }
}