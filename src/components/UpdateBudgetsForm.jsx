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
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
          className="grid grid-cols-2 w-full max-w-md gap-3"
        >
          <FormField
            control={form.control}
            name="housing"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Housing</FormLabel>
                  <FormControl>
                    <Input placeholder="Housing" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="transportation"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Transportation</FormLabel>
                  <FormControl>
                    <Input placeholder="Transportation" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="food_groceries"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Food/Groceries</FormLabel>
                  <FormControl>
                    <Input placeholder="Food/Groceries" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="utilities"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Utilities</FormLabel>
                  <FormControl>
                    <Input placeholder="Utilities" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="clothing"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Clothing</FormLabel>
                  <FormControl>
                    <Input placeholder="Clothing" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="medical"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Medical</FormLabel>
                  <FormControl>
                    <Input placeholder="Medical" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Insurance</FormLabel>
                  <FormControl>
                    <Input placeholder="Insurance" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="personal"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Personal</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="Education" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="entertainment"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Entertainment</FormLabel>
                  <FormControl>
                    <Input placeholder="Entertainment" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Other</FormLabel>
                  <FormControl>
                    <Input placeholder="Other" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="mt-8" type="submit">Save Budgets</Button>
        </form>
      </Form>

    </section>
  )
}

export default CategoryBudgetsForm;
