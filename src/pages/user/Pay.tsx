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
import { ChangeTokenDialog } from "@/components/pay/ChangeTokenDialog";
import SuccessDialog from "@/components/pay/Successdialog";
import CustomButton from "@/components/CustomButton";
import { parseUnits } from "viem";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Pay() {
  const plutus = usePlutus();

  const AMOUNT_TO_PAY = plutus.user.user.amountToPay;

  const [requiredAmountIn, setRequiredAmountIn] = useState(0);
  const [changeTokenModal, setChangeTokenModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [, setQuote] = useState(0);

  async function swap() {
    console.log("Amount to pay: ", AMOUNT_TO_PAY);
    console.log("Amount to convert: ", requiredAmountIn);

    console.log(
      "parsed amout to pay: ",
      parseUnits(AMOUNT_TO_PAY.toString(), QUOTE_TOKEN.decimals)
    );
    console.log(
      "parsed amount to convert: ",
      parseUnits(requiredAmountIn.toString(), plutus.selectedCoin.decimals)
    );

    try {
      setLoading(true);
      await plutus.pay({
        usdcAmount: BigInt(
          parseUnits(AMOUNT_TO_PAY.toString(), QUOTE_TOKEN.decimals)
        ),
        tokenAmount: BigInt(
          parseUnits(requiredAmountIn.toString(), plutus.selectedCoin.decimals)
        ),
      });

      await sleep(2000);

      setSuccessModal(true);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  const modifyToken = async (e: Coin) => {
    plutus.setSelectedCoin(e);

    calculateRequiredAmount();

    setChangeTokenModal(false);
  };

  const calculateRequiredAmount = async () => {
    const quote = await plutus.getQuote();

    setQuote(quote);

    setRequiredAmountIn(plutus.user.user.amountToPay / quote);
  };

  useEffect(() => {
    calculateRequiredAmount();
  }, []);

  const toggleModal = () => {
    setChangeTokenModal(!changeTokenModal);
  };

  const toggleSuccessModal = () => {
    setSuccessModal(!successModal);
  };

  return (
    <>
      <SuccessDialog
        isOpen={successModal}
        toggle={toggleSuccessModal}
        amountCryptoPaid={requiredAmountIn}
        amountUSDPaid={AMOUNT_TO_PAY}
        coin={plutus.selectedCoin}
      />
      <ChangeTokenDialog
        isOpen={changeTokenModal}
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
          <CustomButton className="w-full" onClick={swap} loading={loading}>
            Convert
          </CustomButton>
        </CardFooter>
      </Card>
    </>
  );
}

export default Pay;
