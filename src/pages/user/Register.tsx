import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemes/userSchemes";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePlutus } from "@/hooks/usePlutus";
import RegisteredInput from "@/components/form/RegisteredInput";
import { Form } from "@/components/ui/form";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export function Register() {
  const { openConnectModal } = useConnectModal();
  const plutus = usePlutus();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      amount: 0,
      taxNumber: "",
    },
  });

  const submit = useCallback(
    (data: z.infer<typeof registerSchema>) => {
      console.log(data);

      plutus.user.setUser({
        name: data.name,
        taxNumber: data.taxNumber,
        amountToPay: data.amount,
      });

      navigate("/user/pay", { replace: true });
    },
    [navigate, plutus.user]
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>Register for Payment</CardTitle>
        <CardDescription>
          Fill out the form below to register and make a payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <div className="grid gap-2">
              {/* <Label htmlFor="name">Name</Label> */}
              <RegisteredInput
                hookForm={form}
                id="name"
                type="text"
                placeholder="Enter your name"
                className="pl-7"
                name={"name"}
                required
              />
            </div>
            <div className="grid gap-2">
              {/* <Label htmlFor="taxNumber">Tax Number</Label> */}
              <RegisteredInput
                hookForm={form}
                id="taxNumber"
                type="string"
                placeholder="Enter your tax number"
                className="pl-7"
                name={"taxNumber"}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <RegisteredInput
                  hookForm={form}
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="pl-7"
                  name={"amount"}
                  required
                />
              </div>
            </div>
            <Button onClick={() => openConnectModal()}>Connect Wallet</Button>
            <Button
              type="submit"
              className="w-full"
              disabled={!plutus.account.address}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
