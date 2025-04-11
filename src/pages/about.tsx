import { Card, CardContent } from "@/components/ui/card";
import { BookOpenIcon, CodeIcon, MonitorIcon } from "lucide-react";

export function About() {
  return (
    <div className="space-y-6 w-full">
      
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Sobre a plataforma</h1>

        <Card>
          <CardContent>
            Esta plataforma tem como objetivo promover um fácil acesso aos dados da BNCC relacionados à computação, auxiliando professores na elaboração de planos de aula alinhados à Base Nacional. Com isso, espera-se facilitar a integração dos conteúdos de computação no currículo escolar, contribuindo para uma educação mais completa e conectada às demandas contemporâneas.
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Sobre a BNCC</h2>

        <Card>
          <CardContent>
            <p>A Base Nacional Comum Curricular (BNCC) é um documento normativo que define o conjunto de aprendizagens essenciais que todos os alunos devem desenvolver ao longo da Educação Básica.</p>
            <p>Na área de Computação, a BNCC abrange habilidades e competências relacionadas ao pensamento computacional, raciocínio lógico, resolução de problemas e fluência digital, preparando os estudantes para os desafios do século XXI.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Eixos principais</h2>

        <div className="space-y-4">
          <Card>
            <CardContent className="flex flex-row gap-4 w-fit">
              <div className="flex items-center justify-center bg-primary-foreground size-10 rounded-full">
                <CodeIcon className="size-5 text-primary" />
              </div>

              <div className="flex-1">
                <strong>Pensamento Computacional</strong>
                <p className="text-muted-foreground">Desenvolvimento de habilidades para resolver problemas de maneira sistemática e eficiente, utilizando conceitos da computação.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-row gap-4 w-fit">
              <div className="flex items-center justify-center bg-primary-foreground size-10 rounded-full">
                <MonitorIcon className="size-5 text-primary" />
              </div>

              <div className="flex-1">
                <strong>Mundo Digital</strong>
                <p className="text-muted-foreground">Conhecimentos sobre tecnologias digitais e como elas funcionam, desde dispositivos computacionais até redes e sistemas.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-row gap-4 w-fit">
              <div className="flex items-center justify-center bg-primary-foreground size-10 rounded-full">
                <BookOpenIcon className="size-5 text-primary" />
              </div>

              <div className="flex-1">
                <strong>Cultura Digital</strong>
                <p className="text-muted-foreground">Compreensão sobre o impacto das tecnologias digitais na sociedade, considerando aspectos éticos, sociais e culturais.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted px-4 py-3 flex items-center text-sm justify-center text-muted-foreground rounded-xl">
        Versão 0.0.1 - 2025 &copy; BNCC Computação
      </div>
    </div>
  )
}
