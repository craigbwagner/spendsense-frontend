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
import * as settingsService from "../services/settingsService"
import ExpenseForm from "./ExpenseForm";

const getSettings = async () => {
  const userSettings = await settingsService.index();

}

const formSchema = z.object({
  monthly_income: z.coerce.number().positive(),
  monthly_budget: z.coerce.number().positive(),
  savings_goal: z.coerce.number().positive()
});

const UpdateSettingsForm = (props) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
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
  }
  return (
    <section className="flex">

    </section>
  )
}

export default UpdateSettingsForm;
