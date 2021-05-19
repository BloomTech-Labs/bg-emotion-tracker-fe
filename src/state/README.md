## Roles and Hierarchy

## Test Accounts

llama001@maildrop.cc -> ADMIN
llama002@maildrop.cc -> YDP
llama003@maildrop.cc -> CD

## Rules

- Users have access only to the pages that are on their navbar or links from pages from the pages derived from navbar.
- Users cannot manually type in a url to reach a page, this causes a refresh in the browser which will wipe out the global state(ie. context api), the user will be redirected to the 'UnAuthorized Page' if this happens

#### Resource Access

| Role          | code  | AdminDashboard | ClubDirectorDashboard | YDPDashboard |
| ------------- | ----- | -------------- | --------------------- | ------------ |
| Admin         | ADMIN | x              |                       |              |
| Club Director | CD    |                | x                     |              |
| YDP           | YDP   |                |                       | x            |

| Role          | code  | HomePage | manage-members | manage-programs | manage-staff | manage-clubs |
| ------------- | ----- | -------- | -------------- | --------------- | ------------ | ------------ |
| Admin         | ADMIN | x        | x              | x               | x            | x            |
| Club Director | CD    | x        | x              | x               | x            | x            |
| YDP           | YDP   | x        |                |                 |              |              |

| Role          | code  | activity-select | scanner | emoji-selectcheck | emoji-confirm-redirect |
| ------------- | ----- | --------------- | ------- | ----------------- | ---------------------- |
| Admin         | ADMIN |                 |         |                   |                        |
| Club Director | CD    |                 |         |                   |                        |
| YDP           | YDP   | x               | x       | x                 | x                      |
