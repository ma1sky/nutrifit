```
@startuml
left to right direction

actor "Пользователь" as User
actor "Внешнее устройство" as Device
actor "Администратор" as Admin

rectangle "Приложение для контроля питания и тренировок" as App {

  usecase "Регистрация" as reg
  usecase "Аутентификация" as auth

  usecase "Автоматическое создание программы питания" as recM
  usecase "Управление программой питания" as manageM
  usecase "Редактирование приема пищи" as editM
  usecase "Получение рекомендаций по рациону" as recFood

  usecase "Автоматическое создание программы тренировок" as recF
  usecase "Управление тренировками" as manageF
  usecase "Просмотр описания упражнения" as watchF
  usecase "Получение рекомендаций по тренировкам" as recFit

  usecase "Отслеживание прогресса (вес, калории, активность)" as tracking
  usecase "Аналитика и отчёты" as analytics
  usecase "Напоминания и уведомления" as notify

  usecase "Импорт данных активности с устройства" as importActivity
  usecase "Синхронизация с внешними устройствами" as syncDevices

  usecase "Администрирование системы" as adminOps
}

User --> reg
User --> auth

User --> recM
User --> manageM
User --> editM
User --> recFood

User --> recF
User --> manageF
User --> watchF
User --> recFit

User --> tracking
User --> analytics
User --> notify

Device --> importActivity
Device --> syncDevices

Admin --> adminOps

' --- Связи между use cases ---
tracking --> importActivity : <<include>>
tracking --> analytics : <<include>>

notify ..> manageM : <<extend>>
notify ..> manageF : <<extend>>
@enduml

```