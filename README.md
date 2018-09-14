# cnpr-frontend

based on https://github.com/baygen/CNPR_PoC

## Prerequisites

- Node.js + yarn
- SQLite3
- [cnpr-recognition](https://github.com/undead404/cnpr-recognition)

## How to

```bash
git clone "https://github.com/undead404/cnpr-frontend"
cd "cnpr-frontend"
yarn
cat "recognition.sql" | sqlite3 "../recognition.db"
yarn start
```
