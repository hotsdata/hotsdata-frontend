# Frontend Route Matrix

| Route                   | Auth | Data                                   | Empty state               | Error state                 | Acceptance                                                     |
| ----------------------- | ---- | -------------------------------------- | ------------------------- | --------------------------- | -------------------------------------------------------------- |
| `#/`                    | No   | Static                                 | Not applicable            | Not applicable              | Shows HotsData purpose and primary workflows.                  |
| `#/signin`              | No   | `POST /login`                          | Not applicable            | Inline sign-in failure      | Can authenticate and route to replays.                         |
| `#/register`            | No   | `POST /register`                       | Not applicable            | Inline registration failure | Can create an account and route to replays.                    |
| `#/replays`             | Yes  | `GET /list`                            | Table empty message       | Alert panel                 | Filters by hero/map and match type.                            |
| `#/replays/:replayId`   | No   | `GET /replays/:id`                     | Loading panel             | Alert panel                 | Shows teams, duration, stats, talents, and team tabs.          |
| `#/profile`             | Yes  | `GET /player/heroes`                   | Table empty message       | Alert panel                 | Shows tracked heroes and profile summary cards.                |
| `#/profile/:toonhandle` | No   | `GET /player/heroes?toonhandle=`       | Table empty message       | Alert panel                 | Shows public player hero stats.                                |
| `#/players/compare`     | No   | `GET /player/search`, `GET /hero_info` | No players selected panel | Alert panel                 | Adds/removes players and compares selected hero stats.         |
| `#/upload`              | No   | `POST /upload`                         | No files queued panel     | Per-row failed status       | Queues files and updates upload status without mutating state. |
| `#/user-settings`       | Yes  | `GET /user`, `PUT /user`               | Form with defaults        | Inline panel                | Updates profile and password fields.                           |
