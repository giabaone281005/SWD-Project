# Diagrams

## Activity Diagram

```plantuml
@startuml
start
:Login;
:View Dashboard;
if (Generate Bill?) then (Yes)
:Calculate Bill;
:Save Bill;
endif
stop
@enduml
```

## Interaction Diagram

```plantuml
@startuml
actor Admin
participant Frontend
participant API
participant Database

Admin -> Frontend: Generate Bill
Frontend -> API: POST /generate-bill
API -> Database: Save bill
Database --> API: Success
API --> Frontend: Response
Frontend --> Admin: Show success
@enduml
```

## State Diagram

```plantuml
@startuml
[*] --> Available
Available --> Occupied
Occupied --> Maintenance
Maintenance --> Available
@enduml
```

## Integrated Communication Diagram

```plantuml
@startuml
object User
object Frontend
object Backend
object Database

User -> Frontend : request
Frontend -> Backend : API call
Backend -> Database : query
Database -> Backend : result
Backend -> Frontend : response
@enduml
```

## System High-Level Design

### Components
- Web Admin
- Mobile App
- REST API
- Authentication Service
- Billing Service
- Database

## Component Diagram

```plantuml
@startuml
package Frontend {
  [React Admin]
  [Flutter Mobile]
}

package Backend {
  [Auth Service]
  [Room Service]
  [Billing Service]
}

database MySQL

[React Admin] --> [Auth Service]
[Flutter Mobile] --> [Auth Service]
[Room Service] --> MySQL
[Billing Service] --> MySQL
@enduml
```

## Class Diagram

```plantuml
@startuml
class User {
  +userId
  +username
  +password
}

class Room {
  +roomId
  +price
  +status
}

class Tenant {
  +tenantId
  +fullName
}

class Bill {
  +billId
  +totalAmount
}

User --> Tenant
Tenant --> Room
Room --> Bill
@enduml
```

## Map Architecture

### Mapping

Frontend Layer
- ReactJS
- Flutter

Backend Layer
- Spring Boot
- Security
- REST API

Data Layer
- MySQL
- JPA

Infrastructure Layer
- Docker
- Nginx
- CI/CD

## Map Class Diagram

```plantuml
@startuml
class UserController
class UserService
class UserRepository
class UserEntity

UserController --> UserService
UserService --> UserRepository
UserRepository --> UserEntity
@enduml
```
