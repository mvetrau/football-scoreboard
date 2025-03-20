# ⚽ Live Football Scoreboard

A simple **TypeScript** library for tracking live football matches with real-time score updates. Built using **Test-Driven Development (TDD)**.

---

## 🚀 Features

- 📌 Start a new match (initial score **0-0**)
- 🔄 Update scores in **real-time**
- 🏁 Finish an ongoing match
- 📊 Get a **sorted summary** of matches
  - Ordered by **total score** (highest first)
  - If scores are tied, the **most recent match** is listed first
- ✅ Fully tested with **Jest**
- 🛠 Uses **TypeScript** for type safety

---

## ⚠️ Validations & Edge Cases

✔ **Home and away teams cannot be the same**  
✔ **Scores must be integers (≥ 0)**  
✔ **A team cannot participate in multiple ongoing matches**  
✔ **Cannot update/finish a non-existent match**

---

## 📝 Notes & Assumptions

- **Teams cannot participate in multiple matches simultaneously** – I assumed this was a necessary rule to maintain realistic match tracking.
- **Sorting by total score, then recency** – Matches with the same total score are sorted by the most recent first, which was based on the requirement.
- **Immediate removal of finished matches** – Once a match is finished, it is no longer included in the summary.
- **Error handling strategy** – Instead of returning `null` or `undefined`, errors are thrown to enforce proper usage.
- **Implemented with scalability in mind** – The design ensures that adding more features like persistence or UI integration would be straightforward.

---

## 🧪 Running Tests

To run tests:

```sh
npm test
```
