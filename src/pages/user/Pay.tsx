import { useEffect, useState } from "react";
import { usePlutus } from "@/hooks/usePlutus";
import { Coin, QUOTE_TOKEN } from "@/utils/tokenlist";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { parseUnits } from "viem";
import { ChangeTokenDialog } from "@/components/pay/ChangeTokenDialog";

function Pay() {
  const plutus = usePlutus();

  const AMOUNT_TO_PAY = plutus.user.user.amountToPay;

  const [requiredAmountIn, setRequiredAmountIn] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [, setQuote] = useState(0);

  async function swap() {
    try {
      await plutus.pay({
        usdcAmount: BigInt(
          parseUnits(AMOUNT_TO_PAY.toString(), QUOTE_TOKEN.decimals)
        ),
        tokenAmount: BigInt(
          parseUnits(requiredAmountIn.toString(), plutus.selectedCoin.decimals)
        ),
      });
    } catch (e) {
      console.error(e);
    }
  }

  const modifyToken = async (e: Coin) => {
    plutus.setSelectedCoin(e);

    calculateRequiredAmount();

    setIsOpen(false);
  };

  const calculateRequiredAmount = async () => {
    const quote = await plutus.getQuote();

    setQuote(quote);

    setRequiredAmountIn(quote * plutus.user.user.amountToPay);
  };

  useEffect(() => {
    calculateRequiredAmount();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChangeTokenDialog
        isOpen={isOpen}
        toggleModal={toggleModal}
        modifyToken={modifyToken}
      />
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
              readOnly
              value={requiredAmountIn}
            />
            <Button onClick={toggleModal}>{plutus.selectedCoin.ticker}</Button>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Input
              type="number"
              placeholder="Amount to be paid"
              className="pr-12"
              readOnly
              value={AMOUNT_TO_PAY}
            />
            <Button>USD</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={swap}>
            Convert
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Pay;
