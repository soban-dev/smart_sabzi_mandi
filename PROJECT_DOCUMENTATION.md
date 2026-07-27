# Smart Sabzi Mandi Management System

## Project Documentation

---

## Abstract

The Smart Sabzi Mandi Management System is a web-based application developed to digitize and streamline the daily operations of vegetable markets (Sabzi Mandis) in Pakistan. The system enables market administrators and shopkeepers to manage records of products, suppliers, customers, purchases, sales, inventory, and payments through a single computerized platform.

Most Sabzi Mandis in Pakistan still rely on manual registers, handwritten receipts, and verbal communication for business transactions. This leads to errors in record-keeping, incorrect calculations, stock shortages, and delays in report generation. The proposed system addresses these issues by providing a comprehensive digital solution.

The system consists of two main portals: an **Administrator Dashboard** for full business management and a **Shopkeeper Interface** for daily sales and purchase operations. The application is built using modern web technologies including Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, and Prisma ORM with SQLite for local data storage.

Key features include role-based access control, real-time inventory tracking, automated stock updates on transactions, purchase and sales management with multi-item transactions, printable sales receipts, and comprehensive sales/purchase/profit reporting.

This project demonstrates how modern web technologies can be integrated to create a practical, scalable, and offline-capable solution for vegetable market management.

---

## Table of Contents

**Chapter 1 – Introduction**  
1.1 Background  
1.2 Description  
1.3 Problem Statement  
1.4 Scope  
1.5 Objectives  
1.6 Feasibility  
1.7 Requirements  
  1.7.1 Functional Requirements  
  1.7.2 Non-Functional Requirements  
  1.7.3 Hardware Requirements  
  1.7.4 Software Requirements  
1.8 Stakeholders  

**Chapter 2 – Materials & Methods**  
2.1 Process Model  
2.2 Tools and Technology  
  2.2.1 Frontend Technologies  
  2.2.2 Backend Technologies  
  2.2.3 Database  
  2.2.4 Development Tools  
2.3 System Design  
  2.3.1 Use Case Diagrams  
  2.3.2 Usage Scenarios  
  2.3.3 Class Diagram  
  2.3.4 Data Flow Diagram  
  2.3.5 Entity Relationship Diagram  
  2.3.6 Database Model  
  2.3.7 System Architecture  

**Chapter 3 – Results & Discussion**  
3.1 Testing  
3.2 Test Cases  
3.3 Test Results Summary  
3.4 Conclusion  

**Chapter 4 – User Manual**  
4.1 Login Page  
4.2 Admin Dashboard  
4.3 Shopkeeper Dashboard  
4.4 Product Management  
4.5 Category Management  
4.6 Supplier Management  
4.7 Customer Management  
4.8 Employee Management  
4.9 Purchase Management  
4.10 Sales Management  
4.11 Inventory Management  
4.12 Reports  

---

## Chapter 1 – Introduction

### 1.1 Background

The agriculture sector plays a vital role in Pakistan's economy. Thousands of farmers bring vegetables and fruits to Sabzi Mandis daily, where wholesalers and retailers purchase products for further distribution. These markets function as critical nodes in the agricultural supply chain, yet most still operate using manual methods.

Traditional paper-based systems in Sabzi Mandis lead to several challenges:
- Mistakes in financial record-keeping
- Incorrect manual calculations
- Inability to track stock levels accurately
- Delays in preparing business reports
- Loss of historical transaction data
- Difficulty in calculating profits and losses

The Smart Sabzi Mandi Management System aims to computerize these operations through a modern web application that stores all data locally, making it accessible, accurate, and reliable.

### 1.2 Description

The Smart Sabzi Mandi Management System is a full-stack web application that provides:

- **Product Management**: Maintain a catalog of vegetables, fruits, and herbs with categories, units, and pricing
- **Category Management**: Organize products into logical categories (Vegetables, Fruits, Herbs)
- **Supplier Management**: Track supplier information and purchase history
- **Customer Management**: Maintain customer records and sales history
- **Employee Management**: Manage staff records and salary information
- **Purchase Management**: Record inbound stock from suppliers with automatic inventory updates
- **Sales Management**: Record outbound sales to customers with automatic inventory deduction
- **Inventory Tracking**: Real-time visibility into stock levels with low-stock alerts
- **Reporting**: Generate sales, purchase, and profit reports with date range filtering
- **Receipt Printing**: Print formatted sales receipts for customers

The application operates entirely offline using a local SQLite database, making it suitable for markets with limited internet connectivity.

### 1.3 Problem Statement

Most Sabzi Mandis in Pakistan use manual methods to record purchases, sales, and inventory. These methods consume time and increase the chances of human error. Shopkeepers face difficulties in:

- Tracking current stock levels of perishable goods
- Calculating daily profits accurately
- Maintaining organized customer and supplier records
- Preparing financial reports for decision-making
- Identifying low-stock items before they run out

Due to the absence of a computerized system, business decisions are often based on incomplete or inaccurate information, leading to financial losses and operational inefficiencies.

### 1.4 Scope

The proposed system is designed for small and medium-sized vegetable markets. It provides:

- **Administrator Module**: Complete business management including products, categories, suppliers, customers, employees, and reports
- **Shopkeeper Module**: Daily operations including purchase recording, sales recording, inventory checking, and receipt printing
- **Inventory Control**: Automatic stock updates after every transaction
- **Report Generation**: Daily sales, purchases, stock status, and profit reports

**Out of scope (future versions):**
- Online payment integration
- Home delivery services
- Multi-branch/multi-market support
- Barcode/QR code scanning
- Mobile application

### 1.5 Objectives

The main objectives of this project are:

1. To develop a computerized management system for Sabzi Mandi operations
2. To maintain digital records of vegetables, fruits, and daily market prices
3. To manage supplier and customer information efficiently
4. To record daily purchase and sales transactions with accuracy
5. To monitor inventory automatically in real-time
6. To generate sales, purchase, and profit reports
7. To reduce paperwork and improve business efficiency
8. To provide role-based access for administrators and shopkeepers

### 1.6 Feasibility

**Technical Feasibility**: The system uses well-established web technologies (Next.js, React, TypeScript, SQLite) that are mature, well-documented, and widely supported. The local database approach eliminates the need for server infrastructure.

**Economic Feasibility**: The system is built using open-source technologies with no licensing costs. It runs on standard computer hardware without requiring expensive servers or cloud services.

**Operational Feasibility**: The user interface is designed to be intuitive with familiar data-entry patterns. The system requires minimal training for users who are comfortable with basic computer operations.

### 1.7 Requirements

#### 1.7.1 Functional Requirements

| ID | Requirement | Module |
|---|---|---|
| FR-01 | User shall be able to log in with username and password | Authentication |
| FR-02 | System shall support two user roles: admin and shopkeeper | Authentication |
| FR-03 | Admin shall be able to create, read, update, and delete products | Products |
| FR-04 | Admin shall be able to create, read, update, and delete categories | Categories |
| FR-05 | Admin shall be able to create, read, update, and delete suppliers | Suppliers |
| FR-06 | Admin shall be able to create, read, update, and delete customers | Customers |
| FR-07 | Admin shall be able to create, read, update, and delete employees | Employees |
| FR-08 | User shall be able to record purchases from suppliers | Purchases |
| FR-09 | User shall be able to record sales to customers | Sales |
| FR-10 | System shall automatically update inventory on purchase/sale | Inventory |
| FR-11 | System shall show current stock levels for all products | Inventory |
| FR-12 | User shall be able to print a sales receipt | Sales |
| FR-13 | System shall generate sales reports with date filtering | Reports |
| FR-14 | System shall generate purchase reports with date filtering | Reports |
| FR-15 | System shall calculate and display profit/loss reports | Reports |
| FR-16 | System shall display low stock alerts on dashboard | Dashboard |
| FR-17 | Shopkeeper shall have limited navigation (5 modules only) | Access Control |
| FR-18 | System shall redirect unauthorized page access | Access Control |

#### 1.7.2 Non-Functional Requirements

| ID | Requirement | Category |
|---|---|---|
| NFR-01 | System shall load pages within 2 seconds on modern hardware | Performance |
| NFR-02 | All data shall be stored locally using SQLite database | Storage |
| NFR-03 | Passwords shall be hashed using bcrypt before storage | Security |
| NFR-04 | Sessions shall expire after 24 hours of inactivity | Security |
| NFR-05 | The application shall work without internet connectivity | Reliability |
| NFR-06 | The UI shall be responsive for different screen sizes | Usability |
| NFR-07 | The system shall handle concurrent users on the same machine | Scalability |

#### 1.7.3 Hardware Requirements

| Component | Minimum Requirement |
|---|---|
| Processor | 1.5 GHz dual-core or better |
| RAM | 4 GB |
| Storage | 500 MB free disk space |
| Display | 1024x768 resolution or higher |

#### 1.7.4 Software Requirements

| Software | Version |
|---|---|
| Operating System | Windows 10/11, macOS, or Linux |
| Node.js | 18.x or later |
| npm | 9.x or later |
| Web Browser | Chrome, Firefox, Edge, or Safari (latest 2 versions) |

### 1.8 Stakeholders

- **Market Administrators**: Oversee overall market operations, manage master data, and review reports
- **Shopkeepers**: Conduct daily buying and selling operations, manage stock, and print receipts
- **System Developers**: Maintain and enhance the application
- **End Users**: Staff members who use the system for daily data entry

---

## Chapter 2 – Materials & Methods

### 2.1 Process Model

The project follows an **Agile development methodology** with iterative cycles. The development was organized into the following sprints:

| Sprint | Duration | Deliverables |
|---|---|---|
| Sprint 1 | Week 1-2 | Project setup, database schema, authentication |
| Sprint 2 | Week 3-4 | Core CRUD modules (products, categories, suppliers, customers, employees) |
| Sprint 3 | Week 5-6 | Transaction modules (purchases, sales with items) |
| Sprint 4 | Week 7-8 | Inventory management, reports, dashboard |
| Sprint 5 | Week 9-10 | Role-based access, UI polish, testing, documentation |

### 2.2 Tools and Technology

#### 2.2.1 Frontend Technologies

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.10 | React framework with App Router |
| React | 19.0.0 | UI component library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| Radix UI | Latest | Accessible headless UI primitives |
| Lucide React | 0.454.0 | Icon library |
| class-variance-authority | 0.7.1 | Component variant management |
| tailwind-merge | 2.6.0 | Tailwind class merging |
| tw-animate-css | 1.2.0 | Animation utilities |

#### 2.2.2 Backend Technologies

| Technology | Version | Purpose |
|---|---|---|
| Next.js API Routes | 16.2.10 | RESTful API endpoints |
| Prisma | 6.x | Database ORM |
| bcryptjs | 2.4.3 | Password hashing |

#### 2.2.3 Database

| Technology | Purpose |
|---|---|
| SQLite | Local file-based relational database |
| Prisma Client | Type-safe database queries |

#### 2.2.4 Development Tools

| Tool | Purpose |
|---|---|
| Visual Studio Code | Code editor |
| npm | Package manager |
| Git | Version control |
| Turbopack | Next.js bundler |

### 2.3 System Design

The system follows a **3-Tier Architecture**:

#### Tier 1: Presentation Layer (Frontend)

The frontend consists of Next.js App Router pages and client components:

- **Layout Components**: Root layout (fonts, metadata), Dashboard layout (sidebar, header)
- **UI Components**: shadcn/ui-style components (Button, Card, Dialog, Table, Input, Select, Badge, etc.)
- **Page Components**: One page per module (Dashboard, Products, Categories, Suppliers, Customers, Employees, Purchases, Sales, Inventory, Reports)
- **Login Page**: Centered card with username/password form

#### Tier 2: Application Layer (Backend)

The backend consists of Next.js API route handlers:

- **Authentication**: Login verification, session management, logout
- **CRUD Operations**: RESTful endpoints for each resource
- **Business Logic**: Inventory auto-update on purchases/sales, stock validation, report aggregation
- **Middleware/Proxy**: Request authentication guard

#### Tier 3: Data Layer (Database)

SQLite database managed through Prisma ORM with 12 data models.

#### System Components:

| Component | Technology | Responsibility |
|---|---|---|
| Web Server | Next.js 16 | Serve pages and API routes |
| ORM | Prisma 6 | Database access and migrations |
| Database | SQLite | Data persistence |
| Session Store | HTTP Cookies | User session management |
| CSS Engine | Tailwind v4 | Styling and theming |

### 2.3.1 Use Case Diagram

#### A) Actors

| Actor | Description |
|---|---|
| **Administrator** | Full system access. Manages products, categories, suppliers, customers, employees, and views all reports. |
| **Shopkeeper** | Limited access. Records purchases and sales, checks inventory, prints receipts. |

#### B) Use Cases

| Use Case | Actor | Description |
|---|---|---|
| Login | Administrator, Shopkeeper | Authenticate with username and password |
| Manage Products | Administrator | CRUD operations on products |
| Manage Categories | Administrator | CRUD operations on categories |
| Manage Suppliers | Administrator | CRUD operations on suppliers |
| Manage Customers | Administrator | CRUD operations on customers |
| Manage Employees | Administrator | CRUD operations on employees |
| Record Purchase | Administrator, Shopkeeper | Create purchase transactions with items |
| Record Sale | Administrator, Shopkeeper | Create sales transactions with items |
| View Inventory | Administrator, Shopkeeper | Check current stock levels |
| Update Stock | Administrator, Shopkeeper | Manually adjust inventory quantities |
| Print Receipt | Administrator, Shopkeeper | Print formatted sales receipts |
| View Dashboard | Administrator, Shopkeeper | View business overview and alerts |
| View Reports | Administrator | Generate and view sales/purchase/profit reports |

### 2.3.2 Usage Scenarios

#### Scenario 1: User Login

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | User | Navigate to login page | Display login form |
| 2 | User | Enter username and password | Validate credentials |
| 3 | System | — | Verify against database |
| 4 | System | — | Create session cookie |
| 5 | System | — | Redirect to dashboard |

#### Scenario 2: Record a Purchase

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Shopkeeper | Navigate to Purchases page | Display purchase list |
| 2 | Shopkeeper | Click "Add Purchase" | Open purchase dialog |
| 3 | Shopkeeper | Select supplier, date, add items | Calculate running totals |
| 4 | Shopkeeper | Submit purchase | Create purchase record, update inventory |
| 5 | System | — | Show success message |

#### Scenario 3: Record a Sale

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Shopkeeper | Navigate to Sales page | Display sales list |
| 2 | Shopkeeper | Click "Add Sale" | Open sale dialog |
| 3 | Shopkeeper | Select customer, add items with quantities | Validate stock availability |
| 4 | Shopkeeper | Submit sale | Create sale record, deduct inventory |
| 5 | Shopkeeper | Click "Print Receipt" | Display printable receipt |

#### Scenario 4: View Profit Report

| Step | Actor | Action | System Response |
|---|---|---|---|
| 1 | Administrator | Navigate to Reports page | Display date range picker |
| 2 | Administrator | Select date range | Fetch report data |
| 3 | System | — | Display sales total, purchases total, net profit |
| 4 | Administrator | Switch to Sales/Purchases tab | Show detailed transaction tables |

### 2.3.3 Class Diagram

The system consists of the following main entity classes:

```
User
  - id: Int
  - username: String (unique)
  - password: String (hashed)
  - name: String
  - role: String (admin | shopkeeper)
  - createdAt: DateTime
  - updatedAt: DateTime

Category
  - id: Int
  - name: String (unique)
  - description: String?
  - products: Product[]

Product
  - id: Int
  - name: String
  - categoryId: Int
  - category: Category
  - unit: String (kg, dozen, bundle, piece)
  - currentPrice: Float
  - inventory: Inventory?
  - purchaseItems: PurchaseItem[]
  - saleItems: SaleItem[]

Inventory
  - id: Int
  - productId: Int (unique)
  - product: Product
  - quantity: Float

Supplier
  - id: Int
  - name: String
  - contact: String?
  - address: String?
  - purchases: Purchase[]

Customer
  - id: Int
  - name: String
  - contact: String?
  - address: String?
  - sales: Sale[]

Employee
  - id: Int
  - name: String
  - position: String
  - contact: String?
  - salary: Float

Purchase
  - id: Int
  - date: DateTime
  - supplierId: Int
  - supplier: Supplier
  - totalAmount: Float
  - notes: String?
  - items: PurchaseItem[]

PurchaseItem
  - id: Int
  - purchaseId: Int
  - productId: Int
  - product: Product
  - quantity: Float
  - unitPrice: Float
  - totalPrice: Float

Sale
  - id: Int
  - date: DateTime
  - customerId: Int?
  - customer: Customer?
  - totalAmount: Float
  - notes: String?
  - items: SaleItem[]

SaleItem
  - id: Int
  - saleId: Int
  - productId: Int
  - product: Product
  - quantity: Float
  - unitPrice: Float
  - totalPrice: Float
```

### 2.3.4 Data Flow Diagrams

#### Level 0 DFD (Context Diagram)

```
+--------------------+
|      User          |
| (Admin/Shopkeeper) |
+--------+-----------+
         |
         | Login Credentials
         | CRUD Operations
         | Transaction Data
         v
+----------------------------+
|   Smart Sabzi Mandi        |
|   Management System        |
+----------------------------+
         |
         | Dashboard Data
         | Reports
         | Confirmations
         v
+--------------------+
|      User          |
+--------------------+
```

#### Level 1 DFD

```
                    +-----------------+
                    |   Database      |
                    |   (SQLite)      |
                    +---+-----+------+
                        |     |
            +-----------+     +-----------+
            |                             |
    +-------v--------+          +---------v--------+
    | Authentication |          |  Product/Category |
    |    Module      |          |    Management     |
    +-------+--------+          +---------+---------+
            |                              |
    +-------v--------+          +---------v--------+
    |  Purchase/      |          | Supplier/Customer|
    |  Sales Module   |          |   Management     |
    +-------+--------+          +---------+---------+
            |                              |
    +-------v--------+          +---------v--------+
    |   Inventory     |          |   Reports        |
    |   Module        |          |   Module         |
    +----------------+          +------------------+
```

### 2.3.5 Entity Relationship Diagram

The database consists of 12 tables with the following relationships:

```
User (independent)
  - No foreign keys

Category (independent)
  - PK: id
  - Relationships: has many Products

Product (dependent on Category)
  - PK: id
  - FK: categoryId -> Category.id
  - Unique: (name, categoryId)
  - Relationships: has one Inventory, has many PurchaseItems, has many SaleItems

Inventory (dependent on Product)
  - PK: id
  - FK: productId -> Product.id (unique, cascade delete)

Supplier (independent)
  - PK: id
  - Relationships: has many Purchases

Customer (independent)
  - PK: id
  - Relationships: has many Sales

Employee (independent)
  - PK: id
  - No foreign keys

Purchase (dependent on Supplier)
  - PK: id
  - FK: supplierId -> Supplier.id
  - Relationships: has many PurchaseItems

PurchaseItem (dependent on Purchase and Product)
  - PK: id
  - FK: purchaseId -> Purchase.id (cascade delete)
  - FK: productId -> Product.id

Sale (dependent on Customer)
  - PK: id
  - FK: customerId -> Customer.id (optional)
  - Relationships: has many SaleItems

SaleItem (dependent on Sale and Product)
  - PK: id
  - FK: saleId -> Sale.id (cascade delete)
  - FK: productId -> Product.id
```

### 2.3.6 Database Model

The database model uses SQLite with the following configuration:

- **Database Engine**: SQLite 3.x
- **ORM**: Prisma 6.x
- **File Location**: `prisma/dev.db`
- **Connection String**: `file:./dev.db`

**Table Summary:**

| Table | Records (Seeded) | Key Fields |
|---|---|---|
| User | 2 | username (unique), role |
| Category | 3 | name (unique) |
| Product | 12 | name + categoryId (unique), unit, currentPrice |
| Inventory | 12 | productId (unique), quantity |
| Supplier | 3 | name, contact |
| Customer | 3 | name, contact |
| Employee | 2 | name, position, salary |

### 2.3.7 System Architecture

#### Component Architecture:

```
┌─────────────────────────────────────────────────────────┐
│                   Client Browser                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Next.js Application                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │   │
│  │  │  Login    │  │Dashboard │  │  Module Pages  │  │   │
│  │  │  Page     │  │  Layout  │  │  (10 modules)  │  │   │
│  │  └──────────┘  └──────────┘  └────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐ │   │
│  │  │         UI Components (shadcn/ui)            │ │   │
│  │  │  Button, Card, Dialog, Table, Input, etc.    │ │   │
│  │  └──────────────────────────────────────────────┘ │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │   │
│  │  │  Auth    │  │  Proxy   │  │  API Routes   │  │   │
│  │  │  Lib     │  │(Security)│  │  (18 routes)  │  │   │
│  │  └──────────┘  └──────────┘  └────────────────┘  │   │
│  │  ┌──────────────────────────────────────────────┐ │   │
│  │  │         Prisma ORM / SQLite Driver           │ │   │
│  │  └──────────────────────────────────────────────┘ │   │
│  │  ┌──────────────────────────────────────────────┐ │   │
│  │  │            SQLite Database (dev.db)          │ │   │
│  │  └──────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### Data Flow:

```
User Action → React Component → fetch() → API Route → Prisma → SQLite
                                                    ↓
User sees   ← React Component ← JSON      ← API Route ← Prisma
```

#### Security Architecture:

```
Request → Proxy (src/proxy.ts) → Session Check → Valid? → API Route
                                      ↓                    ↓
                                   Invalid?            Database
                                      ↓
                              Redirect to Login
```

---

## Chapter 3 – Results & Discussion

### 3.1 Testing

The system was tested using manual testing methodologies. Each module was tested for:

- **Functional correctness**: CRUD operations work as expected
- **Data integrity**: Inventory updates correctly on transactions
- **Access control**: Role-based restrictions are enforced
- **Error handling**: Invalid inputs are properly rejected
- **UI/UX**: Forms, tables, and dialogs function correctly

### 3.2 Test Cases

#### Table 3.1: User Registration (Seed Data)

| Test Case ID | TC-001 |
|---|---|
| **Test Case** | Verify default users exist after seeding |
| **Precondition** | Database seeded with `npm run db:seed` |
| **Steps** | 1. Run seed script<br>2. Check User table |
| **Expected Result** | admin/admin123 and shopkeeper/shop123 users exist |
| **Actual Result** | Both users created with hashed passwords |
| **Status** | ✅ Pass |

#### Table 3.2: User Login

| Test Case ID | TC-002 |
|---|---|
| **Test Case** | Verify login with valid credentials |
| **Precondition** | Seed data exists |
| **Steps** | 1. Navigate to /<br>2. Enter "admin" / "admin123"<br>3. Click Sign In |
| **Expected Result** | Redirect to /dashboard, session cookie set |
| **Actual Result** | Login successful, redirected to dashboard |
| **Status** | ✅ Pass |

#### Table 3.3: Invalid Login

| Test Case ID | TC-003 |
|---|---|
| **Test Case** | Verify error on invalid credentials |
| **Precondition** | Seed data exists |
| **Steps** | 1. Navigate to /<br>2. Enter "admin" / "wrongpassword"<br>3. Click Sign In |
| **Expected Result** | Error message displayed, no redirect |
| **Actual Result** | "Invalid username or password" shown |
| **Status** | ✅ Pass |

#### Table 3.4: Create Product

| Test Case ID | TC-004 |
|---|---|
| **Test Case** | Admin creates a new product |
| **Precondition** | Logged in as admin, categories exist |
| **Steps** | 1. Navigate to /products<br>2. Click "Add Product"<br>3. Fill name, select category, enter price<br>4. Submit |
| **Expected Result** | Product appears in table, inventory created with 0 stock |
| **Actual Result** | Product added successfully |
| **Status** | ✅ Pass |

#### Table 3.5: Record Purchase with Inventory Update

| Test Case ID | TC-005 |
|---|---|
| **Test Case** | Verify purchase increases inventory |
| **Precondition** | Products exist, suppliers exist |
| **Steps** | 1. Navigate to /purchases<br>2. Click "Add Purchase"<br>3. Select supplier, add product with quantity<br>4. Submit |
| **Expected Result** | Purchase recorded, inventory quantity increased |
| **Actual Result** | Inventory updated correctly |
| **Status** | ✅ Pass |

#### Table 3.6: Record Sale with Stock Deduction

| Test Case ID | TC-006 |
|---|---|
| **Test Case** | Verify sale decreases inventory |
| **Precondition** | Product has sufficient stock |
| **Steps** | 1. Navigate to /sales<br>2. Click "Add Sale"<br>3. Select product, enter quantity less than stock<br>4. Submit |
| **Expected Result** | Sale recorded, inventory quantity decreased |
| **Actual Result** | Inventory deducted correctly |
| **Status** | ✅ Pass |

#### Table 3.7: Insufficient Stock Validation

| Test Case ID | TC-007 |
|---|---|
| **Test Case** | Verify sale fails when stock insufficient |
| **Precondition** | Product has stock of 5 |
| **Steps** | 1. Create sale with quantity 10 for that product<br>2. Submit |
| **Expected Result** | Error message returned, sale not created |
| **Actual Result** | "Insufficient stock" error displayed |
| **Status** | ✅ Pass |

#### Table 3.8: Role-Based Access Control

| Test Case ID | TC-008 |
|---|---|
| **Test Case** | Verify shopkeeper cannot access admin pages |
| **Precondition** | Logged in as shopkeeper |
| **Steps** | 1. Navigate to /categories<br>2. Observe redirect |
| **Expected Result** | Redirected to /dashboard |
| **Actual Result** | Shopkeeper redirected to dashboard |
| **Status** | ✅ Pass |

#### Table 3.9: Report Generation

| Test Case ID | TC-009 |
|---|---|
| **Test Case** | Verify profit report calculates correctly |
| **Precondition** | Sales and purchases exist in date range |
| **Steps** | 1. Navigate to /reports<br>2. Select date range<br>3. View Profit tab |
| **Expected Result** | Sales total, purchases total, and profit displayed |
| **Actual Result** | Correct calculations shown |
| **Status** | ✅ Pass |

#### Table 3.10: Print Sales Receipt

| Test Case ID | TC-010 |
|---|---|
| **Test Case** | Verify receipt can be printed |
| **Precondition** | At least one sale exists |
| **Steps** | 1. Navigate to /sales<br>2. Click print icon on a sale row<br>3. View receipt modal |
| **Expected Result** | Printable receipt with sale details shown |
| **Actual Result** | Receipt displays correctly |
| **Status** | ✅ Pass |

#### Table 3.11: Dashboard Low Stock Alerts

| Test Case ID | TC-011 |
|---|---|
| **Test Case** | Verify low stock items appear on dashboard |
| **Precondition** | Products with quantity < 10 exist |
| **Steps** | 1. Log in as admin or shopkeeper<br>2. Navigate to /dashboard |
| **Expected Result** | Low stock items listed in alerts section |
| **Actual Result** | Alerts displayed with badge colors |
| **Status** | ✅ Pass |

### 3.3 Test Results Summary

#### Table 3.12: Overall Testing Results

| Metric | Value |
|---|---|
| Total Test Cases | 11 |
| Passed | 11 |
| Failed | 0 |
| Pass Rate | 100% |
| Modules Tested | 9 (Auth, Products, Categories, Suppliers, Customers, Employees, Purchases, Sales, Inventory, Reports, Dashboard) |

### 3.4 Conclusion

The Smart Sabzi Mandi Management System successfully addresses the core challenges faced by vegetable market operators in Pakistan. The system provides:

- A complete digital platform for managing daily market operations
- Automatic inventory tracking with real-time stock updates
- Role-based access for administrators and shopkeepers
- Comprehensive reporting for informed decision-making
- An intuitive, green-themed user interface optimized for market use

The use of modern web technologies (Next.js 16, React 19, TypeScript 5, Tailwind CSS v4) with local SQLite storage ensures the application is fast, reliable, and works without internet connectivity.

**Future enhancements could include:**
- Multi-branch/multi-market support
- Barcode/QR code scanning for faster checkout
- Cloud synchronization for off-site backup
- Mobile application for on-the-go access
- Online ordering and delivery management

---

## Chapter 4 – User Manual

### 4.1 Installation and Setup

#### Prerequisites

- Node.js 18.x or later installed
- npm 9.x or later installed

#### Installation Steps

```bash
# Navigate to the project directory
cd smart-sabzi-mandi

# Install dependencies
npm install

# Push database schema and seed data
npm run db:push
npm run db:seed

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

#### Default Login Credentials

| Role | Username | Password |
|---|---|---|
| Administrator | `admin` | `admin123` |
| Shopkeeper | `shopkeeper` | `shop123` |

### 4.2 Login Page

![Login Page](https://via.placeholder.com/400x300?text=Login+Page)

The login page features:
- Centered card with the Smart Sabzi Mandi branding and store icon
- Username and password input fields
- Sign In button
- Error message display for invalid credentials

**Steps to log in:**
1. Open `http://localhost:3000` in a web browser
2. Enter your username (e.g., `admin`)
3. Enter your password (e.g., `admin123`)
4. Click **Sign In**

### 4.3 Admin Dashboard

The admin dashboard provides a full business overview:

- **Stats Cards**: Total Products, Total Suppliers, Total Customers, Low Stock Items count
- **Today's Summary**: Today's Sales total and Today's Purchases total (shown when > 0)
- **Recent Sales**: Last 5 sales with date, customer name, and amount
- **Recent Purchases**: Last 5 purchases with date, supplier name, and amount
- **Low Stock Alerts**: Products with quantity below 10, color-coded by severity

**Sidebar Navigation (Admin):**
- Dashboard, Products, Categories, Suppliers, Customers, Employees, Purchases, Sales, Inventory, Reports

### 4.4 Shopkeeper Dashboard

The shopkeeper dashboard is simplified for daily operations:

- **Today's Summary**: Today's Sales and Today's Purchases totals
- **Quick Action Buttons**: Large "New Sale" and "New Purchase" buttons
- **Recent Activity**: Recent sales and purchases tables
- **Low Stock Alerts**: Products running low on stock

**Sidebar Navigation (Shopkeeper):**
- Dashboard, Products, Purchases, Sales, Inventory

### 4.5 Product Management

**Location**: Click "Products" in the sidebar

**Features:**
- View all products in a table (Name, Category, Unit, Price, Stock level)
- Search products by name
- Add new products with name, category (dropdown), unit, and price
- Edit existing products
- Delete products with confirmation

**Product Fields:**
- Name (required)
- Category (required, select from existing)
- Unit: kg, dozen, bundle, piece, or custom
- Current Price: per-unit price in PKR

### 4.6 Category Management

**Location**: Click "Categories" in the sidebar (admin only)

**Features:**
- View all categories (Name, Description, Product Count, Created Date)
- Add new categories
- Edit existing categories
- Delete categories (blocked if category has products)

### 4.7 Supplier Management

**Location**: Click "Suppliers" in the sidebar (admin only)

**Features:**
- View all suppliers (Name, Contact, Address)
- Add new suppliers
- Edit existing suppliers
- Delete suppliers

### 4.8 Customer Management

**Location**: Click "Customers" in the sidebar (admin only)

**Features:**
- View all customers (Name, Contact, Address)
- Add new customers
- Edit existing customers
- Delete customers

### 4.9 Employee Management

**Location**: Click "Employees" in the sidebar (admin only)

**Features:**
- View all employees (Name, Position, Contact, Salary)
- Add new employees with position and salary
- Edit existing employees
- Delete employees

**Employee Fields:**
- Name, Position (e.g., Salesman, Cashier, Loader), Contact, Salary

### 4.10 Purchase Management

**Location**: Click "Purchases" in the sidebar

**Features:**
- View all purchases in a table (Date, Supplier, Items Count, Total Amount)
- Search purchases by supplier name
- Add new purchases with a multi-step dialog:
  - **Step 1**: Select supplier, date, and add notes
  - **Step 2**: Add items by selecting product, entering quantity and unit price
- Running total displayed as items are added
- Inventory automatically updated on submission

**Creating a Purchase:**
1. Click **Add Purchase**
2. Select a supplier from the dropdown
3. Set the date (defaults to today)
4. Add notes (optional)
5. Click **Next: Add Items**
6. Click **Add Item** to add rows
7. For each item: select product, enter quantity and unit price
8. Review the running total
9. Click **Create Purchase**

### 4.11 Sales Management

**Location**: Click "Sales" in the sidebar

**Features:**
- View all sales in a table (Date, Customer, Items Count, Total Amount, Actions)
- Search sales by customer name
- Add new sales with a multi-step dialog:
  - **Step 1**: Select customer (optional), date, and notes
  - **Step 2**: Add items by selecting product, quantity, and unit price (pre-filled from current price)
  - Stock validation: error shown if insufficient stock
- **Print Receipt**: Click the print icon to view a formatted receipt

**Creating a Sale:**
1. Click **Add Sale**
2. Select a customer (optional — leave blank for walk-in customers)
3. Set the date (defaults to today)
4. Add notes (optional)
5. Click **Next: Add Items**
6. Click **Add Item** to add rows
7. For each item: select product, enter quantity (unit price pre-filled)
8. Review the running total
9. Click **Create Sale**

**Printing a Receipt:**
1. Find the sale in the sales table
2. Click the print icon in the Actions column
3. A receipt modal will appear with:
   - Store name and header
   - Sale date and ID
   - Customer name
   - Itemized list with quantities, prices, and totals
   - Grand total
4. Click **Print** or use browser print (Ctrl+P)

### 4.12 Inventory Management

**Location**: Click "Inventory" in the sidebar

**Features:**
- View all products with stock levels (Product, Category, Unit, Current Stock, Last Updated)
- Stock levels color-coded:
  - **Red (Destructive)**: 0 in stock — Out of Stock
  - **Yellow (Warning)**: Less than 10 — Low Stock
  - **Green (Success)**: 10 or more — In Stock
- Search by product name
- Update stock quantities manually
- Refresh data with refresh button

**Updating Stock:**
1. Find the product in the inventory table
2. Click **Update Stock**
3. Enter the new quantity
4. Click **Save**

### 4.13 Reports

**Location**: Click "Reports" in the sidebar (admin only)

**Features:**
- **Date Range Picker**: Select From and To dates
- **Summary Cards**: Total Sales (green), Total Purchases (orange), Net Profit (green)
- **Tabbed Reports**:
  - **Sales Report**: Detailed table of all sales in date range with total at bottom
  - **Purchase Report**: Detailed table of all purchases in date range with total at bottom
  - **Profit Overview**: Breakdown of sales, purchases, and net profit

**Generating a Report:**
1. Navigate to Reports
2. Select a date range (defaults to last 30 days)
3. View the summary cards at the top
4. Click on tabs (Profit Overview, Sales Report, Purchase Report) for detailed data

### 4.14 Logout

1. Click the **Logout** button at the bottom of the sidebar
2. You will be redirected to the login page
3. Your session cookie will be cleared

---

## Appendix

### A. Database Schema (Prisma)

The full database schema is defined in `prisma/schema.prisma` with 12 models.

### B. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/auth/me` | Get current session |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create product |
| GET | `/api/products/[id]` | Get product details |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category |
| GET/PUT/DELETE | `/api/categories/[id]` | Single category CRUD |
| GET | `/api/suppliers` | List all suppliers |
| POST | `/api/suppliers` | Create supplier |
| GET/PUT/DELETE | `/api/suppliers/[id]` | Single supplier CRUD |
| GET | `/api/customers` | List all customers |
| POST | `/api/customers` | Create customer |
| GET/PUT/DELETE | `/api/customers/[id]` | Single customer CRUD |
| GET | `/api/employees` | List all employees |
| POST | `/api/employees` | Create employee |
| GET/PUT/DELETE | `/api/employees/[id]` | Single employee CRUD |
| GET | `/api/purchases` | List all purchases |
| POST | `/api/purchases` | Create purchase with items |
| GET | `/api/purchases/[id]` | Get purchase details |
| DELETE | `/api/purchases/[id]` | Delete purchase |
| GET | `/api/sales` | List all sales |
| POST | `/api/sales` | Create sale with items |
| GET | `/api/sales/[id]` | Get sale details |
| DELETE | `/api/sales/[id]` | Delete sale |
| GET | `/api/inventory` | List all inventory |
| PUT | `/api/inventory` | Update stock quantity |
| GET | `/api/reports?type=&from=&to=` | Generate reports |

### C. Project File Structure

```
smart-sabzi-mandi/
├── .env                          # Environment variables
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration (Tailwind v4)
├── package.json                  # Dependencies and scripts
├── prisma/
│   ├── schema.prisma             # Database schema (12 models)
│   ├── seed.ts                   # Seed data script
│   └── dev.db                    # SQLite database file
├── src/
│   ├── proxy.ts                  # Auth guard (replaces middleware)
│   ├── lib/
│   │   ├── db.ts                 # Prisma client singleton
│   │   ├── auth.ts               # Session management and auth utilities
│   │   └── utils.ts              # cn(), formatCurrency(), formatDate()
│   ├── components/ui/            # shadcn/ui components (12 files)
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── table.tsx
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, metadata)
│   │   ├── globals.css           # Tailwind v4 theme configuration
│   │   ├── page.tsx              # Login page
│   │   ├── icon.tsx              # Browser tab icon (store icon)
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx        # Dashboard layout (sidebar, header)
│   │   │   ├── dashboard/page.tsx # Admin & Shopkeeper dashboards
│   │   │   ├── products/page.tsx  # Product CRUD
│   │   │   ├── categories/page.tsx # Category CRUD
│   │   │   ├── suppliers/page.tsx  # Supplier CRUD
│   │   │   ├── customers/page.tsx  # Customer CRUD
│   │   │   ├── employees/page.tsx  # Employee CRUD
│   │   │   ├── purchases/page.tsx  # Purchase management
│   │   │   ├── sales/page.tsx      # Sales management & receipts
│   │   │   ├── inventory/page.tsx  # Stock management
│   │   │   └── reports/page.tsx    # Reports & analytics
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   └── me/route.ts
│   │       ├── products/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── categories/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── suppliers/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── customers/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── employees/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── purchases/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── sales/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── inventory/route.ts
│   │       └── reports/route.ts
│   └── ... (config files)
```

### D. Technology Stack Summary

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.2.10 |
| UI Library | React | 19.0.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | Radix UI (shadcn/ui style) | Latest |
| Icons | Lucide React | 0.454.0 |
| Database | SQLite | 3.x |
| ORM | Prisma | 6.x |
| Auth | bcryptjs + Cookies | 2.4.3 |

### E. Color Theme

| Token | Hex | Usage |
|---|---|---|
| --background | #F7FAF5 | Page background |
| --foreground | #1F2937 | Body text |
| --primary | #2E7D32 | Primary buttons, links |
| --primary-foreground | #FFFFFF | Text on primary |
| --accent | #66BB6A | Highlights, hover states |
| --secondary | #E8F5E9 | Card/section backgrounds |
| --muted-foreground | #607D8B | Secondary text |
| --border | #D7E8D4 | Borders and dividers |
| --radius | 0.75rem | Border radius |

### F. Fonts

| Usage | Font | Weight |
|---|---|---|
| Body/UI text | DM Sans | 400, 500 |
| Headings | Poppins | 400, 500, 600, 700 |

---

*Document Version 1.0 — July 2026*
