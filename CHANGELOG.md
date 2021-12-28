# CHANGELOG

## v0.4.0

All:

- Upgrade dependencies to latest version
- Remove unused file
- Remove unused dependencies
- Add docker build
- Add docker compose example

Server:

- Migrate server to NestJS
- Use `express.serve` for serving media file
- Always retry to connect mongodb database
- Reconfigure eslint
- Prevent changed finished game

Client:

- Use Vue Router History Mode
- Migrate to TypeScript
- Change When Text Editor Floating Menu should show
- Upgrade storybook
- Add loading and error indicator to page
- Improve Quiz and Quiz editor Toolbar
- Use proxy for dev tools
- Fix MathLive cannot load sounds

Text Editor Math Plugin:

- Remove Math Raw Edit, Instead use MathLive LaTex mode.
- Improve input rule
- Add paste rule
- Improving spacing

## v0.3.0

Quiz:

- Support multiple question type (choice, text, number and math)
- Use tiptap for rich text editor with features includes: math, tooltip, table, image upload. Use HTML for text format
- Redesign create quiz API
- Redesign save quiz API
- Use mathlive for math editor
- Add prefix to question choice
- Prevent create quiz when not logged in

Game:

- Support shuffle questions
- Redesign API
- Redesign Database

Server (All):

- Use routing-controller for controller
- Migrate from ajv and JSON schema to class-validator
- Migrate data type to class from interface

Client (All):

- Migrate to Buefy and remove TailwindCSS
- Use mdi-icon for icon

## v0.2.0

- Use English language in Source Code and Database
- Use Google form like layout for Quiz and Game
- Redesign API and UI Design
- Rename path and route
- Remove Admin, Replaced by Quiz Editor
- Upgrade some dependencies
- Server: Rewrite in TypeScript

## Sebelum Merging

### Client v0.1.0

Ini adalah versi awal dari soalku-front-end dengan membawa fitur berikut:

- Dukungan Login dan Register
- Penjelajah Paket Soal dan Soal
- Menjalankan permainan
- Dukungan administrasi paket soal dan soal

### Server v0.1.0

Ini adalah versi pertama yang membawa fitur berikut

- Dukungan Login dan Register
- Penjelajah Paket Soal dan Soal
- Menjalankan permainan
- Dukungan administrasi paket soal dan soal
