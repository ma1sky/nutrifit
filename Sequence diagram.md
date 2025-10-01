```
@startuml
actor User
actor Admin
participant "App" as App
participant "RecommendationEngine" as RE
participant "MealPlan" as MP
participant "WorkoutPlan" as WP
participant "ProgressTracker" as PT
participant "DeviceIntegration" as DI
participant "Notification" as Notif

' --- Авторизация ---
User -> App : Вход (логин+пароль)
App -> User : Подтверждение аутентификации

' --- Получение данных прогресса ---
App -> PT : Запрос данных прогресса
PT -> DI : Импортировать данные активности
DI --> PT : Данные шагов, калорий, сна
PT --> App : История прогресса

' --- Формирование рекомендаций ---
User -> App : Запросить рекомендации
App -> RE : Передать данные пользователя и цели

RE -> PT : Запросить актуальный прогресс
PT --> RE : Прогресс + история

RE -> MP : Сгенерировать план питания
MP --> RE : MealPlan

RE -> WP : Сгенерировать план тренировок
WP --> RE : WorkoutPlan

RE --> App : Рекомендованные планы
App --> User : Отображение планов

' --- Редактирование планов ---
User -> App : Редактировать приём пищи
App -> MP : Обновить MealPlan

User -> App : Редактировать тренировку
App -> WP : Обновить WorkoutPlan

' --- Напоминания и уведомления ---
App -> Notif : Создать напоминания
Notif --> User : Уведомление (приём пищи, тренировка)

@enduml

```