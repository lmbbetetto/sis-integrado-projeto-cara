'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlunoPayload } from "@/service/aluno"
import { schema, Schema } from "./schema"
import { createNewAluno } from "./actions"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Turma } from "@/service/turma"

export default function CreateAluno() {
    const [professors, setProfessors] = useState<Turma[]>([]);
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            bairro: '',
            cidade: '',
            complemento: '',
            escola: '',
            nascimento: '',
            numero: '',
            periodo: '',
            phone: '',
            rendaFamilia: '',
            rua: '',
            serie: '',
            studentName: '',
            uf: '',
            cpf: '',
            mae: '',
            pai: '',
            phoneMae: '',
            phonePai: '',
            profMae: '',
            profPai: '',
            rg: '',
            turma: ''
        },
    });

    async function fetchProfessors() {
        const response = await fetch('/api/turma', {
            method: 'GET',
        });
        if (response.ok) {
            const data = await response.json();
            setProfessors(data);
        };
    }

    useEffect(() => {
        fetchProfessors();
    }, []);

    const { reset } = form;

    const onSubmit = async (data: Schema) => {
        try {
            const payload: AlunoPayload = {
                bairro: data.bairro,
                cidade: data.cidade,
                cpf: data.cpf ?? '',
                escola: data.escola,
                nascimento: data.nascimento,
                nome: data.studentName,
                numero: data.numero,
                periodo: data.periodo,
                rendaFamilia: Number(data.rendaFamilia),
                rg: data.rg ?? '',
                rua: data.rua,
                serie: data.serie,
                phone: data.phone,
                uf: data.uf,
                complemento: data.complemento,
                mae: data.mae,
                pai: data.pai,
                phoneMae: data.phoneMae,
                phonePai: data.phonePai,
                profMae: data.profMae,
                profPai: data.profPai,
                idTurma: Number(data.turma)
            };

            console.log('teste')

            await createNewAluno(payload);

            toast({
                title: "Sucesso!",
                description: "Aluno cadastrado com sucesso!",
            });

            reset();
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao cadastrar o aluno.",
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
                        name="turma"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Turma *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {professors.map((professor) => (
                                                    <SelectItem key={professor.id} value={String(professor.id)}>
                                                        {professor.nomeTurma}
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
                    <h1 className="text-m text-muted-foreground">Dados pessoais</h1>
                    <FormField
                        control={form.control}
                        name="studentName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome completo: *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nascimento"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
                                <FormLabel>Data de nascimento: *</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <div className="w-[50%]">
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF:</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[50%]">
                            <FormField
                                control={form.control}
                                name="rg"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RG:</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
                                <FormLabel>Telefone: *</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pai"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome do pai:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profPai"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profissão do pai:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phonePai"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
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
                        name="mae"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da mãe:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="profMae"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profissão da mãe:</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneMae"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
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
                        name="rendaFamilia"
                        render={({ field }) => (
                            <FormItem className="w-[50%]">
                                <FormLabel>Renda familiar total: *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <h1 className="pt-10 text-m text-muted-foreground">Escola</h1>
                    <FormField
                        control={form.control}
                        name="escola"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da escola: *</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <div className="w-[50%]">
                            <FormField
                                control={form.control}
                                name="serie"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Série: *</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-[50%]">
                            <FormField
                                control={form.control}
                                name="periodo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecione o período: *</FormLabel>
                                        <FormControl>
                                            <Select {...field} value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="manha">Manhã</SelectItem>
                                                        <SelectItem value="tarde">Tarde</SelectItem>
                                                        <SelectItem value="noite">Noite</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

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

                    <Button type="submit">Cadastrar</Button>
                </form>
            </Form>
        </ScrollArea>
    )
}