import { useState } from "react";
import { usePlutus } from "@/hooks/usePlutus";
import { Coin, TOKEN_LIST } from "@/utils/tokenlist";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <Dialog open={isOpen} onOpenChange={(_) => setIsOpen(!_)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select your token</DialogTitle>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Convert Currencies</CardTitle>
          <CardDescription>
            Enter the amount and select the currencies to convert.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input
              type="number"
              placeholder="Amount to convert"
              className="pr-12"
            />
            <Button onClick={() => setIsOpen(true)}>
              {plutus.selectedCoin.ticker}
            </Button>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input
              type="number"
              placeholder="Amount to be paid"
              className="pr-12"
              readOnly
            />
            <Button>USD</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Convert</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Pay;
