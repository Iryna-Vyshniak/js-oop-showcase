# JavaScript OOP Showcase

> **Technical implementation of Object-Oriented Programming concepts in modern Vanilla JavaScript.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript\&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5\&logoColor=fff)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?logo=css3\&logoColor=fff)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-No%20Frameworks-F7DF1E?logo=javascript\&logoColor=000)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**[Live Demo](https://iryna-vyshniak.github.io/js-oop-showcase/)** · **[Source Code](https://github.com/Iryna-Vyshniak/js-oop-showcase)**

---

## Overview

**JS OOP Showcase** is a focused frontend project demonstrating how fundamental **Object-Oriented Programming principles** can be implemented using modern JavaScript without frameworks or external libraries.

The project transforms classic OOP exercises into an interactive browser-based demonstration.

It covers:

* **Classes**
* **Constructors**
* **Encapsulation**
* **Getters and setters**
* **Inheritance**
* **Method overriding / specialization**
* **State management**
* **Dynamic DOM rendering**
* **Input validation**
* **HTML escaping**
* **CSS Custom Properties**
* **Semantic HTML**
* **Responsive UI**
* **Accessible interactive components**

The repository is intentionally framework-free so that the underlying JavaScript architecture remains explicit and easy to inspect.

---

## 🎯 Project Goals

The primary goal is to demonstrate that JavaScript OOP concepts can be applied to practical UI logic rather than isolated theoretical examples.

### The project demonstrates

| Concept                | Implementation                              |
| ---------------------- | ------------------------------------------- |
| **Class**              | `Circle`, `Marker`, `Employee`, `EmpTable`  |
| **Encapsulation**      | Internal object state and controlled access |
| **Getter / Setter**    | `Circle.radius`                             |
| **Inheritance**        | `RefillableMarker extends Marker`           |
| **Constructor**        | Initialization of object state              |
| **Methods**            | Domain-specific object behavior             |
| **State mutation**     | Marker ink consumption and refilling        |
| **DOM manipulation**   | Dynamic UI updates                          |
| **Data rendering**     | Employee table generation                   |
| **Input sanitization** | HTML escaping before rendering              |
| **CSS variables**      | Dynamic marker color                        |
| **Responsive design**  | CSS Grid and responsive table container     |

---

# 🧩 OOP Architecture

The application is organized around independent classes with clearly defined responsibilities.

```text
                    ┌─────────────────────┐
                    │       Circle        │
                    ├─────────────────────┤
                    │ radius              │
                    │ diameter            │
                    │ calculateArea()     │
                    │ calculateCircumference()
                    └─────────────────────┘


                    ┌─────────────────────┐
                    │       Marker        │
                    ├─────────────────────┤
                    │ color               │
                    │ inkPercent          │
                    │ write()             │
                    │ _escapeHtml()       │
                    └──────────┬──────────┘
                               │
                         extends
                               ▼
                    ┌─────────────────────┐
                    │ RefillableMarker    │
                    ├─────────────────────┤
                    │ refill()            │
                    └─────────────────────┘


                    ┌─────────────────────┐
                    │      Employee       │
                    ├─────────────────────┤
                    │ id                  │
                    │ firstName           │
                    │ lastName            │
                    │ position            │
                    │ department          │
                    └──────────┬──────────┘
                               │
                         consumed by
                               ▼
                    ┌─────────────────────┐
                    │      EmpTable       │
                    ├─────────────────────┤
                    │ employees           │
                    │ getHtml()           │
                    └─────────────────────┘
```

---

# 1. Circle Class

The `Circle` class encapsulates geometric calculations based on a single state value: `radius`.

### Responsibilities

* Store the circle radius
* Validate radius values
* Calculate diameter
* Calculate area
* Calculate circumference

### API

```js
class Circle {
    constructor(radius)

    get radius()
    set radius(value)

    get diameter()

    calculateArea()
    calculateCircumference()
}
```

### Mathematical model

**Diameter**

```text
D = 2r
```

**Area**

```text
A = πr²
```

**Circumference**

```text
C = 2πr
```

The UI recalculates all derived values whenever the radius input changes.

### Example

```js
const circle = new Circle(50);

circle.radius;
circle.diameter;
circle.calculateArea();
circle.calculateCircumference();
```

The setter also prevents invalid negative radius values by normalizing them to `0`.

---

# 2. Marker Class

The `Marker` class demonstrates **stateful object behavior**.

A marker contains:

* a color
* an ink level
* a method for writing text

Every non-whitespace character consumes `0.5%` of the available ink.

### API

```js
class Marker {
    constructor(color, inkPercent)

    write(text)

    _escapeHtml(unsafe)
}
```

### State transition

```text
Initial state
    │
    ▼
100% ink
    │
    │ write()
    ▼
Ink decreases
    │
    ├── text continues while ink >= 0.5%
    │
    └── writing stops when ink is exhausted
```

The implementation also preserves whitespace while only consuming ink for non-whitespace characters.

---

# 3. Inheritance: RefillableMarker

`RefillableMarker` extends the base `Marker` class.

```js
class RefillableMarker extends Marker {
    constructor(color, inkPercent) {
        super(color, inkPercent);
    }

    refill(amount = 100) {
        this.inkPercent = Math.min(
            100,
            this.inkPercent + amount
        );
    }
}
```

### Inheritance relationship

```text
Marker
   │
   └── RefillableMarker
           │
           └── refill()
```

This demonstrates how a specialized class can reuse the behavior of a parent class while adding domain-specific functionality.

### Example

```js
const marker = new RefillableMarker('#2563eb', 100);

marker.write('Hello World');

marker.refill();
```

The refill operation is capped at `100%`, preventing the object's state from exceeding its defined boundary.

---

# 4. Employee Class

The `Employee` class represents structured employee data.

```js
class Employee {
    constructor(
        id,
        firstName,
        lastName,
        position,
        department
    )
}
```

Each employee contains:

```text
id
firstName
lastName
position
department
```

Example dataset:

```js
const employees = [
    new Employee(
        101,
        'Alexander',
        'Smith',
        'Manager',
        'Lending'
    ),
    new Employee(
        102,
        'Maria',
        'Johnson',
        'Cashier',
        'Customer Service'
    )
];
```

This separates **data modeling** from **presentation logic**.

---

# 5. EmpTable Class

`EmpTable` is responsible for transforming an array of `Employee` objects into an HTML table.

```js
class EmpTable {
    constructor(employeeArray)

    getHtml()
}
```

### Rendering pipeline

```text
Employee[]
     │
     ▼
EmpTable
     │
     ▼
getHtml()
     │
     ▼
HTML Table
     │
     ▼
DOM
```

The generated table contains:

* ID
* First Name
* Last Name
* Position
* Department

The renderer also escapes employee data before inserting it into HTML.

---

# 🔐 Input Sanitization

Dynamic content is escaped before being inserted into the DOM.

The project uses explicit HTML escaping for characters such as:

```text
&
<
>
"
'
```

This is particularly important when using:

```js
element.innerHTML
```

The same defensive approach is applied to both marker output and employee table data.

---

# 🎨 UI Architecture

The interface is built with semantic HTML and modern CSS.

### Main structure

```text
<body>
 ├── Header
 │    ├── Project title
 │    └── Description
 │
 └── Main
      ├── Circle Section
      │    ├── Radius input
      │    └── Calculated statistics
      │
      ├── Marker Section
      │    ├── Color picker
      │    ├── Ink progress
      │    ├── Text input
      │    ├── Write button
      │    ├── Refill button
      │    └── Output
      │
      └── Employee Section
           └── Dynamic table
```

---

# 🌓 Adaptive Color Scheme

The interface supports both light and dark environments using:

```css
@media (prefers-color-scheme: dark)
```

The color system is implemented with CSS Custom Properties.

```css
:root {
    --clr-bg: #f8fafc;
    --clr-surface: #ffffff;
    --clr-text-main: #0f172a;
    --clr-primary: #2563eb;
}
```

Dark-mode values are automatically applied when the operating system requests a dark color scheme.

---

# 📐 Responsive Design

The layout uses modern CSS primitives rather than a UI framework.

### Techniques

* CSS Grid
* Flexbox
* CSS Custom Properties
* Fluid typography
* Fluid spacing
* Responsive containers
* Horizontal table scrolling

The statistics section uses:

```css
grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));
```

This allows the cards to adapt naturally to the available viewport width.

---

# ♿ Accessibility

Accessibility is considered at the markup and interaction levels.

### Implemented features

* Semantic HTML5 elements
* Explicit `<label>` associations
* `aria-labelledby`
* `aria-describedby`
* `aria-live`
* Accessible progress indicator
* Accessible table headers
* `scope="col"`
* Visible keyboard focus states
* `<noscript>` fallback message
* Responsive table container

Keyboard focus is visually emphasized through:

```css
*:focus-visible {
    outline: 3px solid var(--clr-primary);
    outline-offset: 2px;
}
```

---

# 📱 Responsive Table

The employee table is wrapped in a horizontally scrollable container:

```css
.table-responsive {
    overflow-x: auto;
}
```

This prevents wide tabular content from breaking the mobile layout.

---

# 🛠️ Technology Stack

### Core

* **HTML5**
* **CSS3**
* **JavaScript ES6+**

### JavaScript

* Classes
* Constructors
* Getters
* Setters
* Inheritance
* DOM API
* ES Modules
* Template literals
* Event listeners
* Array iteration

### CSS

* CSS Custom Properties
* CSS Grid
* Flexbox
* `clamp()`
* Responsive design
* System color-scheme detection
* Native form controls

### No dependencies

This project intentionally does **not** use:

* React
* Vue
* Angular
* TypeScript
* jQuery
* Bootstrap
* Tailwind CSS
* External UI libraries

The goal is to demonstrate the underlying JavaScript and browser APIs directly.

---

# 📁 Project Structure

```text
js-oop-showcase/
│
├── index.html       # Semantic application structure
├── script.js        # OOP classes and application logic
├── style.css        # Responsive UI and design system
└── README.md        # Project documentation
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Iryna-Vyshniak/js-oop-showcase.git
```

## Navigate to the project

```bash
cd js-oop-showcase
```

## Run locally

Because the project uses a native JavaScript module:

```html
<script type="module" src="script.js"></script>
```

it is recommended to serve it through a local development server.

For example, with VS Code, use **Live Server** or another static HTTP server.

Alternatively:

```bash
npx serve .
```

Then open the local URL provided by the server.

---

# 🌐 Live Demo

**[Open JS OOP Architecture →](https://iryna-vyshniak.github.io/js-oop-showcase/)**

The GitHub repository is configured as a static frontend project with a GitHub Pages deployment.

---

# 🧪 Interactive Demonstrations

## Circle

Change the radius and observe:

```text
Radius
   ↓
Diameter
   ↓
Area
   ↓
Circumference
```

All values are recalculated from the same `Circle` instance.

---

## Marker

1. Select a marker color.
2. Enter text.
3. Click **Write Text**.
4. Observe the ink percentage decrease.
5. Continue writing until the marker runs out of ink.
6. Click **Refill Marker** to restore the ink level.

This demonstrates an object whose internal state changes as methods are executed.

---

## Employee Table

The employee dataset is represented by `Employee` objects.

`EmpTable` then converts the collection into semantic HTML.

This demonstrates separation between:

```text
Data Model
     ↓
Presentation Logic
     ↓
DOM
```

---

# 🧠 Key Learning Outcomes

This project provides a practical demonstration of several important JavaScript concepts.

### Object-oriented modeling

Objects encapsulate both **state** and **behavior**.

### Encapsulation

The `Circle` class exposes controlled access to its radius through a getter/setter pair.

### Inheritance

`RefillableMarker` specializes `Marker` without duplicating its core writing logic.

### Separation of concerns

Classes model application concepts while DOM code connects those models to the interface.

### Defensive rendering

Dynamic values are escaped before being inserted into HTML.

### Progressive enhancement

The application remains a lightweight static frontend and provides a `<noscript>` message when JavaScript is unavailable.

---

# 📊 Architecture Summary

| Layer                | Responsibility                          |
| -------------------- | --------------------------------------- |
| **HTML**             | Semantic document structure             |
| **CSS**              | Layout, visual system, responsiveness   |
| **Circle**           | Geometry domain model                   |
| **Marker**           | Writing and ink state                   |
| **RefillableMarker** | Marker specialization                   |
| **Employee**         | Employee data model                     |
| **EmpTable**         | Employee presentation                   |
| **DOM handlers**     | User interaction and UI synchronization |

---

# 🔍 Why Vanilla JavaScript?

The absence of a framework is intentional.

For an OOP learning showcase, using a framework would introduce abstractions that could obscure the actual JavaScript architecture.

This implementation keeps the focus on:

```text
JavaScript
    ↓
Classes
    ↓
Objects
    ↓
State
    ↓
Methods
    ↓
DOM
```

The result is a compact example of how object-oriented JavaScript can be applied to real browser interactions.

---

# 📌 Project Status

**Status:** Completed / Educational Showcase

The project is intentionally small and focused. Its purpose is to demonstrate fundamental JavaScript OOP architecture rather than provide a production application.

---

# 👩‍💻 Author

**Iryna Vyshniak**

Frontend Developer

**GitHub:** [Iryna-Vyshniak](https://github.com/Iryna-Vyshniak)

---

# 📄 License

This project is available for educational and portfolio purposes.

---

<p align="center">

### ⭐ If you find this project useful, consider giving it a star.
  <strong>JavaScript · OOP · Vanilla JS · HTML5 · CSS3</strong>
</p>

<p align="center">
  Built to demonstrate clean object-oriented JavaScript architecture.
</p>


