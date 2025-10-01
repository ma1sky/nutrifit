```
@startuml
left to right direction
class User {
  +id: int
  +name: string
  +email: string
  +passwordHash: string
  +age: int
  +height: float
  +weight: float
  +calorieGoal: int
  +register()
  +authenticate()
}

class Goal {
  +id: int
  +type: string  'похудение, поддержка, набор массы
  +targetWeight: float
  +deadline: Date
}

class MealPlan {
  +id: int
  +name: string
  +startDate: Date
  +endDate: Date
  +status: string
  +addMeal()
  +editMeal()
}

class Meal {
  +id: int
  +time: DateTime
  +calories: int
  +nutrients: Map
}

class FoodItem {
  +id: int
  +name: string
  +caloriesPer100g: int
  +proteins: float
  +fats: float
  +carbs: float
}

class MealLog {
  +id: int
  +date: Date
  +consumedCalories: int
  +addFoodItem()
}

class WorkoutPlan {
  +id: int
  +name: string
  +durationWeeks: int
  +status: string
  +addExercise()
  +editWorkout()
}

class Exercise {
  +id: int
  +name: string
  +description: string
  +videoUrl: string
}

class ExerciseCategory {
  +id: int
  +name: string
  +muscleGroup: string
}

class WorkoutLog {
  +id: int
  +date: Date
  +completedExercises: List
}

class ProgressTracker {
  +updateProgress()
  +generateReport()
}

class ProgressEntry {
  +id: int
  +date: Date
  +weight: float
  +steps: int
  +caloriesBurned: int
}

class RecommendationEngine {
  +generateMealPlan()
  +generateWorkoutPlan()
  +personalize()
}

class Notification {
  +id: int
  +message: string
  +time: DateTime
  +send()
}

class DeviceIntegration {
  +deviceId: string
  +syncData()
  +importActivity()
}

class Admin {
  +id: int
  +name: string
  +manageUsers()
  +manageSystem()
}

' --- Связи ---
User "1" -- "1" Goal
User "1" -- "1" MealPlan
User "1" -- "1" WorkoutPlan
User "1" -- "*" ProgressTracker
User "1" -- "*" Notification

MealPlan "1" -- "*" Meal
Meal "*" -- "*" FoodItem
MealPlan "1" -- "*" MealLog

WorkoutPlan "1" -- "*" Exercise
Exercise "*" -- "1" ExerciseCategory
WorkoutPlan "1" -- "*" WorkoutLog

ProgressTracker "1" -- "*" ProgressEntry

ProgressTracker --> RecommendationEngine : uses
RecommendationEngine --> MealPlan : generates
RecommendationEngine --> WorkoutPlan : generates

DeviceIntegration --> ProgressEntry : updates
Admin --> User : manages

@enduml

```