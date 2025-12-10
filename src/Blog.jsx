import React from 'react'

const Blog = ({ onLogout }) => {
  const blogs = [
    {
      title: "How to Start Coding in 2025",
      desc: "Simple guide for beginners to start programming journey!",
      date: "02 Nov 2025"
    },
    {
      title: "Best Tech Stack for Web Dev",
      desc: "Which tech stack is best for modern frontend development?",
      date: "01 Nov 2025"
    },
    {
      title: "How to Crack First IT Job",
      desc: "Tips for freshers to get their first company job!",
      date: "29 Oct 2025"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-4xl font-bold text-[#033452] mb-10">Tech Blog 
        <button onClick={onLogout} className="px-3 py-1 border rounded">Logout</button>

      </h1>

      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {blogs.map((b, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:scale-[1.02] transition">
            <h2 className="text-2xl font-semibold text-[#033452]">{b.title}</h2>
            <p className="text-gray-600 mt-1">{b.desc}</p>
            <p className="text-sm text-gray-400 mt-3">{b.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
