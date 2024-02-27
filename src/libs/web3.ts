import Web3 from "web3"

export async function CONNECT_WALLET() {
  let web3: Web3
  let web3Provider

  if ((window as any).ethereum) {
    web3Provider = (window as any).ethereum
    web3Provider.on("accountsChanged", () => {
      localStorage.removeItem("tn_jwt");
      window.location.reload();
    });

    // web3Provider.on("chainChanged", async () => {
    //   window.location.reload();
    // });

    try {
      // user authorize.
      const acc = await web3Provider.request({ method: "eth_requestAccounts" })
      if (acc.length > 0) {
        web3 = new Web3(web3Provider)

        // check network
        const { MODE: mode } = import.meta.env
        const network = await web3.eth.net.getId()
        if(mode === 'localhost') {
          if(Number(network) !== 8000) {
            const res = await switchNetwork('0x1F40', 'tn local', 'https://124.70.23.119:3017')
            if(res?.errmsg) {
              return { errmsg: res.errmsg };
            }else {
              return { web3Provider, web3 };
            }
          }
        }
        if(mode === 'testnet') {
          if (Number(network) !== 5005) {
            const res = await switchNetwork('0x138D', 'tn testnet', 'https://node0.testnet.treasurenet.io')
            if(res?.errmsg) {
              return { errmsg: res.errmsg };
            }else {
              return { web3Provider, web3 };
            }
          }
        }
        if(mode === 'mainnet') {
          if (Number(network) !== 5002) {
            const res = await switchNetwork('0x138A', 'tn mainnet', 'https://node0.treasurenet.io')
            if(res?.errmsg) {
              return { errmsg: res.errmsg };
            }else {
              return { web3Provider, web3 };
            }
          }
        }

        return { web3Provider, web3 };
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

export async function switchNetwork(chain: string, name: string, rpc: string) {
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
              rpcUrls: [rpc],
              nativeCurrency: {
                name: "UNIT",
                symbol: "UNIT",
                decimals: 18
              },
            },
          ],
        });
      } catch (error: any) {}
    }

    return { errmsg: switchError.message }
  }
}
