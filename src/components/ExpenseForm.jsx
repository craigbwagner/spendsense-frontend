import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import * as expensesService from "../services/expensesService";

const formSchema = z.object({
  name: z.string().min(5).max(40),
  amount: z.number().min(0.01),
  date: z.date(),
});

const ExpenseForm = (props) => {
  const navigate = useNavigate();

  const expense = props.expense;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      date: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      if (expense.id) {
        await expensesService.update(expense.id, data);
      } else {
        await expensesService.create(data);
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
    form.reset();
  };

  return (
    <main className="m-8 flex h-full w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Dollar Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default ExpenseForm;
