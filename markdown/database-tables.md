# Database Tables

## Users
- user_id
- username
- password
- email
- phone
- role_id
- status
- created_at

## Roles
- role_id
- role_name

## Rooms
- room_id
- room_number
- floor
- price
- status
- description

## Tenants
- tenant_id
- full_name
- phone
- email
- citizen_id
- room_id

## Contracts
- contract_id
- tenant_id
- room_id
- start_date
- end_date
- deposit_amount
- status

## Bills
- bill_id
- room_id
- electricity_fee
- water_fee
- service_fee
- total_amount
- due_date
- status

## Payments
- payment_id
- bill_id
- payment_method
- payment_date
- amount
- status

## Notifications
- notification_id
- user_id
- title
- content
- created_at

## MaintenanceRequests
- request_id
- tenant_id
- room_id
- description
- status
- created_at
