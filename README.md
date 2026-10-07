# 📰 BanglaNews24

**BanglaNews24** is a modern, responsive full-stack news platform built with **Next.js, TypeScript, Tailwind CSS, MongoDB, and Better Auth**.

Users can browse the latest news, explore categories, read detailed articles, create an account, verify their email, reset their password, sign in with social providers, and manage their profile.

---

## ✨ Features

* 📰 Browse latest news
* 🗂️ Category-based news browsing
* 📖 Read detailed news articles
* 🔍 News search
* 🔐 Secure user authentication
* 📧 Email verification
* 🔑 Forgot & reset password
* 🔵 Google authentication
* ⚫ GitHub authentication
* 👤 User profile management
* ✏️ Update profile name
* 🖼️ Display user profile image
* 🛡️ Protected routes
* 🚫 Custom 404 / Not Found page
* ⏳ Loading skeletons
* 🔔 Toast notifications
* 📱 Fully responsive design
* 🎨 Modern UI with Tailwind CSS

---

## 🛠️ Technologies Used

| Technology                     | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| **Next.js**                    | Frontend & full-stack framework            |
| **React**                      | User interface                             |
| **TypeScript**                 | Type-safe development                      |
| **Tailwind CSS**               | Styling & responsive design                |
| **MongoDB**                    | Database                                   |
| **Better Auth**                | Authentication & session management        |
| **Resend**                     | Email verification & password reset emails |
| **Lucide React / React Icons** | Icons                                      |

---

## 🔐 Authentication

BanglaNews24 uses **Better Auth** for authentication.

### Supported Authentication Methods

* Email & Password
* Google OAuth
* GitHub OAuth

### Account Security

* Email verification
* Password reset
* Protected profile page
* Protected news details page
* Session-based authentication

---

## 📧 Email Features

The application uses **Resend** to send transactional emails.

Currently supported:

* ✉️ Email verification
* 🔑 Password reset

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── news/
│   │   ├── [newsId]/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── profile/
│   │   └── page.tsx
│   │
│   ├── signin/
│   │   └── page.tsx
│   │
│   ├── signup/
│   │   └── page.tsx
│   │
│   ├── forgot-password/
│   │   └── page.tsx
│   │
│   ├── reset-password/
│   │   └── page.tsx
│   │
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── email-templates/
│
└── proxy.ts
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/banglanews24.git
```

### 2. Go to the Project Directory

```bash
cd banglanews24
```

### 3. Install Dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm ins
```
