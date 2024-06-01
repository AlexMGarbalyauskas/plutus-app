import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { usePlutus } from "@/hooks/usePlutus";
import { Coin, QUOTE_TOKEN, TOKEN_LIST } from "@/utils/tokenlist";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function Pay() {
  const plutus = usePlutus();
  const { toast } = useToast();

  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrice] = useState(0);

  async function swap() {
    try {
      await plutus.pay({
        usdcAmount: BigInt(tokenTwoAmount),
        tokenAmount: BigInt(tokenOneAmount),
      });

      toast({
        title: "Payment successful",
        description: `You have successfully paid ${tokenOneAmount} ${plutus.selectedCoin.ticker} for ${tokenTwoAmount} USDC`,
      });
    } catch (e) {
      console.error(e);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const modifyToken = async (e: Coin) => {
    setPrice(0);
    setTokenOneAmount(0);

    plutus.setSelectedCoin(e);

    const quote = await plutus.getQuote();

    setPrice(quote);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(_) => setIsOpen(_)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Comunidade</DialogTitle>
          </DialogHeader>

          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Select a Token</h2>
            <ScrollArea className="h-72 rounded-md border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4 p-4">
                {TOKEN_LIST.map((coin) => (
                  <div
                    key={coin.ticker}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                      plutus.selectedCoin.ticker === coin.ticker
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => modifyToken(coin)}
                  >
                    <img
                      src={coin.img}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{coin.ticker}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {coin.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
      <div className="tradeBox">
        <div className="inputs">
          <Input
            placeholder="0"
            value={tokenOneAmount}
            // onChange={(_) => changeAmount(_)}
            disabled={true}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true} />

          <div className="assetOne" onClick={() => openModal()}>
            <img
              src={plutus.selectedCoin.img}
              alt="assetOneLogo"
              className="assetLogo"
            />
            {plutus.selectedCoin.ticker}
            <DownOutlined />
          </div>
          <div className="assetTwo">
            <img
              src={QUOTE_TOKEN.img}
              alt="assetOneLogo"
              className="assetLogo"
            />
            {QUOTE_TOKEN.ticker}
          </div>
        </div>
        <button
          className="swapButton"
          disabled={!tokenOneAmount || !plutus.account.address}
          onClick={swap}
        >
          Pay
        </button>
      </div>
    </>
  );
}

export default Pay;
