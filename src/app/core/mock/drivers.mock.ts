import { Driver } from '../models/driver.model';

export const DRIVERS_MOCK: Driver[] = [
   {
            "driverId": "D001",
            "fullName": "Budi Gunawan",
            "licenseNumber": "A1234567",
            "birthDate": "1990-05-15",
            "contractStatus": "Active",
            "joinDate": "2018-03-10",
            "currentVehicle": {
                "vehicleId": "K005",
                "plateNumber": "E 7890 FG",
                "vehicleType": "Van",
                "year": 2023,
                "vehicleStatus": "Operational",
                "nextServiceSchedule": "2026-03-10"
            },
            "activeTask": {
                "taskId": null,
                "taskStatus": "Ready",
                "destination": null,
                "notes": "No active task/on route"
            },
            "recentTaskHistory": [
                { "taskId": "T001", "status": "Completed", "destination": "Bandung", "completionDate": "2025-10-30" },
                { "taskId": "T004", "status": "Cancelled", "destination": "Semarang", "completionDate": "2025-11-03" }
            ],
            dateOfBirth: '',
            joinedDate: ''
        },
        {
            "driverId": "D002",
            "fullName": "Siti Nurmala",
            "licenseNumber": "B9876543",
            "birthDate": "1985-11-20",
            "contractStatus": "Active",
            "joinDate": "2019-07-22",
            "currentVehicle": {
                "vehicleId": "K001",
                "plateNumber": "B 1234 XY",
                "vehicleType": "Box Truck",
                "year": 2020,
                "vehicleStatus": "Operational",
                "nextServiceSchedule": "2025-12-01"
            },
            "activeTask": {
                "taskId": "T002",
                "taskStatus": "On Route",
                "destination": "Surabaya",
                "notes": "Heavy load, needs rest in Semarang."
            },
            "recentTaskHistory": [],
            dateOfBirth: '',
            joinedDate: ''
        },
        {
            "driverId": "D003",
            "fullName": "Agung Nugroho",
            "licenseNumber": "C5678901",
            "birthDate": "1995-01-08",
            "contractStatus": "On Leave",
            "joinDate": "2021-01-05",
            "currentVehicle": null,
            "activeTask": null,
            "recentTaskHistory": [],
            dateOfBirth: '',
            joinedDate: ''
        },
        {
            "driverId": "D004",
            "fullName": "Rina Wijaya",
            "licenseNumber": "D2345678",
            "birthDate": "1988-09-30",
            "contractStatus": "Active",
            "joinDate": "2020-11-12",
            "currentVehicle": {
                "vehicleId": "K002",
                "plateNumber": "D 5678 AZ",
                "vehicleType": "Pickup",
                "year": 2022,
                "vehicleStatus": "Operational",
                "nextServiceSchedule": "2025-11-15"
            },
            "activeTask": {
                "taskId": "T003",
                "taskStatus": "Pending",
                "destination": "Bogor",
                "notes": "Pickup at warehouse."
            },
            "recentTaskHistory": [
                { "taskId": "T005", "status": "Completed", "destination": "Jakarta", "completionDate": "2025-11-01" }
            ],
            dateOfBirth: '',
            joinedDate: ''
        }
];
