import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Header, Main, Footer } from "./components";
import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [address, setAddress] = useState("");
  const [blockNumber, setBlockNumber] = useState(0);
  const [addressValue, setAddressValue] = useState(0);
  const [addressBalance, setAddressBalance] = useState(0);
  const [blockDetails, setBlockDetails] = useState();
  const [gasPrice, setGasPrice] = useState();

  useEffect(() => {
    async function getAllValues() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);

      const gasPrice = await alchemy.core.getGasPrice();
      setGasPrice(Math.round(parseInt(gasPrice._hex) / 10 ** 9));

      if (addressValue.length === 42) {
        setAddressBalance(await alchemy.core.getBalance(addressValue, "safe"));
      } else {
        setBlockDetails(
          await alchemy.core.getBlockWithTransactions(parseInt(addressValue))
        );
      }
    }
    getAllValues();
  }, [addressValue]);

  return (
    <div>
      <div className="gradient__bg">
        <Header
          address={address}
          setAddress={setAddress}
          setAddressValue={setAddressValue}
          blockNumber={blockNumber}
        />
      </div>
      <Main
        blockNumber={blockNumber}
        addressValue={addressValue}
        addressBalance={addressBalance}
        blockDetails={blockDetails}
        setAddressValue={setAddressValue}
        gasPrice={gasPrice}
      />
      <Footer />
    </div>
  );
}

export default App;
