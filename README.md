<center>
  <a href="https://smart-table-football-admin.netlify.app">
    <img alt="Guitar Book" src="assets/stf-logo_ball_orange_transparent.png" width="300" />
  </a>
</div>

# [Smart Table Football](https://github.com/Jozwiaczek/smart-table-football)

![CI](https://github.com/Jozwiaczek/smart-table-football/workflows/Continuous%20Integration/badge.svg)

## About

Abstract

## Deployed apps

| Module | Status                                                                                                                                                                          | Public URL                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Admin  | [![Netlify Status](https://api.netlify.com/api/v1/badges/3335005e-5758-43b6-88bc-ceb21cd6967c/deploy-status)](https://app.netlify.com/sites/smart-table-football-admin/deploys) | https://smart-table-football-admin.netlify.app |
| Player | [![Netlify Status](https://api.netlify.com/api/v1/badges/24c1e8b5-9fd2-4508-a0a8-ee00626f036c/deploy-status)](https://app.netlify.com/sites/smart-table-football/deploys)       | https://smart-table-football.netlify.app       |
| Api    | -                                                                                                                                                                               | https://stf-api.herokuapp.com/                 |

## Packages Docs

- Backend:
  - [Api](./packages/api/README.md)
  - [Core](./packages/core/README.md)
  - Raspberry:
    - [Table](./packages/table/README.md)
    - [Table Manager](./packages/table-manager/README.md)
- Frontend:
  - [Admin](./packages/admin/README.md)
  - [Admin Desktop](./packages/admin-desktop/README.md)
  - [Player](./packages/player/README.md)

## Getting Started

1. Make sure you have all required tools:
   - [NodeJS](https://nodejs.org/)
   - [Yarn](https://yarnpkg.com/)
   - [Docker](https://www.docker.com/)

2.  Add `.env` files with secrets based on `.env.example` in: 
    - [Api](./packages/api)
    - [Table Manager](./packages/table-manager)
    - [Admin](./packages/admin)
    - [Player](./packages/player)
   
3. Deploy MongoDB Docker image

   - Go to [Api Docs](./packages/api/README.md)
   - Follow `How To Deploy And Manage MongoDB With Docker` section

3. Install project dependencies

   ```shell script
        yarn install
   ```

4. Run Api

   ```shell script
        cd packages/api
        yarn start
   ```

5. Prepare Raspberry and run Table Manager

   - Go to [Table Manager Docs](./packages/table-manager/README.md)
   - Follow `Getting Started` section

6. Run Player App

   ```shell script
       cd packages/player
       yarn start
   ```

7. Run Admin App

   ```shell script
       cd packages/admin
       yarn start
   ```

   or if You want run admin app as a desktop app:

   ```shell script
       cd packages/admin-desktop
       yarn start
   ```
