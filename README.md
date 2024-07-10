# Hotel Booking API

## Overview

This project is a RESTful API for a hotel booking system developed using NestJS. It provides endpoints for searching available rooms, booking rooms, viewing current bookings, and canceling bookings. The API uses PostgreSQL for data storage and includes production-quality features.

## Features

- **Search for Available Rooms:** Find rooms based on a date range and number of beds.
- **Book Hotel Rooms:** Book a room and receive a booking reference ID.
- **Search Current Bookings:** Retrieve a list of bookings within a specified date range.
- **Cancel Bookings:** Cancel an existing booking using the booking reference ID.

## Technology Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM

## API Endpoints

### 1. Search for Available Rooms

- **Endpoint:** `GET /rooms`
- **Description:** Search for available hotel rooms based on a date range and number of beds.
- **Query Parameters:**
  - `startDate` (ISO date format, e.g., `2024-07-01`)
  - `endDate` (ISO date format, e.g., `2024-07-07`)
  - `numberOfBeds` (Number of beds required, e.g., `2`)

- **Request Example:**

    ```http
    GET /rooms?startDate=2024-07-01&endDate=2024-07-07&numberOfBeds=2
    ```

- **Response:**

    ```json
    [
      {
        "id": 1,
        "name": "Deluxe Suite",
        "description": "A spacious suite with sea view.",
        "numberOfBeds": 2,
        "price": 150.00,
        "availability": [
          {
            "date": "2024-07-01T00:00:00.000Z",
            "available": true
          },
          {
            "date": "2024-07-02T00:00:00.000Z",
            "available": true
          }
          // Additional availability dates
        ]
      }
    ]
    ```

### 2. Book Hotel Room

- **Endpoint:** `POST /bookings`
- **Description:** Book a room by providing room ID and booking dates.
- **Request Body:**

    ```json
    {
      "roomId": 1,
      "startDate": "2024-07-01",
      "endDate": "2024-07-07"
    }
    ```

- **Response:**

    ```json
    {
      "referenceId": "bookingRef12345"
    }
    ```

### 3. Search Current Bookings

- **Endpoint:** `GET /bookings`
- **Description:** Retrieve a list of bookings within a specified date range.
- **Query Parameters:**
  - `startDate` (ISO date format, e.g., `2024-07-01`)
  - `endDate` (ISO date format, e.g., `2024-07-07`)

- **Request Example:**

    ```http
    GET /bookings?startDate=2024-07-01&endDate=2024-07-07
    ```

- **Response:**

    ```json
    [
      {
        "id": 1,
        "roomId": 1,
        "startDate": "2024-07-01T00:00:00.000Z",
        "endDate": "2024-07-07T00:00:00.000Z",
        "referenceId": "bookingRef12345"
      }
    ]
    ```

### 4. Cancel Booking

- **Endpoint:** `DELETE /bookings/:referenceId`
- **Description:** Cancel an existing booking using the booking reference ID.
- **Path Parameter:**
  - `referenceId` (Booking reference ID)

- **Request Example:**

    ```http
    DELETE /bookings/bookingRef12345
    ```

- **Response:**

    ```json
    {
      "message": "Booking cancelled successfully."
    }
    ```


