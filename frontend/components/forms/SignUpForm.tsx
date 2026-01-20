import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { signUpForm } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      isSubscriber: false,
    },
  });

  function onSubmit(values: z.infer<typeof signUpForm>) {
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
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <Label className="text-muted-foreground mb-2"> Email </Label>
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

        <Label className="text-muted-foreground mb-2"> First Name </Label>
        <Input
          className="mb-3"
          placeholder="John"
          {...form.register("firstName")}
        />
        {form.formState.errors.firstName && (
          <p className="text-red-500 text-sm mb-2">
            {form.formState.errors.firstName.message}
          </p>
        )}

        <Label className="text-muted-foreground mb-2">
          Last Name (Optional)
        </Label>
        <Input
          className="mb-3"
          placeholder="Doe"
          {...form.register("lastName")}
        />

        <Label className="text-muted-foreground mb-2"> Password </Label>
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
          Sign Up
        </Button>

        <div className="flex mt-5">
          <Checkbox
            checked={form.watch("isSubscriber")}
            onCheckedChange={(checked) => {
              form.setValue("isSubscriber", checked === true);
            }}
            className="mx-2"
          />
          <Label className="text-muted-foreground">
            Subscribe to the newsletter for updates and insights
          </Label>
        </div>

        <div className="text-center">
          <p className="mt-5 text-sm text-gray-600">
            Have an account?
            <a
              className="ml-2 text-black font-medium hover:underline"
              href="/login"
            >
              Log in
            </a>
          </p>
        </div>
      </form>
    </>
  );
};
