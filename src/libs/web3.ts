import Web3 from "web3"

export async function CONNECT_WALLET() {
  let web3: Web3
  let web3Provider

  if ((window as any).ethereum) {
    // web3Provider = new Web3.providers.WebsocketProvider('wss://bsc.getblock.io/17f83206-a178-4914-bcaa-0a4af9120c17/mainnet/')
    web3Provider = (window as any).ethereum

    try {
      // user authorize.
      const acc = await web3Provider.request({ method: "eth_requestAccounts" })
      if (acc.length > 0) {
        web3 = new Web3(web3Provider)
        web3Provider.on("accountsChanged", () => {
          window.location.reload()
        })

        web3Provider.on("chainChanged", async () => {
          window.location.reload()
        })

        return { web3Provider, web3 }
      }
    } catch (error: any) {
      // authorize failed.
      console.error(error.message)
      return { errmsg: error.message }
    }
  } else {
    window.open("https://metamask.io/download/")
  }
}
