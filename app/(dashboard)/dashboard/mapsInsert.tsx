"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react";
import axios from "axios";
interface MapsInterface {
  id: number;
  customerName: string;
  startPoint: string;
  endPoint: string;
  updateAt: Date;
}

export default function MapsFormDashboard() {
    const [errorMessage, setErrorMessage] = useState('')

    const formSchema = z.object({
        customerName: z.string().min(1, { message: "Este campo deve ser preenchido.",  }),
        startPoint: z.string().min(1, { message: "Este campo deve ser preenchido.",  }),
        endPoint: z.string().min(1, { message: "Este campo deve ser preenchido.",  }),
       
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: "",
            startPoint: "",
            endPoint: "",
        },
      })
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post('https://routes-maps-api.vercel.app/api/v1/maps/', {
                customerName: values.customerName,
                startPoint: values.startPoint,
                endPoint: values.endPoint,
            });
            
            location.reload();
        } catch (error) {
            setErrorMessage('Erro ao cadastrar uma rota.')
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <p>{errorMessage}</p>
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do cliente:</FormLabel>
              <FormControl>
                <Input required placeholder="Digite seu cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ponto de partida:</FormLabel>
              <FormControl>
                <Input required placeholder="Digite o Endereço ou Coordenadas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ponto final:</FormLabel>
              <FormControl>
                <Input required placeholder="Digite o Endereço ou Coordenadas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit">Registrar a sua rota</Button>
        </div>
        
      </form>
    </Form>
  );
}
