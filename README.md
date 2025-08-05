# 🤖 AutoReview AI – Backend

> **AI-powered Pull Request Assistant Backend**  
> Built with Express.js, Python, PostgreSQL, and Gemini AI to make code reviews *automatic*, *faster*, and *smarter*.  

![Built with Express](https://img.shields.io/badge/Express.js-Backend-green?style=flat-square)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blueviolet?style=flat-square)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square)

---

## ✨ What is AutoReview AI?

AutoReview AI is a **full-stack project** that acts like your own *virtual PR reviewer* 🤝. The backend uses Gemini AI to:  

✅ Summarize commits  
✅ Suggest code refactor ideas  
✅ Automate PR reviews  
✅ Save you **60%** of manual review effort  

With smart prompt-handling and modular Express.js endpoints, you can integrate or extend it easily with future LLMs too.  

> _"Turn every developer into a super-reviewer!"_ 🚀

---

## 🧩 Tech Stack

- **Backend Framework:** Express.js  
- **Language:** JavaScript / Node.js  
- **AI:** Gemini AI  
- **Database:** PostgreSQL  
- **Other:** Python for data pre-processing, Docker for easy containerization

---

## 🔌 API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/review` | POST | Generate PR review with Gemini |
| `/api/summary` | POST | Summarize commits |
| `/api/feedback` | POST | Suggest refactor improvements |

(Feel free to expand this table with more routes you add!)


🌟 Fun Fact
Gemini helped process 20+ PRs already, saving 60% of manual code review time. That’s enough time to grab coffee ☕ and fix another bug! 😉

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/student-manokamna/AutoReviewAI-backend.git
cd AutoReviewAI-backend
npm install
npm run dev

