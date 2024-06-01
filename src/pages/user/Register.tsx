import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemes/userSchemes";
import { ZodObject, ZodString, ZodNumber, ZodTypeAny } from "zod";

export function Register() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Register for Payment</CardTitle>
        <CardDescription>
          Fill out the form below to register and make a payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="transaction">Tax Number</Label>
          <Input id="transaction" placeholder="Enter transaction number" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount to Pay</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              className="pl-7"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
