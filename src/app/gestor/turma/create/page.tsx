'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { schema, Schema } from "./schema"
import { useEffect, useState } from "react"
import { Curso } from "@/service/curso"
import { toast } from "@/components/ui/use-toast"
import { TurmaPayload } from "@/service/turma"
import { createNewTurma } from "./actions"

export default function CreateCurso() {
    const [cursos, setCursos] = useState<Curso[]>([]);

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            curse: '',
            nomeTurma: ''
        },
    })

    async function fetchCursos() {
        const response = await fetch('/api/curso', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setCursos(data);
        };
    }

    useEffect(() => {
        fetchCursos();
    }, []);

    const { reset } = form;

    const onSubmit = async (data: Schema) => {
        try {
            const payload: TurmaPayload = {
                idCurso: Number(data.curse),
                nomeTurma: data.nomeTurma
            };

            console.log('teste')

            await createNewTurma(payload);

            toast({
                title: "Sucesso!",
                description: "Turma resgistrada com sucesso!",
            });
            reset();
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao resgistrar a turma.",
                variant: "destructive",
            });
        }
    };

    return (
        <ScrollArea className="h-[34rem] w-[853px] pr-[250px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 pt-0">
                    <FormField
                        control={form.control}
                        name="nomeTurma"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Turma *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="curse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Curso *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {cursos.map((curso) => (
                                                    <SelectItem key={curso.id} value={String(curso.id)}>
                                                        {curso.nomeCurso}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Confirmar</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}