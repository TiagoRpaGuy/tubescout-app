# PLAN-tubescout-phase2

> Phase 2: Administrative Control & Monetization Infrastructure

**Goal**: Implement the Admin Dashboard for user management and prepare the Stripe payments integration.
**Context**: Rebranding to "TubeScout" is complete. Landing Page is live at `/`. App Dashboard is at `/app`.
**Agent**: `backend-specialist` (for DB/API) + `frontend-specialist` (for Dashboard UI).

---

## 1. Context Check

- **Current State**:
  - Auth is working (Google).
  - Routes are separated (`/app` vs `/`).
  - Landing page has pricing UI but no backend.
- **Missing**:
  - `admin` role in database.
  - `tiagotureck01@gmail.com` privileges.
  - Stripe products/prices in backend.

---

## 2. Implementation Plan

### Phase 2.1: Admin Access (Security First)

> Priority: Critical. Establish control before scaling.

1.  **Database Schema Update**
    - [ ] Create `roles` enum (user, admin).
    - [ ] Add `role` column to `public.user_settings` table (default: 'user').
    - [ ] Create RLS Policy: "Admins can view all data".
    - [ ] Run migration script.

2.  **Middleware Protection**
    - [ ] Update `proxy.ts`.
    - [ ] Add check: `if (path.startsWith('/admin') && user.role !== 'admin') redirect('/app')`.

3.  **Seed Admin User**
    - [ ] SQL Script to set `tiagotureck01@gmail.com` as 'admin'.

### Phase 2.2: Admin Dashboard UI

> Priority: High. Visibility into system usage.

1.  **Route Setup**: `src/app/admin/page.tsx`.
2.  **Dashboard Components**:
    - [ ] **Stats Cards**: Total Users, Total Searches, Active Subs (Mock).
    - [ ] **User List**: Table with Email, Role, Created At, Last Login.
    - [ ] **System Health**: API Quota usage (YouTube Data API).

### Phase 2.3: Stripe Integration (Preparation)

> Priority: Medium. Ready for "Flip the Switch".

1.  **Stripe Config**:
    - [ ] `src/lib/stripe/config.ts` (API Keys, Webhook Secrets).
    - [ ] `src/lib/stripe/server.ts` (Stripe SDK instance).
2.  **Checkout Endpoint**:
    - [ ] `src/app/api/stripe/checkout/route.ts` (POST).
    - [ ] Receives `priceId`, creates Session, returns URL.
3.  **Webhook Handler**:
    - [ ] `src/app/api/stripe/webhook/route.ts`.
    - [ ] Listen for `checkout.session.completed` -> Update User Plan in DB.

---

## 3. Verification Plan

### Automated

- [ ] Test RLS: Can normal user see admin data? (Should fail).
- [ ] Test Middleware: Can normal user access `/admin`? (Should redirect).

### Manual (Walkthrough)

1. Login as `tiagotureck01@gmail.com`.
2. Access `/admin`.
3. Verify list of users.
4. Login as test user -> Verify 403/Redirect on `/admin`.

---

## 4. Agent Assignments

- **backend-specialist**: DB Schema, RLS, Stripe API routes.
- **frontend-specialist**: Admin UI, Dashboard components.
- **security-auditor**: Verify RLS and Middleware logic.
