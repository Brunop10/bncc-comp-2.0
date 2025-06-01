import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputMask } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Subheading({ label }: { label: string }) {
  return <h3 className="text-lg font-semibold border-b pb-2">{label}</h3>
}

const REQUIRED_MESSAGE = 'O campo deve ser informado'

const CLASSIFICATIONS = [
  { value: 'Plugado', label: 'Plugado' },
  { value: 'Desplugado', label: 'Desplugado' }
];

const formSchema = z.object({
  title: z.string().min(1, REQUIRED_MESSAGE),
  description: z.string().min(1, REQUIRED_MESSAGE),
  bnccCode: z.string().min(1, REQUIRED_MESSAGE),
  classification: z.string().min(1, REQUIRED_MESSAGE),
  link: z.string(),
  tags: z.array(z.string()),
  source: z.string().min(1, REQUIRED_MESSAGE),
  collaboratorName: z.string().min(1, REQUIRED_MESSAGE),
  collaboratorEmail: z.string().min(1, REQUIRED_MESSAGE),
  collaboratorPhone: z.string().min(1, REQUIRED_MESSAGE),
})

type FormData = z.infer<typeof formSchema>

export function Contribute() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  return (
    <Form {...form}>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contribuir com Exemplo</CardTitle>
            <p className="text-muted-foreground">
              Ajude a comunidade compartilhando seus exemplos de atividades.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Subheading label="Informações do Exemplo" />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título do exemplo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a descrição do exemplo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bnccCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código da Habilidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a descrição do exemplo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classificação</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma classificação" />
                        </SelectTrigger>

                        <SelectContent>
                          {CLASSIFICATIONS.map(classification => (
                            <SelectItem
                              key={classification.value}
                              value={classification.value}
                            >
                              {classification.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link de Referência</FormLabel>
                    <FormControl>
                      <Input placeholder="https://exemplo.com/recurso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TODO: Adicionar tags */}

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fonte</FormLabel>
                      <FormControl>
                      <Input placeholder="Ex: Adaptado de Computer Science Unplugged ou Livro X" {...field} />
                      </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <Subheading label="Informações do Colaborador" />

              <FormField
                control={form.control}
                name="collaboratorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collaboratorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu melhor e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collaboratorPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="(__) _ ____-____"
                        replacement={{ _: /[0-9]/ }}
                        placeholder="(55) 9 8877-6655" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-muted-foreground text-xs">
                Ao enviar uma contribuição você autoriza a equipe de curadoria à realizar contato para uma possível validação das informações.
              </p>
              <p className="text-muted-foreground text-xs">
                As informações submetidas podem ser alteradas sem aviso, se houver necessidade.
              </p>
            </div>

            <Button
              className="w-full"
              disabled={form.formState.isLoading}
            >
              {form.formState.isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : 'Enviar Contribuição'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
