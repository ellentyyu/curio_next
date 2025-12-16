# Curio

Curio is a full-stack e-commerce prototype built with Next.js App Router.  
It focuses on real-world concerns such as authentication, cart persistence, server/client boundaries, and order workflows, and is deployed as a production-ready application.

🔗 Live demo: https://curio-next-gilt.vercel.app/product

---

## Overview

Curio implements a complete shopping flow, from product browsing to checkout and order creation.  
The project emphasizes data ownership, predictable state synchronization, and clear separation between server and client responsibilities.

Key aspects include:

- Authentication with JWT
- Guest cart to authenticated cart merging
- Persistent cart synchronization
- Snapshot-based order data

---

## Tech Stack

- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **State Management**: Zustand
- **Backend**: Next.js Route Handlers, Server Actions
- **Database**: MongoDB (Mongoose)
- **Deployment**: Vercel

---

## Implementation Notes

- Uses Server and Client Components to clearly separate data fetching and interaction logic
- Cart state is managed client-side and synchronized to the server when authenticated
- Orders store a snapshot of purchased items to ensure historical accuracy
- URL-driven filters are used to keep UI state shareable and navigable

---

## Status

Curio is a deployed prototype used to explore full-stack architecture and real-world data flow patterns.
