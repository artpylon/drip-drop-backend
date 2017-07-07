# DripDrop File System
DripDrop is a dropbox-like file storing application for ad agencies and marketing departments who need to review creative content before giving the OK to put it out into the world. Users can upload files, download files, and tag them to show whether they are new, being reviewed, or complete.


# DripDrop File Routes

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| DELETE | `/sign-out/:id`        | `users#signout`   |


### Users

| Verb | URI Pattern   | Controller#Action |
|------|---------------|-------------------|
| GET  | `/users`      | `users#index`     |
| GET  | `/users/:id`  | `users#show`      |


### Files

| Verb   | URI Pattern     | Controller#Action |
|--------|-----------------|-------------------|
| GET    | `/files`        | `files#index`     |
| GET    | `/files/:id`    | `files#show`      |
| POST   | `/files`        | `files#create`    |
| PATCH  | `/files/:id`    | `files#update`    |
| DELETE | `/files/:id`    | `files#destroy`   |


*IMPORTANT LINKS*
Deployed Back-End App:
https://murmuring-plains-65734.herokuapp.com
Backend Repo:
https://github.com/the-best-org-lab/drip-drop-backend
Deployed Front-End App:
https://the-best-org-lab.github.io/drip-drop-frontend/
