"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { schema, Schema } from "./schema"
import { createNewProfessor } from "./actions"
import { TeacherPayload } from "@/service/professor"

export default function CreateTeacher() {
   const form = useForm<Schema>({
      resolver: zodResolver(schema),
      defaultValues: {
         teacherName: '',
         phone: '',
         email: '',
         gender: '',
         nascimento: '',
         rua: '',
         numero: '',
         complemento: '',
         bairro: '',
         cidade: '',
         uf: '',
         course: '',
         instituicao: '',
         conclusion: '',
         nivelFormacao: '',
      },
   });

   const { reset } = form;

   const onSubmit = async (data: Schema) => {
      try {
         const payload: TeacherPayload = {
            teacherName: data.teacherName,
            phone: data.phone,
            email: data.email,
            gender: data.gender || '',
            nascimento: data.nascimento,
            rua: data.rua,
            numero: data.numero,
            complemento: data.complemento || '',
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.uf,
            course: data.course,
            instituicao: data.instituicao,
            conclusion: data.conclusion,
            nivelFormacao: data.nivelFormacao || '',
         };

         console.log('teste')

         await createNewProfessor(payload);

         toast({
            title: "Sucesso!",
            description: "Professor criado com sucesso!",
         });

         reset();
      } catch (error) {
         toast({
            title: "Erro",
            description: "Ocorreu um erro ao criar o professor.",
            variant: "destructive",
         });
      }
   };

   return (
      <ScrollArea className="h-[34rem] w-[853px] pr-[250px]">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
               <h1 className="text-m text-muted-foreground">Dados pessoais</h1>
               <FormField
                  control={form.control}
                  name="teacherName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Nome completo:</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Telefone:</FormLabel>
                        <FormControl>
                           <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>E-mail:</FormLabel>
                        <FormControl>
                           <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Selecione seu gênero:</FormLabel>
                        <FormControl>
                           <Select {...field} value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectItem value="masculino">Masculino</SelectItem>
                                    <SelectItem value="feminino">Feminino</SelectItem>
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="nascimento"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Data de nascimento:</FormLabel>
                        <FormControl>
                           <Input className="w-[50%]" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <h1 className="pt-10 text-m text-muted-foreground">Endereço</h1>
               <div className="flex gap-4">
                  <div className="w-[85%]">
                     <FormField
                        control={form.control}
                        name="rua"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Rua:</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="w-[15%]">
                     <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Número:</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <FormField
                  control={form.control}
                  name="complemento"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Complemento:</FormLabel>
                        <FormControl>
                           <Input className="w-[50%]" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="bairro"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Bairro:</FormLabel>
                        <FormControl>
                           <Input className="w-[50%]" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="cidade"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Cidade:</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="uf"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Estado:</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <h1 className="pt-10 text-m text-muted-foreground">Formação</h1>
               <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Curso:</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="instituicao"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Instituição:</FormLabel>
                        <FormControl>
                           <Input {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="nivelFormacao"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Nível de formação:</FormLabel>
                        <FormControl>
                           <Select {...field} value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectItem value="medio">Médio</SelectItem>
                                    <SelectItem value="superior">Superior</SelectItem>
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="grid grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="conclusion"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Ano de conclusão:</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <Button type="submit">Confirmar</Button>
            </form>
         </Form>
      </ScrollArea>
   )
}