import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const loginProps = {
  title: "Faz a Boa PDV",
  description: "Insira suas credênciais para entrar no sistema.",
  inputs: {
    user: "Email",
    password: "Senha",
  },
  action: {
    login: "Entrar",
  },
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type User = z.infer<typeof formSchema>;

const Login = () => {
  const form = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: User) => {
    // TODO: fetch login route
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center gap-5 mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">{loginProps.title}</h1>

        <p className="mt-4 text-gray-500">{loginProps.description}</p>
      </div>

      <Form {...form}>
        <form
          className="flex flex-col items-center gap-5 w-full max-w-[400px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full w-max-md">
                <FormLabel>{loginProps.inputs.user}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full w-max-md">
                <FormLabel>{loginProps.inputs.password}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="px-6" type="submit">
            {loginProps.action.login}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
