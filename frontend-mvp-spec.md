# FRONTEND MVP – Organized Breakdown

## 1️⃣ Core Pages (Minimum Required)

### 1.🏠 Home / Feed Page

**Purpose**: Display real-time reports.

#### Must Have:

**List of reports** (card layout)

**Filters:**
- City
- Area  
- Category
- Urgency

**Sorting:**
- Most Recent
- Most Urgent
- Highest Confidence

**Pagination or infinite scroll**

#### Each Report Card Must Show:
- Title
- Category badge
- Urgency badge (color-coded)
- Area + City
- Media preview (image or video thumbnail)
- Real/Fake vote count
- Confidence indicator
- Timestamp
- "View Details" button

---

### 2.📝 Create Report Page

#### Required Form Fields:
- Title
- Description
- Category (dropdown)
- Urgency (Info / Warning / Critical)
- City (dropdown)
- Area (dynamic dropdown)
- Media upload (image/video)

#### Optional:
- Place name

#### Submit button

#### UI Requirements:
- File preview before upload
- Video length validation
- Loading state during submission
- Clear validation messages

---

### 3.📄 Report Detail Page

#### Must Display:
- Full title
- Full description
- Media gallery
- City & Area
- Category
- Urgency level
- Timestamp
- Real / Fake vote buttons
- Confidence score
- Comment section
- Report (flag) button

---

### 4.🔐 Authentication Pages

- Login
- Register
- Forgot password

**Basic validation + error display required.**

---

### 5.👤 User Profile Page

#### Show:
- Username
- Trust score
- User's reports list
- Edit profile option

---

### 6.🛡 Admin Dashboard (Basic MVP)

**Only visible to Admins.**

#### Sections:
- Flagged reports list
- Report details view

#### Actions:
- Approve
- Remove
- Verify
- Ban user

#### Moderation log table

---

## 2️⃣ Shared Components (Reusable UI)

You should design these as isolated components:

- Navbar
- Sidebar (optional)
- ReportCard
- CategoryBadge
- UrgencyBadge
- MediaUploader
- CommentBox
- VoteButtons
- ConfidenceIndicator
- Pagination
- FilterPanel
- LoadingSpinner
- ErrorAlert
- Modal (confirmation)

---

## 3️⃣ State Management Plan

For MVP:

- Auth state
- Reports list state
- Filter state
- Admin state
- Notification state (if implemented)

#### You can use:
- React Context (simple MVP)
- Zustand / Redux (if scaling)

---

## 4️⃣ MVP UI Behavior Rules

- Prevent submitting empty reports
- Disable submit button while uploading
- Optimistic UI for voting (optional)
- Soft delete UI when report removed
- Show "Under Review" badge if needed

---

## 5️⃣ Styling Guidelines (Keep It Clean)

### Use color coding for urgency:
-🟢
- 🟡 Warning
-🔴 Critical

### Design Principles:
- Keep card layout consistent
- Avoid overcrowded UI
- Mobile-first responsive design

---

## 6️⃣ Folder Structure (Frontend Example)

```
/src
  /pages
    /auth
    /reports
    /admin
  /components
  /hooks
  /services (API calls)
  /context
  /utils
  /types
```

---

## 7️⃣ What NOT to Build in MVP

❌ No map  
❌ No real-time sockets  
❌ No advanced analytics  
❌ No AI scoring UI  
❌ No push notifications  
❌ No business verification panel  

**Keep it lean.**

---

## 🎯 Final MVP Checklist

If your frontend supports:

✅ User authentication  
✅ Create report with media preview  
✅ Structured city/area selection  
✅ Feed with filters  
✅ Report detail with voting  
✅ Basic admin moderation panel  
✅ Clean responsive design  

**Then your MVP frontend is ready.**