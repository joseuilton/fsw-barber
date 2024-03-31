"use client";

import { SearchIcon } from "lucide-react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { redirect, useRouter } from "next/navigation";

const searchFormSchema = z.object({
  search: z.string({
    required_error: "Campo requerido!"
  }).trim().min(1, "Campo requerido!")
})

interface SearchProps {
  defaultValues?: z.infer<typeof searchFormSchema>
}

const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues
  })

  function handleSubmit(data: z.infer<typeof searchFormSchema>) {
    return router.push(`/barbershops?search=${data.search}`);
  }

  return (
    <div className="flex gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Buscar barbearias" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="px-2.5 py-2">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>


    </div>
  )
}

export { Search }