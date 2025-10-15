import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputMask } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import { Editor } from "@/components/editor";
import { useMutation } from "@tanstack/react-query";
import { addExample } from "@/api/add-example";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import type { KeyboardEvent } from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useNetworkStatus } from "@/context/network-context";
import { ABILITY_CODES } from "@/utils/ability-codes";
import { api } from "@/lib/axios";
import { OfflineBanner } from "@/components/offline-banner";

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
  tag: z.string().max(15, 'Máximo 15 caracteres'),
  tags: z.array(z.object({
    id: z.string(),
    value: z.string()
  })),
  source: z.string().min(1, REQUIRED_MESSAGE),
  collaboratorName: z.string().min(1, REQUIRED_MESSAGE),
  collaboratorEmail: z
    .string()
    .email('Deve ser um e-mail válido')
    .min(1, REQUIRED_MESSAGE),
  collaboratorPhone: z.string().min(1, REQUIRED_MESSAGE),
})

type FormData = z.infer<typeof formSchema>

export function Contribute() {
  const { isOnline } = useNetworkStatus();
  const [showOfflineSubmissionBanner, setShowOfflineSubmissionBanner] = useState(false);
  const [isBnccComboOpen, setIsBnccComboOpen] = useState(false);

  useEffect(() => {
    if (isOnline) {
      setShowOfflineSubmissionBanner(false);
    }
  }, [isOnline]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      title: '',
      description: '',
      bnccCode: '',
      classification: '',
      link: '',
      source: '',
      tag: '',
      tags: [],
      collaboratorName: '',
      collaboratorEmail: '',
      collaboratorPhone: '',
    }
  })

  const {
    fields: tags,
    append: appendTag,
    remove: removeTag
  } = useFieldArray<FormData>({
    control: form.control,
    name: "tags",
  })


  const abilitiesCodes = ABILITY_CODES.map((item) => ({
    value: item,
    label: item,
  }))

  const { mutate: addExampleMutate, isPending: addExampleIsPending } = useMutation({
    mutationFn: addExample,
    onSuccess: () => {
      toast.success('Contribuição enviada com sucesso!');
      form.reset();
    },
    onError: () => {
      toast.error('Falha ao enviar contribuição. Tente novamente.');
    },
  });

  function handleAddExample(data: FormData) {
    const payload = {
      ...data,
      tags: data.tags.map((item) => item.value).join(', '),
      collaboratorPhone: data.collaboratorPhone.replace(/[^\d]/g, ''),
    };

    if (!isOnline) {
      setShowOfflineSubmissionBanner(true);

      void api.post("", {
        resource: "addExample",
        payload: {
          titulo: payload.title,
          bncc_codigo_principal: payload.bnccCode,
          descricao: payload.description,
          classificacao: payload.classification,
          link: payload.link,
          tags: payload.tags,
          fonte: payload.source,
          nome_colaborador: payload.collaboratorName,
          email_colaborador: payload.collaboratorEmail,
          telefone_colaborador: payload.collaboratorPhone,
        },
      }, {
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      }).catch(() => {  });

      form.reset();
      const pendingCountKey = '@bncc-comp:pending-example-count';
      const currentCount = Number(localStorage.getItem(pendingCountKey) ?? '0');
      localStorage.setItem(pendingCountKey, String(currentCount + 1));
      localStorage.setItem('@bncc-comp:pending-example-submission', '1');
      return;
    }

    addExampleMutate(payload);
  }

  function handleAddTag(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tag = form.watch('tag').trim()

      if (!tag) return toast.info('Insira um valor para a tag.')

      if (tags.map(item => item.value).includes(tag)) return

      appendTag({
        id: Math.random().toString(36).substring(6),
        value: tag,
      });
      form.setValue('tag', '')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAddExample)}
        className="space-y-8"
      >
        {showOfflineSubmissionBanner && (
          <div className="fixed bottom-4 left-0 right-0 z-50 mx-2 md:mx-auto md:max-w-lg">
            <OfflineBanner
              variant="info"
              message={
                <>
                  <strong>Contribuição registrada offline.</strong> <p></p> Será enviada automaticamente ao ficar online dentro das próximas 24 horas, caso contrário, será excluída.
                </>
              }
              onClose={() => setShowOfflineSubmissionBanner(false)}
            />
          </div>
        )}
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
                      <Editor
                        placeholder="Insira a descrição"
                        content={field.value}
                        onChangeContent={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="bnccCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="items-center gap-1.5">
                        Código da Habilidade
                      </FormLabel>
                      <Popover open={isBnccComboOpen} onOpenChange={setIsBnccComboOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? abilitiesCodes.find(
                                    (abilityCode) => abilityCode.value === field.value
                                  )?.label
                                : "Selecione a Habilidade"}
                              <ChevronDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Buscar habilidade"
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>Nenhuma código encontrado.</CommandEmpty>

                              <CommandGroup>
                                {abilitiesCodes.map((abilityCode) => (
                                  <CommandItem
                                    value={abilityCode.label}
                                    key={abilityCode.value}
                                    onSelect={() => {
                                      form.setValue("bnccCode", abilityCode.value)
                                      setIsBnccComboOpen(false)
                                    }}
                                  >
                                    {abilityCode.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        abilityCode.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="classification"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Classificação</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a classificação"  />
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
              </div>

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

              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Insira uma tag e pressione enter'
                          onKeyDown={handleAddTag}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag, idx) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag.value}
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

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
                    <FormLabel>Nome Completo</FormLabel>
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
              type="submit"
              disabled={isOnline ? addExampleIsPending : false}
            >
              {isOnline && addExampleIsPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Enviar Contribuição'
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
