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
          localStorage.removeItem("tn_jwt")
          window.location.reload()
        })

        web3Provider.on("chainChanged", async () => {
          window.location.reload()
        })

        // check network
        const { MODE: mode } = import.meta.env
        const network = await web3.eth.net.getId()
        if(mode === 'localhost') {
          if(Number(network) !== 8000) {
            await switchNetwork('0x1F40', 'tn local')
          }
        }
        if(mode === 'testnet') {
          if (Number(network) !== 8000) {
            await switchNetwork("0x138D", "tn testnet");
          }
        }
        if(mode === 'mainnet') {
          if (Number(network) !== 8000) {
            await switchNetwork("0x138A", "tn mainnet");
          }
        }

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

async function switchNetwork(chain: string, name: string) {
  try {
    await(window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await(window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chain,
              chainName: name,
              rpcUrls: [],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
  }
}
