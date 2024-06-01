import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Coin } from "@/utils/tokenlist";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";

// import { Container } from './styles';

const SuccessDialog: React.FC<{
  isOpen: boolean;
  toggle: () => void;
  amountUSDPaid: number;
  amountCryptoPaid: number;
  coin: Coin;
}> = ({ isOpen, toggle, amountCryptoPaid, amountUSDPaid, coin }) => {
  const feePercent = 0.1; // 0.1%
  const feeAmount = amountUSDPaid * feePercent;

  const amountSellerReceived = amountUSDPaid - feeAmount;

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent>
        <Card className="w-full max-w-md bg-white p-6 shadow-lg dark:bg-gray-950">
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-green-500">
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-checkmark">
                <CheckIcon className="h-full w-full text-white" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-semibold">Payment Successful</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Your payment has been processed successfully.
              </p>
            </div>
            <div className="w-full grid gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Fees Paid:
                </span>
                <span className="font-medium">${feeAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Amount paid:
                </span>
                <span className="font-medium">
                  {coin.ticker} {amountCryptoPaid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Amount Received By Seller:
                </span>
                <span className="font-medium">${amountSellerReceived}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;

const CheckIcon: React.FC = ({ ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};
