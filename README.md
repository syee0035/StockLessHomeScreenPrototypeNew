# StockLess – Home Screen Prototype

> **A user-centred interface prototype for StockLess, a decision-support system designed to help Malaysian micro and small food retailers reduce avoidable food waste through better inventory planning.**

## 🌱 About StockLess

**StockLess** is a decision-support system developed with a focus on **SDG 12.3 – Halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains.**

The system is designed for **micro and small food retailers**, such as neighbourhood grocery stores and minimarts, who may rely on manual processes or rule-of-thumb decisions when purchasing new inventory.

StockLess aims to help retailers:

* Understand historical product demand
* Identify potential overstock and understock risks
* Make more informed purchasing decisions
* Reduce avoidable food waste
* Understand the business and environmental impact of their decisions

This repository contains the **StockLess Home Screen Prototype**, focusing on the user interface and overall visual experience of the StockLess system.

---

## 🎯 Project Objective

The prototype provides a simple and approachable entry point for retailers to navigate the StockLess workflow.

The interface is designed around a clear journey:

**Upload → Analyse → Plan → Impact**

The design aims to reduce complexity for small retailers while making data-driven inventory decisions easier to understand.

---

## ✨ Key Features

### 🏠 Home Screen

A clean landing page introducing StockLess and guiding users towards the main workflow.

### 📤 Upload

Provides an entry point for retailers to upload their sales data before analysis.

### 📊 Analyse

Supports the StockLess analysis workflow, helping users understand demand patterns and data readiness.

### 🛒 Purchase Plan

Helps retailers review purchasing recommendations and identify potential inventory risks.

### 🌱 Impact

Provides a future-facing view of the potential **business and environmental impact** of reducing avoidable food waste.

Potential impact indicators include:

* Food waste reduced
* Carbon emissions reduced
* Energy saved
* Potential cost savings

### 🎨 StockLess Visual Identity

The interface uses a clean, nature-inspired visual language based on:

* Green and mint tones
* Organic shapes
* Leaf motifs
* Fresh produce imagery
* Spacious layouts
* Simple navigation
* Minimal visual clutter

The visual direction reflects StockLess's focus on **food, sustainability and waste reduction**.

---

## 🔄 StockLess User Flow

```text
                    ┌──────────────┐
                    │   Home Page  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Upload    │
                    │   Sales CSV  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Analyse   │
                    │ Demand Data  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Purchase Plan│
                    │ & Risk Review│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Impact    │
                    │ Business +   │
                    │ Environment  │
                    └──────────────┘
```

---

## 🛠️ Technology Stack

This prototype is built using:

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| **React 19**     | User interface development           |
| **TypeScript**   | Type-safe application development    |
| **Vite**         | Development server and build tooling |
| **Tailwind CSS** | Interface styling                    |
| **React Router** | Client-side navigation               |
| **Figma Make**   | Initial interface prototyping        |

---

## 📁 Project Structure

```text
StockLessHomeScreenPrototypeNew/
│
├── .figma/
│   └── make/
│
├── src/
│   └── Application source code
│
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── .gitattributes
├── AGENTS.md
└── CLAUDE.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/syee0035/StockLessHomeScreenPrototypeNew.git
```

### 2. Navigate to the project

```bash
cd StockLessHomeScreenPrototypeNew
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local Vite development server.

---

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🎓 Academic Project

StockLess was developed as part of a **Monash University Malaysia** industry experience project.

The project focuses on applying user-centred design, data analytics and decision-support concepts to a real-world sustainability problem.

### Sustainable Development Goal

**SDG 12 – Responsible Consumption and Production**

Specifically:

> **Target 12.3:** Reduce food loss and waste across the food supply chain.

---

## 👥 Target Users

The primary target users are:

**Malaysian micro and small food retailers**

Examples include:

* Neighbourhood grocery stores
* Small minimarts
* Independent food retailers
* Small businesses managing perishable inventory

The interface is intentionally designed to be straightforward so that users with limited technical or data-analysis experience can interact with the system.

---

## 🧩 Design Approach

The StockLess interface follows several design principles:

### Simplicity

Reduce unnecessary information and present the most important decision points clearly.

### Visualisation

Use charts, indicators and visual summaries to make data easier to interpret.

### Action-oriented Design

Move users from **understanding their data → identifying risk → making a purchase decision**.

### Sustainability

Connect inventory decisions with their wider environmental impact.

### Accessibility

Use clear labels, consistent terminology and visual cues to reduce confusion during the workflow.

---

## 🔮 Future Development

The current repository focuses primarily on the StockLess home-screen experience. Future iterations can integrate the complete StockLess workflow, including:

* Flexible CSV upload and column mapping
* Data quality and readiness checks
* Product-level demand analysis
* Demand forecasting
* Purchase risk assessment
* Scenario planning
* Business impact dashboard
* Environmental impact dashboard
* Food waste and carbon reduction metrics
* Additional retailer-friendly visualisations

---

## 📌 Project Status

**Prototype / Academic Project**

The interface is under active development and may change as usability testing and design iterations continue.

---

## 🌿 StockLess

**Less waste. Better decisions. A more sustainable food retail future.**
