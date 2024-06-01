import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlutus } from "@/hooks/usePlutus";
import { Coin, TOKEN_LIST } from "@/utils/tokenlist";

export const ChangeTokenDialog: React.FC<{
  isOpen: boolean;
  toggleModal: () => void;
  modifyToken: (e: Coin) => Promise<void>;
}> = ({ isOpen, toggleModal, modifyToken }) => {
  const plutus = usePlutus();

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
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
  );
};
