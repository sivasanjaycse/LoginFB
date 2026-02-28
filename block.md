# System Architecture (White Theme)

This diagram outlines the flow between the React frontend, Node backend, and the integration of Firebase and Supabase services.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#ffffff', 'primaryTextColor': '#000000', 'primaryBorderColor': '#333333', 'lineColor': '#444444', 'secondaryColor': '#f9f9f9', 'tertiaryColor': '#ffffff'}}}%%
graph LR
    subgraph Frontend [ ]
        A[React Client]
    end

    subgraph Auth [ ]
        B[Firebase Auth]
    end

    subgraph Backend [ ]
        C[Express / Node.js]
    end

    subgraph Database [ ]
        D[Supabase / Postgres]
    end

    %% Interactions
    A -.->|1. Authenticate| B
    B -.->|2. JWT Token| A
    A ==>|3. API Request + JWT| C
    C -.->|4. Verify Token| B
    C ==>|5. Query| D
    D ==>|6. Data| C
    C ==>|7. Response| A

    %% White Theme Styling
    style A fill:#ffffff,stroke:#000,stroke-width:2px
    style B fill:#ffffff,stroke:#000,stroke-width:2px,stroke-dasharray: 5 5
    style C fill:#ffffff,stroke:#000,stroke-width:2px
    style D fill:#ffffff,stroke:#000,stroke-width:2px
