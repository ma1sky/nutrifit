import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

type AuthMode = 'login' | 'register'
type Gender = 'male' | 'female'
type Goal = 'lose' | 'maintain' | 'gain'

const fakeApi = {
  login: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))
    if (!email.includes('@') || password.length < 4) throw new Error('Неверные данные (заглушка).')
    return { token: 'fake-jwt', user: { email } }
  },
  register: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500))
    if (!email.includes('@') || password.length < 4) throw new Error('Неверные данные (заглушка).')
    return { token: 'fake-jwt', user: { email } }
  },
}

function calculateBMR({ weightKg, heightCm, age, gender }: { weightKg: number; heightCm: number; age: number; gender: Gender }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

function applyActivityFactor(bmr: number, factor: number) {
  return bmr * factor
}

function applyGoal(calories: number, goal: Goal) {
  if (goal === 'lose') return Math.max(1200, calories - 500)
  if (goal === 'gain') return calories + 300
  return calories
}

function splitMacros(calories: number, weightKg: number, proteinPerKg = 1.6, fatPercent = 0.25) {
  const proteinGrams = Math.round(proteinPerKg * weightKg)
  const proteinCalories = proteinGrams * 4
  const fatCalories = Math.round(calories * fatPercent)
  const fatGrams = Math.round(fatCalories / 9)
  const carbsCalories = calories - proteinCalories - fatCalories
  const carbsGrams = Math.round(carbsCalories / 4)
  return { calories: Math.round(calories), proteinGrams, fatGrams, carbsGrams }
}

function AuthForm({ mode, onSuccess }: { mode: AuthMode; onSuccess: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const r = mode === 'login' ? await fakeApi.login(email, password) : await fakeApi.register(email, password)
      localStorage.setItem('auth', JSON.stringify(r))
      onSuccess(email)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card card-body shadow-sm" style={{ maxWidth: 480 }}>
      <h4 className="mb-3 text-capitalize">{mode === 'login' ? 'Вход' : 'Регистрация'}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Пароль</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={4} />
      </div>
      <button className="btn btn-primary" disabled={loading}>
        {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
      <div className="mt-3 text-muted small">Это заглушка. API не подключено.</div>
    </form>
  )
}

function Calculator() {
  const [weightKg, setWeightKg] = useState(70)
  const [heightCm, setHeightCm] = useState(175)
  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<Gender>('male')
  const [activity, setActivity] = useState(1.55)
  const [goal, setGoal] = useState<Goal>('maintain')

  const bmr = calculateBMR({ weightKg, heightCm, age, gender })
  const tdee = applyActivityFactor(bmr, activity)
  const goalCalories = applyGoal(tdee, goal)
  const macros = splitMacros(goalCalories, weightKg)

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4>Калькулятор КБЖУ</h4>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Вес (кг)</label>
            <input type="number" className="form-control mb-2" value={weightKg} onChange={(e) => setWeightKg(+e.target.value)} />
            <label className="form-label">Рост (см)</label>
            <input type="number" className="form-control mb-2" value={heightCm} onChange={(e) => setHeightCm(+e.target.value)} />
            <label className="form-label">Возраст</label>
            <input type="number" className="form-control mb-2" value={age} onChange={(e) => setAge(+e.target.value)} />
            <label className="form-label">Пол</label>
            <select className="form-select mb-2" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
            <label className="form-label">Активность</label>
            <select className="form-select mb-2" value={activity} onChange={(e) => setActivity(+e.target.value)}>
              <option value={1.2}>Минимальная</option>
              <option value={1.375}>Низкая</option>
              <option value={1.55}>Средняя</option>
              <option value={1.725}>Высокая</option>
              <option value={1.9}>Очень высокая</option>
            </select>
            <label className="form-label">Цель</label>
            <select className="form-select" value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
              <option value="lose">Похудеть</option>
              <option value="maintain">Поддерживать вес</option>
              <option value="gain">Набрать вес</option>
            </select>
          </div>

          <div className="col-md-6">
            <ul className="list-group mt-3 mt-md-0">
              <li className="list-group-item">BMR: {Math.round(bmr)} ккал</li>
              <li className="list-group-item">TDEE: {Math.round(tdee)} ккал</li>
              <li className="list-group-item">Калорийность цели: {macros.calories} ккал</li>
              <li className="list-group-item">Белки: {macros.proteinGrams} г</li>
              <li className="list-group-item">Жиры: {macros.fatGrams} г</li>
              <li className="list-group-item">Углеводы: {macros.carbsGrams} г</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem('auth')
      return raw ? JSON.parse(raw)?.user?.email : null
    } catch {
      return null
    }
  })
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Fitness App (КБЖУ)</h1>
        {user && <button className="btn btn-outline-secondary btn-sm" onClick={() => { localStorage.removeItem('auth'); setUser(null) }}>Выйти</button>}
      </div>

      <div className="row gy-4">
        <div className="col-md-4">
          {user ? (
            <div className="card card-body shadow-sm">
              <h5>Аккаунт</h5>
              <p>Вы вошли как <strong>{user}</strong></p>
            </div>
          ) : (
            <>
              <div className="btn-group mb-3">
                <button className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('login')}>Вход</button>
                <button className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setMode('register')}>Регистрация</button>
              </div>
              <AuthForm mode={mode} onSuccess={setUser} />
            </>
          )}
        </div>

        <div className="col-md-8">
          <Calculator />
        </div>
      </div>
    </div>
  )
}
