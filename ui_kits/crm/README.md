# SPUNK CRM — UI Kit

A high-fidelity, interactive React prototype of the SPUNK CRM dashboard. Built with bright/light theme, DM Sans typography, and purple accent (#7C6AF7).

## Screens

| Page | Description |
|------|-------------|
| Dashboard | Stat cards, revenue chart, orders-by-source donut, recent orders table, live activity feed |
| Orders | Filterable/searchable orders table, side-panel order detail drawer |
| Customers | Customer list with VIP/Regular/New filters, side-panel customer profile |
| DM Conversations | Two-pane chat UI — conversation list + live message thread with send |

## Components

| File | Exports |
|------|---------|
| `Icons.jsx` | All Lucide-style icons via `window.Icons` |
| `Components.jsx` | `C.Button`, `C.Badge`, `C.StatCard`, `C.Card`, `C.PageWrapper`, `C.Avatar` |
| `Sidebar.jsx` | `CRMSidebar` — full nav sidebar with collapse |
| `Topbar.jsx` | `CRMTopbar` — search, notifications, avatar dropdown |
| `Dashboard.jsx` | `DashboardPage` — full dashboard with SVG charts |
| `Orders.jsx` | `OrdersPage` + `OrderDetail` drawer |
| `Customers.jsx` | `CustomersPage` + `CustomerDetail` drawer |
| `Conversations.jsx` | `ConversationsPage` — full chat prototype |
| `App.jsx` | Root app + router, mounts to `#root` |

## Usage

Open `index.html` in a browser. All JSX is Babel-transpiled in-browser.

## Source

Rebuilt from: https://github.com/nomaanibrahim0336-ctrl/CRM- (branch: claude/nice-volta-6g81M)
