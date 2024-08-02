import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as authService from "../services/authService";

const formSchema = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(4).max(20),
});

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const handleSubmit = async (data) => {
    try {
      const user = await authService.signin(data);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setMessage(err.message);
    }
    form.reset();
  };

  return (
    <main className="m-4 flex max-w-md flex-col items-center justify-center rounded-md border-2 border-black px-12 py-4">
      <h1 className="p-4 text-2xl font-bold"> Log in </h1>
      <Form {...form}>
        {message && <p className="text-red-500">{message}</p>}
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-md flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit </Button>
        </form>
      </Form>
      <p className="mt-8 text-xs">
        Don't have an account yet?{" "}
        <Link className="font-semibold text-green-600" to="/signup">
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default SigninForm;
