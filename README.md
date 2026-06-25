# 476Finance

A full-stack finance platform combining live market data, an investing watchlist, and a suite of Canadian personal-finance tools — built with React/TypeScript on the frontend and Flask/MongoDB on the backend.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white&labelColor=20232a)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?logo=flask&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

## Overview

476Finance started as a project for CS476 at the University of Regina and grew into a fairly complete finance app: a market dashboard with live quotes, news, and screeners; per-user watchlists and authentication backed by MongoDB; a small community forum; and a set of Canadian-focused personal-finance calculators, including a multi-step quiz that recommends real credit cards from major Canadian issuers based on the user's spending habits and preferences.

## Features

**Market data & research**
- Live stock quotes via `yfinance`
- Symbol search powered by the Finnhub API
- Top gainers, top losers, and most-active stocks via Financial Modeling Prep (FMP)
- A multi-parameter stock screener (market cap, price, beta, volume, dividend yield, sector, industry, exchange, ETF/fund filters, etc.)
- Individual ticker pages with historical price charts (Chart.js) and company-specific news
- Cryptocurrency listings
- A general finance & business news feed

**Accounts & portfolio**
- Registration and login with bcrypt-hashed passwords and server-side sessions (Flask-Session)
- Personal watchlists — add, remove, and check symbols — persisted per user in MongoDB

**Community**
- A forum where users can create, read, and delete posts
- A general message board

**Personal finance toolkit (Canada-focused)**
- A mortgage affordability calculator using GDS/TDS-style debt-ratio logic, with province-specific defaults
- A personal loans reference page
- A taxes reference page
- A guided credit card recommendation engine — a short quiz (personal vs. business use → preferred benefit → annual fee tolerance) that surfaces matching cards across categories such as best overall, travel, cash back, sign-up offers, rewards, balance transfer, and home improvement, drawing from major Canadian issuers (RBC, TD, CIBC, Scotiabank, BMO, Amex, Tangerine, Neo Financial, EQ Bank, and more)

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, React Router, Chart.js / react-chartjs-2, Axios, react-cookie |
| Backend | Flask, Flask-PyMongo, Flask-Bcrypt, Flask-Session, Flask-CORS, yfinance, pandas |
| Database | MongoDB |
| External APIs | Finnhub, Financial Modeling Prep, Yahoo Finance |

## Architecture

The React app is a single-page application that talks to a Flask REST API over Axios (proxied to `localhost:8000` in development). The backend is organized as a single Flask app instance shared across several route modules:

- `main.py` — app entrypoint and market-data routes (quotes, search, gainers/losers, screener, graphs, crypto)
- `manage_users.py` — registration, login, logout
- `user_data.py` — watchlists and the general message board
- `forum_post.py` — forum CRUD
- `news.py` — the news feed

Data is stored in MongoDB across `users`, `watchlist`, `forumposts`, and `messages` collections.

## Getting started

### Prerequisites
- Node.js & npm
- Python 3.9+
- A MongoDB instance (local or Atlas)
- API keys for [Finnhub](https://finnhub.io/) and [Financial Modeling Prep](https://site.financialmodelingprep.com/)

### Installation

```bash
git clone https://github.com/verma25s/476finance.git
cd 476finance
npm run install-all
```

This installs the frontend dependencies and the backend dependencies (`api/requirements.txt`) in one step.

### Environment variables

Create a `.env` file inside `api/`:

```env
FLASK_APP=main.py
secret_key=<your Flask session secret key>
FINNHUB_API_KEY=<your Finnhub API key>
FMP_API_KEY=<your Financial Modeling Prep API key>
MONGODB_URI=<your MongoDB connection string>
```

### Running locally

```bash
# Windows
npm run run-all:windows

# macOS / Linux
npm run run-all:unix
```

This starts the Flask API on port `8000` and the React dev server concurrently.

## Project structure

```
476finance/
├─ api/
│  ├─ main.py            # Flask entrypoint + market data routes
│  ├─ manage_users.py    # Auth: register / login / logout
│  ├─ user_data.py       # Watchlist + messages
│  ├─ forum_post.py      # Forum CRUD
│  └─ news.py            # News feed
├─ src/
│  ├─ pages/             # Route-level views (market, personalFinance, forum, etc.)
│  └─ components/        # Shared UI, including the card recommendation engine
└─ package.json          # Scripts to install/run frontend + backend together
```

## Possible next steps

- Add automated tests for the API routes and key React components
- Move from filesystem-based Flask sessions to a token-based auth flow
- Containerize the app for easier deployment
- Deploy a hosted demo (currently local-only)

## Acknowledgments

Originally built for CS476 (University of Regina). Market data courtesy of Finnhub, Financial Modeling Prep, and Yahoo Finance.
