# PLAN-visual-overhaul

> Visual Overhaul Strategy: TubeMine Aesthetic for TubeScout

**Goal**: Realign the system's visual identity to match the provided references (TubeMine), focusing on a Red/YouTube-aligned palette, a specific login layout, and dynamic visual effects.

---

## 1. Visual Identity (Theme & Colors)

### Analysis

The reference images show a "Cyber/Dark" aesthetic with vibrant gradients.

- **Primary Gradient**: Linear Gradient (Red `#FF4D4D` to Orange `#F9CB28`) or similar.
- **Background**: Deep Void (`#0A0A0A` or `#050505`) with ambient red glows.
- **Cards**: Glassmorphism or solid dark grey (`#121212`) with subtle borders.

### Implementation Strategy (`globals.css`)

- [ ] **Override Radius**: Use larger border-radius (`rounded-xl` or `rounded-2xl`).
- [ ] **New Palette**:
  - `--primary`: `0 85% 65%` (Vibrant Red).
  - `--primary-foreground`: `0 0% 100%` (White).
  - `--background`: `0 0% 4%` (Almost Black).
  - `--card`: `0 0% 7%` (Dark Grey).
- [ ] **Utility Classes**:
  - `.bg-primary-gradient`: `bg-gradient-to-r from-red-500 to-orange-500`.
  - `.text-gradient`: `bg-clip-text text-transparent bg-gradient...`.

---

## 2. Login Screen Upgrade

### Design Specs (from Image)

- **Container**: Centered Card with glow behind it.
- **Tabs**: "Entrar" vs "Cadastrar" (Toggle at top of card).
- **Social**: "Continuar com Google" at the bottom.
- **Visuals**:
  - Logo centered above card.
  - Inputs with dark background.
  - Primary Action Button (Full width, Gradient).

### Implementation (`src/app/login/page.tsx`)

1.  **Layout**: Flex/Grid centered.
2.  **Toggle Component**: State `isLogin` vs `isRegister`.
3.  **Background**: Add a blurry red blob (`bg-red-500/20 blur-[100px]`) behind the card.

---

## 3. Mouse Trail Effect (Cursor)

### requirement

"Rastro acompanhando o ponteiro."

### Solution: `MouseGradient` Component

A global component in `layout.tsx` that tracks mouse coordinates (`x`, `y`) and renders a radial gradient spotlight that follows the cursor.

- **Tech**: React `useEffect` + CSS Variables masking or Framer Motion.
- **Performance**: Use `requestAnimationFrame` or CSS custom properties to avoid re-renders.

```tsx
// Concept
<div
  style={{
    background: `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
  }}
/>
```

---

## 4. Circular Elements & Social Proof

### A. Brand Element (Logo)

- **Location**: Top Center of Landing & Login.
- **Design**: Icon inside a square/circle container with a gradient border or glow.
- **Action**: Update `Header` and `Hero`.

### B. Social Proof (+500 Criadores)

- **Location**: Below CTA button in Hero.
- **Component**: `AvatarGroup`.
  - Stack of 4-5 avatars (overlapping).
  - Text label: "+500 criadores usando".
- **Implementation**:
  - Create `src/components/ui/avatar-group.tsx`.
  - Use generic avatar placeholder images.

---

## 5. Execution Steps

1.  **Theme Config**: Update `globals.css` and `tailwind.config.ts` (if needed for custom animations).
2.  **UI Components**:
    - Create `MouseSpotlight`.
    - Create `AvatarGroup`.
3.  **Page Refactors**:
    - Rewrite `login/page.tsx` (Match Image 1).
    - Update `page.tsx` (Landing Hero) to match Image 2 (Headline + Avatar Group).
4.  **Global Polish**: Apply red gradient buttons across the app.

---

## 6. Verification

- Does the login match the screenshot?
- Does the mouse trail feel smooth?
- Is the red theme consistent?
