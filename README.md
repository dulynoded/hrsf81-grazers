# Event HUD (Heads-Up Display)

Event HUD helps organizations run large in-person events, such as conferences, smoothly by providing a well-managed and structured communication channel between all event staff members in order to effectively coordinate event activities and logistics during the course of the event.

## Grazers

- Austin Sloane
- Christine Wong
- David Friedman
- Cecily Smith
- Clara Cho
- Claire Johnson
- Nanda Saboo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage
Event HUD features are role based -- it currently supports two roles: organizer and staff. Signing in as an organizer grants access to message broadcasting and group management. Message broadcasting can be targeted to specific groups. Signing in as a staff members grants access to receiving all broadcasted messages and message sending within their own group.

## Requirements

- Angular 1.6.6
- Node 6.4.x
- Express 4.16.x
- Postgresql 9.6.5
- Webpack 3.6.x
- Angular-Material 1.1.5
- See package.json for additional application dependencies

## Development

From within the root directory, run the following npm scripts to start client and server development:

```
npm run ng-dev
npm run server-dev
```
You will need to have Postgres installed and the server running with the "event_hud" database created. To create the tables and seed the tables with data, run the setup script on the command line from the root directory:

```
node database/setup.js
``` 

### Installing Dependencies

From within the root directory:

```
npm install
```

### Roadmap

View the project roadmap [here](https://drive.google.com/open?id=1k0lQECE05GhPnwK_uDIykap6wmfrCul8UVmNWVbDJOI)

User Stories [here](https://drive.google.com/open?id=1lJ-JmssfHyuUQyLMLJr33_QG-klgLbcOboi-hXYw_08)

## Supporting Documentation
[MVP App Architecture Diagram](https://drive.google.com/open?id=0B3EBfo09e2PfY1g0eGZEZEN2TWM)

[Client Architecture Diagram](https://drive.google.com/open?id=0B3EBfo09e2PfZ0wyb0xzMUxBNW8)

[Database Schema](https://drive.google.com/open?id=0B3EBfo09e2PfOGJhYUt2RzlhYmM)

The App plan doc is [here](https://docs.google.com/document/d/1TBVDMC1pwE-sTXAPrfi6eNgeuo4SmaHQXcmDlneldVE/edit#)




## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
