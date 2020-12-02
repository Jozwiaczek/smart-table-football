# Core STF

## About

This package contains all constants and models using in all packages.

## Constants

Constant represents constant values which are share between all packages.

| Name                 | Usage                                                |
| -------------------- | ---------------------------------------------------- |
| resources            | All elements which are handled by api                |
| notificationType     | Type of notification which user can get              |
| storageKey           | Name of stored in localstorage jwt key (Client apps) |
| themeMode            | Types of theme in player app                         |
| userEntities         | Types of user existing in whole system               |
| authStrategies       | Authentication strategies                            |
| locales              | Represents all handled languages in Player app       |
| authorizationHeaders | Types of authorization headers                       |
| statusEnum           | Users accounts status                                |
| statusMatch          | All possible match states                            |
| socketEvents         | All possible handled socket events                   |
| managerActions       | All possible table manager functions                 |

## Models

Models represent all schemas and entities which are using these schemas.

All of these resources have their own service for crud or another operations,
and they are stored in system memory or in the database.

| Name                 | Type   |
| -------------------- | ------ |
| userSchema           | schema |
| authManagementSchema | schema |
| admins               | entity |
| players              | entity |
| teams                | entity |
| matches              | entity |
| goals                | entity |
| table                | entity |
| table                | entity |
| notifications        | entity |
