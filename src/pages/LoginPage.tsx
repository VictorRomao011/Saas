import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GitFork, Mail, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/store/appStore'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)
  const loginDemo = useAppStore((s) => s.loginDemo)
  const loginSocialMock = useAppStore((s) => s.loginSocialMock)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)
      if (!result.success) {
        setError(result.message)
        return
      }
      toast.success(result.message)
      navigate('/dashboard')
    }, 400)
  }

  function handleSocial(provider: 'google' | 'github') {
    loginSocialMock(provider)
    toast.info(`Login social com ${provider === 'google' ? 'Google' : 'GitHub'} (simulado)`, {
      description: 'Nenhuma autenticação real foi realizada. Esta é uma prévia do fluxo.',
    })
    navigate('/dashboard')
  }

  function handleDemo() {
    loginDemo()
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      <Card className="glass-panel">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-display text-2xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Entre para continuar de onde você parou.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleSocial('google')}>
              <Mail className="h-4 w-4" /> Entrar com Google (simulado)
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocial('github')}>
              <GitFork className="h-4 w-4" /> Entrar com GitHub (simulado)
            </Button>
            <Button variant="ghost" className="w-full" onClick={handleDemo}>
              <Sparkles className="h-4 w-4" /> Usar conta demo (Victor)
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/cadastro" className="font-medium text-primary hover:underline">
              Cadastre-se gratuitamente
            </Link>
          </p>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Conta demo: demo@estudaflow.ai · senha demo123
      </p>
    </div>
  )
}
