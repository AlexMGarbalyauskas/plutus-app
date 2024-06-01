import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemes/userSchemes";
import { useCallback } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePlutus } from "@/hooks/usePlutus";
import RegisteredInput from "@/components/form/RegisteredInput";

export function Register() {
  const plutus = usePlutus();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const submit = useCallback(
    (data: z.infer<typeof registerSchema>) => {
      plutus.user.setUser({
        name: data.name,
        taxNumber: data.taxNumber,
      });

      navigate("/pay", { replace: true });
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
              <Label htmlFor="name">Name</Label>
              <RegisteredInput
                hookForm={form}
                id="name"
                type="text"
                placeholder="Enter your name"
                className="pl-7"
                name={"name"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxNumber">Tax Number</Label>
              <RegisteredInput
                hookForm={form}
                id="taxNumber"
                type="string"
                placeholder="Enter amount"
                className="pl-7"
                name={"taxNumber"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount to Pay</Label>
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
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
