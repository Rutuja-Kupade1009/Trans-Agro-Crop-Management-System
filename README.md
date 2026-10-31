# Trans-Agro – Crop Management System

A demo full-stack crop management application built with React, Spring Boot, Spring Data JPA and MySQL.

## Features
- Dashboard with live farmer/crop counts and cultivated area
- Farmer registration, listing, search, and deletion
- Crop registration, listing, and deletion
- Farmer-wise crop report
- REST API integration using Axios
- Responsive React dashboard

## Tech stack
- Java 17, Spring Boot 3.2.5
- Spring Web, Spring Data JPA, Bean Validation
- MySQL 8+
- React 18, Vite, React Router, Axios, Lucide React

## Prerequisites
- JDK 17+
- Maven 3.8+ (or use your IDE's Maven support)
- MySQL 8+
- Node.js LTS and npm

## Run the backend
1. Create the database:
   ```sql
   CREATE DATABASE trans_agro;
   ```
2. Open `backend/src/main/resources/application.properties` and set your MySQL username/password.
3. From `backend`, run:
   ```bash
   mvn spring-boot:run
   ```
   Backend: `http://localhost:8080`

## Run the frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## API endpoints

### Farmers
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/farmers` | Register farmer |
| GET | `/api/farmers` | List farmers |
| GET | `/api/farmers/{id}` | Get farmer |
| PUT | `/api/farmers/{id}` | Update farmer |
| DELETE | `/api/farmers/{id}` | Delete farmer (only when no crops are linked) |

### Crops
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/crops/farmer/{farmerId}` | Register crop for farmer |
| GET | `/api/crops` | List crops |
| GET | `/api/crops/{id}` | Get crop |
| GET | `/api/crops/farmer/{farmerId}` | List a farmer's crops |
| PUT | `/api/crops/{id}` | Update crop |
| DELETE | `/api/crops/{id}` | Delete crop |

## Example requests

Register farmer (`POST /api/farmers`):
```json
{
  "name": "Rahul Patil",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "address": "Pune, Maharashtra"
}
```

Register crop (`POST /api/crops/farmer/1`):
```json
{
  "cropName": "Wheat",
  "cropType": "Food Crop",
  "season": "Rabi",
  "areaInAcres": 5.5
}
```

## Notes
- This is a learning/demo project, not a production agricultural platform.
- Do not commit real passwords. Configure credentials locally.
- The frontend expects the backend at `http://localhost:8080`.
