# Reposit challenge

## Table of contents

- [Overview](#overview)
- [Setup](#setup)
- [Running the project](#running-the-project)
- [Running the tests](#running-the-tests)
- [Project structure](#project-structure)

## Overview

This project implements the following functionalities:

1. Calculating the average rent of properties for a given region.
2. Calculating the monthly rent per tenant for a given property.
3. Validating UK postcodes for a list of properties.
4. Getting the status of a given property.

Data is sourced from CSV files via repository modules.

## Setup

### Prerequisites

- Node.js (v20.10.0+)
- npm (v10.2.3+)

### Installing dependencies

Install the project dependencies:

```bash
npm install
```

## Running the project

Run all requirements by running the project:

```bash
npm start
```

This will output:

- Average rent per region (requirement 1)
- Monthly rent per tenant for selected properties (requirement 2)
- List of properties with invalid postcodes (requirement 3)
- Current status of selected properties at today's date (requirement 4)

## Running the tests

Run the test suite using:

```bash
npm test
```

Automated tests follow the `*.test.ts` naming convention and are stored next to their corresponding implementation file.

The relevant tests for each requirement are the following:

| Requirement | Relevant test file                                  |
|-------------|-----------------------------------------------------|
| 1           | `averageRent/averageRent.test.ts`                   |
| 2           | `monthlyRentPerTenant/monthlyRentPerTenant.test.ts` |
| 3           | `postcodeValidation/postcodeValidation.test.ts`     |
| 4           | `propertyStatus/propertyStatus.test.ts`             |

There are other automated tests for other parts of the logic.

## Project structure

*All the following files are contained in the `src/` repository.*

| Folder/File             | Description                                           |
|-------------------------|-------------------------------------------------------|
| `index.ts`              | Main entry point that runs all requirements           |
| `averageRent/`          | Logic for average rent calculation (requirement 1)    |
| `monthlyRentPerTenant/` | Monthly rent per tenant calculation (requirement 2)   |
| `postcodeValidation/`   | UK postcode validation logic (requirement 3)          |
| `propertyStatus/`       | Property status determination logic (requirement 4)   |
| `model/`                | Domain models and types for properties and tenants    |
| `data/`                 | CSV files containing properties and tenants data      |
| `repositories/`         | Modules to access CSV data for properties and tenants |
| `config/`               | Configuration files with file paths to CSV data       |
| `utils/`                | Helper functions such as currency formatting          |
