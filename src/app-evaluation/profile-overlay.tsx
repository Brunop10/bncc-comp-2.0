import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAppEvaluation } from "./context"

export function AppEvaluationProfileOverlay() {
  const {
    isProfileOpen,
    closeProfile,
    openOverlay,
    startEvaluation,
    profileRole,
    profileLevel,
    profileArea,
    profileExperience,
    setProfileRole,
    setProfileLevel,
    setProfileArea,
    setProfileExperience,
  } = useAppEvaluation()

  if (!isProfileOpen) return null

  function handleBack() {
    closeProfile()
    openOverlay()
  }

  function handleStart() {
    closeProfile()
    startEvaluation()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border bg-white/95 backdrop-blur shadow-xl p-6 w-[92%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900">Perfil do usuário</h2>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          <p>Estas informações ajudam a caracterizar quem está avaliando. São opcionais.</p>
          <p className="text-xs text-gray-500">As informações pessoais não serão divulgadas.</p>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="grid gap-1.5">
            <Label className="text-sm" htmlFor="profile-role">Papel principal (opcional)</Label>
            <Input
              id="profile-role"
              placeholder={`Ex.: Professor, Gestor, Estudante`}
              value={profileRole ?? ''}
              onChange={(e) => setProfileRole(e.target.value.trim() === '' ? null : e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm" htmlFor="profile-level">Nível/Modalidade (opcional)</Label>
            <Input
              id="profile-level"
              placeholder={`Ex.: Fundamental, Médio, Superior`}
              value={profileLevel ?? ''}
              onChange={(e) => setProfileLevel(e.target.value.trim() === '' ? null : e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm" htmlFor="profile-area">Área de atuação (opcional)</Label>
            <Input
              id="profile-area"
              placeholder={`Ex.: Computação, Pedagogia, Tecnologia Educacional`}
              value={profileArea ?? ''}
              onChange={(e) => setProfileArea(e.target.value.trim() === '' ? null : e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-sm" htmlFor="profile-experience">Tempo de experiência (opcional)</Label>
            <Input
              id="profile-experience"
              placeholder={`Ex.: 2–5 anos, 6–10 anos`}
              value={profileExperience ?? ''}
              onChange={(e) => setProfileExperience(e.target.value.trim() === '' ? null : e.target.value)}
            />
          </div>

          <p className="text-xs text-gray-500">Sugestões são apenas exemplos – escreva livremente.</p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={handleBack}>Voltar</Button>
          <Button onClick={handleStart}>Iniciar avaliação</Button>
        </div>
      </div>
    </div>
  )
}