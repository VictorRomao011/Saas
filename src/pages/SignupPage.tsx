import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GitFork, Mail } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/store/appStore'

export function SignupPage() {
  const navigate = useNavigate()
  const signup = useAppStore((s) => s.signup)
  const loginSocialMock = useAppStore((s) => s.loginSocialMock)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const result = signup(name, email, password)
      setLoading(false)
      if (!result.success) {
        setError(result.message)
        return
      }
      toast.success(result.message)
      navigate('/escolha-mascote')
    }, 400)
  }

  function handleSocial(provider: 'google' | 'github') {
    loginSocialMock(provider)
    toast.info(`Cadastro com ${provider === 'google' ? 'Google' : 'GitHub'} (simulado)`, {
      description: 'Nenhuma autenticação real foi realizada. Esta é uma prévia do fluxo.',
    })
    navigate('/escolha-mascote')
  }

  return (
    <div className="w-full max-w-md">
      <Card className="glass-panel">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="font-display text-2xl">Crie sua conta gratuita</CardTitle>
          <CardDescription>Comece a organizar seus estudos em poucos minutos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
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
                placeholder="Mínimo de 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta gratuita'}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleSocial('google')}>
              <Mail className="h-4 w-4" /> Continuar com Google (simulado)
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocial('github')}>
              <GitFork className="h-4 w-4" /> Continuar com GitHub (simulado)
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Ao criar uma conta, você concorda que esta é uma prévia com dados simulados — nenhuma integração externa real está ativa.
      </p>
    </div>
  )
}
