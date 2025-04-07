import { Heading } from "@/components/heading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Funnel, Search } from "lucide-react";
import { Link } from "react-router";

export function Home() {
  return (
    <div className="px-6 space-y-6 max-w-[1280px] mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <Heading title="Base Nacional Comum Curricular - Computação" className="text-center" />
        <p className="text-xl text-muted-foreground">
          Sistema de busca guiada para objetivos e habilidades na área de Computação
        </p>
        <p>Esta plataforma tem como objetivo promover um fácil acesso aos dados da BNCC relacionados à computação, auxiliando professores na elaboração de planos de aula alinhados à Base Nacional. Com isso, espera-se facilitar a integração dos conteúdos de computação no currículo escolar, contribuindo para uma educação mais completa e conectada às demandas contemporâneas.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Card>
          <CardHeader className="flex gap-2 items-center">
            <Search className="size-4" />
            <CardTitle>Visualizar habilidades</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>Encontre rapidamente objetivos e habilidades específicos usando nossa funcionalidade de busca por texto.</CardDescription>
          </CardContent>

          <CardFooter>
            <Link to='/habilidades' className="flex gap-1 items-center hover:underline">Realizar busca <ArrowRight className="size-4" /></Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex gap-2 items-center">
            <Funnel className="size-4" />
            <CardTitle>Sistema Guiado</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>Explore conteúdos educacionais de forma interativa, filtrando por etapas, objetivos e habilidades de maneira prática e eficiente.</CardDescription>
          </CardContent>

          <CardFooter>
            <Link to='/habilidades-guiado' className="flex gap-1 items-center hover:underline">Realizar busca <ArrowRight className="size-4" /></Link>
          </CardFooter>
        </Card>
      </div>

      <Card className="space-y-2">
        <CardHeader>
          <CardTitle>Sobre a BNCC na área de Computação</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>A Base Nacional Comum Curricular (BNCC) é um documento normativo que define o conjunto de aprendizagens essenciais que todos os alunos devem desenvolver ao longo da Educação Básica.</p>
          <p>Na área de Computação, a BNCC abrange habilidades e competências relacionadas ao pensamento computacional, raciocínio lógico, resolução de problemas e fluência digital, preparando os estudantes para os desafios do século XXI.</p>
        </CardContent>
      </Card>

      <div>

      </div>
    </div>
  )
}
