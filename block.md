# System Architecture Overview

This document outlines the technical architecture for the application, highlighting the interaction between the React frontend, Node.js backend, and the external services for Auth and Data.

## Architecture Diagram

```mermaid
graph LR
    subgraph Frontend
        A[Client: React]
    end

    subgraph "Auth Service"
        B[Firebase: Auth/JWT]
    end

    subgraph "Backend Layer"
        C[Backend: Express/Node]
    end

    subgraph "Database Layer"
        D[Supabase: PostgreSQL]
    end

    %% Flow Definitions
    A -- "1. Login / Auth Request" --> B
    B -- "2. Returns JWT" --> A
    A -- "3. API Request + JWT" --> C
    C -- "4. Verify Token" --> B
    C -- "5. Data Query" --> D
    D -- "6. Query Result" --> C
    C -- "7. Response" --> A

    %% Styling
    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#FFCA28,stroke:#333,stroke-width:2px,color:#000
    style C fill:#339933,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#3ECF8E,stroke:#333,stroke-width:2px,color:#fff
```
