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
import * as settingsService from "../services/settingsService";

const formSchema = z.object({
  monthly_income: z.coerce.number().nonnegative(),
  monthly_budget: z.coerce.number().nonnegative(),
  savings_goal: z.coerce.number().nonnegative(),
});

const UpdateSettingsForm = ({ settings, setSettings }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthly_income: 0,
      monthly_budget: 0,
      savings_goal: 0,
    },
    values: {
      monthly_income: settings.monthly_income,
      monthly_budget: settings.monthly_budget,
      savings_goal: settings.savings_goal,
    },
  });

  const handleSubmit = async (data) => {
    try {
      const updatedSettings = await settingsService.update(data);
      setSettings(updatedSettings);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="m-8 flex h-full w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            handleSubmit(data);
          })}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="monthly_income"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Monthly Income"
                      type="number"
                      {...field}
                    />
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
                    <Input
                      placeholder="Monthly Budget"
                      type="number"
                      {...field}
                    />
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
                    <Input
                      placeholder="Montly savings Goal"
                      type="number"
                      {...field}
                    />
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
  );
};

export default UpdateSettingsForm;
