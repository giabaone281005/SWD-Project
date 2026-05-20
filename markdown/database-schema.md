# Database Schema

```sql
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50)
);

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(20),
    role_id INT,
    status VARCHAR(20),
    created_at TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

CREATE TABLE Rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(20),
    floor INT,
    price DECIMAL(10,2),
    status VARCHAR(20),
    description TEXT
);

CREATE TABLE Tenants (
    tenant_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    citizen_id VARCHAR(20),
    room_id INT,
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);
```
