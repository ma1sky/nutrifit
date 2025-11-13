import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");

  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  } | null>(null);

  const calculate = () => {
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    let calories = bmr * activity;

    if (goal === "lose") calories *= 0.85;
    if (goal === "gain") calories *= 1.15;

    const protein = (calories * 0.3) / 4;
    const fat = (calories * 0.25) / 9;
    const carbs = (calories * 0.45) / 4;

    setResult({
      calories: Math.round(calories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs),
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Калькулятор КБЖУ</h2>
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label">Пол</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
          >
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Возраст (лет)</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Рост (см)</label>
          <input
            type="number"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Вес (кг)</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Уровень активности</label>
          <select
            className="form-select"
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
          >
            <option value={1.2}>Минимум (сидячий образ жизни)</option>
            <option value={1.375}>Лёгкий (1–3 тренировки/неделю)</option>
            <option value={1.55}>Средний (3–5 тренировки)</option>
            <option value={1.725}>Высокий (6–7 тренировки)</option>
            <option value={1.9}>Экстремальный (2× в день)</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Цель</label>
          <select
            className="form-select"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value as "lose" | "maintain" | "gain")
            }
          >
            <option value="lose">Похудение</option>
            <option value="maintain">Поддержание</option>
            <option value="gain">Набор массы</option>
          </select>
        </div>

        <button onClick={calculate} className="btn btn-primary w-100">
          Рассчитать КБЖУ
        </button>

        {result && (
          <div className="alert alert-success mt-4">
            <h5>Результат:</h5>
            <p>Калории: <strong>{result.calories}</strong> ккал</p>
            <p>Белки: <strong>{result.protein}</strong> г</p>
            <p>Жиры: <strong>{result.fat}</strong> г</p>
            <p>Углеводы: <strong>{result.carbs}</strong> г</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
