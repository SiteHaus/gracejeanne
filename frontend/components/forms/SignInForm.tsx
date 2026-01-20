import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInForm } from "@/validation/authValidation";
import z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignInForm = () => {
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInForm>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
    console.log(values);
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <Label className="text-muted-foreground mb-2">Email</Label>
        <Input
          className="mb-3"
          placeholder="john@example.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {form.formState.errors.email.message}
          </p>
        )}

        <Label className="text-muted-foreground mb-2">Password</Label>
        <Input
          className="mb-5"
          type="password"
          placeholder="Enter your password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {form.formState.errors.password.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </Button>

        <div className="text-center">
          <p className="mt-5 text-sm text-gray-600">
            Don't have an account?
            <a
              className="ml-2 text-black font-medium hover:underline"
              href="/sign_up"
            >
              Sign Up
            </a>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Forgot your password?
            <a
              className="ml-2 text-black font-medium hover:underline"
              href="/request_password"
            >
              Reset Password
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
