import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { data } = trpc.anyApiRoute.useQuery();
  console.log(data)

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {};

  return (
    <>
      <div className="  container relative flex justify-center items-center flex-col pt-16  ">
        <div className=" mx-auto w-full  flex justify-center flex-col space-y-5 sm:w-[350px] ">
          <div className="flex flex-col items-center space-y-2 ">
            <Icons.logo className="h-20 w-20" />
            <h1 className="font-semibold text-2xl tracking-tight">
              {" "}
              Sig in to your account
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="#"
            >
              Dont have an account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-4 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    placeholder="Your@gmail.com"
                    className={cn({
                      "focus-visible:ring-red-500": true,
                    })}
                  />
                </div>
                <div className="grid gap-4 py-2">
                  <Label htmlFor="email">Password</Label>
                  <Input
                    {...register("password")}
                    placeholder="Password"
                    className={cn({
                      "focus-visible:ring-red-500": true,
                    })}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
