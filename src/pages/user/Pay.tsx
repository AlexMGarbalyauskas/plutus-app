import React, { useState, useEffect } from "react";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSendTransaction, useWaitForTransaction } from "wagmi";
import { usePlutus } from "@/hooks/usePlutus";
import { Coin, TOKEN_LIST } from "@/utils/tokenlist";
import { Input } from "@/components/ui/input";

function Pay() {
  const plutus = usePlutus();
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(0);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  async function swap() {
    plutus.pay({ usdcAmount: BigInt(tokenTwoAmount), tokenAmount: BigInt(tokenOneAmount) });
  }
  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  async function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setTokenOneAmount(e.target.value);

    const ratio = await plutus.getQuote();
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * ratio).toFixed(2));
    } else {
      setTokenTwoAmount(0);
    }
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  async function modifyToken(e: Coin) {
    setPrices(0);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);

    plutus.setSelectedCoin(e);

    const quote = await plutus.getQuote();


    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await plutus.getQuote(), {
    }

    useEffect(() => {
      fetchPrices(tokenList[0].address, tokenList[1].address);
    }, []);

    useEffect(() => {
      if (txDetails.to && isConnected) {
        sendTransaction();
      }
    }, [txDetails]);

    useEffect(() => {
      messageApi.destroy();

      if (isLoading) {
        messageApi.open({
          type: "loading",
          content: "Transaction is Pending...",
          duration: 0,
        });
      }
    }, [isLoading]);

    useEffect(() => {
      messageApi.destroy();
      if (isSuccess) {
        messageApi.open({
          type: "success",
          content: "Transaction Successful",
          duration: 1.5,
        });
      } else if (txDetails.to) {
        messageApi.open({
          type: "error",
          content: "Transaction Failed",
          duration: 1.5,
        });
      }
    }, [isSuccess]);

    return (
      <>
        {contextHolder}
        <Modal
          open={isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title="Select a token"
        >
          <div className="modalContent">
            {TOKEN_LIST.map((e) => {
              return (
                <div
                  className="tokenChoice"
                  key={e.ticker}
                  onClick={() => modifyToken(e)}
                >
                  <img src={e.img} alt={e.ticker} className="tokenLogo" />
                  <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.ticker}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
        <div className="tradeBox">
          <div className="tradeBoxHeader">
            <h4>Swap</h4>
            <Popover
              content={settings}
              title="Settings"
              trigger="click"
              placement="bottomRight"
            >
              <SettingOutlined className="cog" />
            </Popover>
          </div>
          <div className="inputs">
            <Input
              placeholder="0"
              value={tokenOneAmount}
              onChange={(_) => changeAmount(_)}
              disabled={!prices}
            />
            <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
            <div className="switchButton" onClick={switchTokens}>
              <ArrowDownOutlined className="switchArrow" />
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
              <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
              {tokenOne.ticker}
              <DownOutlined />
            </div>
            <div className="assetTwo" onClick={() => openModal(2)}>
              <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
              {tokenTwo.ticker}
              <DownOutlined />
            </div>
          </div>
          <button className="swapButton" disabled={!tokenOneAmount || !plutus.account.address} onClick={ }>
            Pay
          </button>
        </div>
      </>
    );
  }

  export default Pay;
