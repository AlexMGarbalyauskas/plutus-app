import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function Component() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardContent className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            <div>John Doe</div>
            <div>$100.00</div>
            <div>0.0025 BTC</div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                bc1q...
              </Link>
            </div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0x123...
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            <div>Jane Smith</div>
            <div>$50.00</div>
            <div>0.0012 ETH</div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0x456...
              </Link>
            </div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0x789...
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            <div>Bob Johnson</div>
            <div>$75.00</div>
            <div>0.0018 LTC</div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                ltc1q...
              </Link>
            </div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0xabc...
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            <div>Alice Williams</div>
            <div>$125.00</div>
            <div>0.0032 BTC</div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                bc1q...
              </Link>
            </div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0xdef...
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4">
            <div>Tom Davis</div>
            <div>$80.00</div>
            <div>0.0020 ETH</div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0x456...
              </Link>
            </div>
            <div>
              <Link to="" className="text-blue-600 hover:underline">
                0xghi...
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
