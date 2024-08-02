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
import * as categoryBudgetsService from "../services/categoryBudgetsService"

const formSchema = z.object({
  housing: z.coerce.number().nonnegative(),
  transportation: z.coerce.number().nonnegative(),
  food_groceries: z.coerce.number().nonnegative(),
  utilities: z.coerce.number().nonnegative(),
  clothing: z.coerce.number().nonnegative(),
  medical: z.coerce.number().nonnegative(),
  insurance: z.coerce.number().nonnegative(),
  personal: z.coerce.number().nonnegative(),
  education: z.coerce.number().nonnegative(),
  entertainment: z.coerce.number().nonnegative(),
  other: z.coerce.number().nonnegative(),
});

const CategoryBudgetsForm = ({ categoryBudgets, setCategoryBudgets }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      housing: 0,
      transportation: 0,
      food_groceries: 0,
      utilities: 0,
      clothing: 0,
      medical: 0,
      insurance: 0,
      personal: 0,
      education: 0,
      entertainment: 0,
      other: 0,
    },
    values: {
      housing: categoryBudgets.housing,
      transportation: categoryBudgets.transportation,
      food_groceries: categoryBudgets.food_groceries,
      utilities: categoryBudgets.utilities,
      clothing: categoryBudgets.clothing,
      medical: categoryBudgets.medical,
      insurance: categoryBudgets.insurance,
      personal: categoryBudgets.personal,
      education: categoryBudgets.education,
      entertainment: categoryBudgets.entertainment,
      other: categoryBudgets.other,
    },
  });

  const handleSubmit = async (data) => {
    try {
      const updatedCategoryBudgets = await categoryBudgetsService.update(data);
      setCategoryBudgets(updatedCategoryBudgets);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="flex flex-col items-center justify-center w-full h-full m-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
          className="flex flex-col w-full max-w-md gap-4"
        >
          <FormField
            control={form.control}
            name="monthly_income"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly Income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="monthly_budget"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Monthly Budget</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly Budget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="savings_goal"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Monthly Savings Goal</FormLabel>
                  <FormControl>
                    <Input placeholder="Montly savings Goal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Save Settings</Button>
        </form>
      </Form>

    </section>
  )
}

export default CategoryBudgetsForm;
