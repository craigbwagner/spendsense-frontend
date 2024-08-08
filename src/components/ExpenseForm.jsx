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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Toaster } from "sonner";

import moment from "moment";

const formSchema = z.object({
  name: z.string().min(5).max(40),
  amount: z.coerce.number(),
  date: z.coerce.date(),
  category: z.enum([
    "food_groceries",
    "transportation",
    "housing",
    "other",
    "entertainment",
    "clothing",
    "utilities",
    "medical",
    "insurance",
    "personal",
    "education",
    "income",
  ]),
});

const ExpenseForm = (props) => {
  let date = props.expense?.date;
  let formattedDate = date ? moment.utc(date).format("YYYY-MM-DD") : null;

  let incomeAmount =
    props.expense?.category === "income"
      ? props.expense?.amount * -1
      : props.expense?.amount;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.expense?.name || "",
      amount: incomeAmount || "",
      date: formattedDate || "",
    },
    values: {
      category: props.expense?.category || null,
    },
  });

  const handleSubmit = async (data) => {
    try {
      if (props.handleCreateExpense) {
        if (data.category === "income") {
          data.amount *= -1;
          console.log(data.amount);
        }
        await props.handleCreateExpense(data);
        toast.success(`${data.name} created successfully`, {
          cancel: {
            label: "Dismiss",
            onClick: () => {
              toast.dismiss();
            },
          },
        });
      } else {
        if (data.category === "income") {
          data.amount *= -1;
        }
        props.handleUpdateExpense(props.expense.id, data);
        props.setOpen(false);
        toast.success(`${data.name} updated successfully `, {
          cancel: {
            label: "Dismiss",
            onClick: () => {
              toast.dismiss();
            },
          },
        });
      }
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="food_groceries">Food</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Toaster />
    </main>
  );
};

export default ExpenseForm;
