import React, { useState } from 'react'
import Blog from './Blog';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showBlog, setsShowBlog] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    let url = isLogin ? `${import.meta.env.VITE_API_URL}/login` : `${import.meta.env.VITE_API_URL}/signup`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data);

    if(data.status ==="ok"){
      localStorage.setItem("token", data.token);
      alert("Login successful")
      setsShowBlog(true)
    }
    setEmail('')
    setPassword('')

  }

   if(showBlog){
  return <Blog onLogout={()=>setsShowBlog(false)} />
}

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-200 to-purple-200">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-[350px] border border-gray-200">
          <div className="flex justify-center mb-6 rounded-full overflow-hidden font-bold shadow-sm bg-gradient-to-r from-blue-100 to-green-100">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 rounded-l-full ${isLogin ? 'bg-gradient-to-r from-blue-600 to-green-400 text-white shadow-lg scale-105' : 'bg-transparent text-gray-700 hover:bg-blue-50'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-lg font-semibold transition-all duration-300 rounded-r-full ${!isLogin ? 'bg-gradient-to-l from-green-400 to-blue-600 text-white shadow-lg scale-105' : 'bg-transparent text-gray-700 hover:bg-green-50'}`}
            >
              SignUp
            </button>
          </div>
          {isLogin ? (
            <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2">
              <h2 className="text-center font-bold text-2xl text-blue-700 mb-2 tracking-wide">Login</h2>
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className="border border-gray-300 p-3 bg-white rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 shadow-sm"
                type="email"
                placeholder="Email address"
                autoComplete="username"
              />
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="border border-gray-300 p-3 bg-white rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 shadow-sm"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
  className="py-2 mt-2 text-lg font-bold bg-gradient-to-br from-blue-500 via-green-400 to-blue-600 text-white rounded-xl shadow-md hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-all duration-300 active:scale-95"
>
                Login
              </button>
              <div className="flex justify-between items-center mt-2">
                <a className="text-blue-500 hover:underline text-sm" href="#">Forgot Password?</a>
                <span className="text-gray-500 text-sm">Not a user?
                  <a className="text-blue-500 hover:underline ml-1 cursor-pointer" href="" onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false)
                  }}>Signup here</a>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2">
              <h2 className="text-center font-bold text-2xl text-green-700 mb-2 tracking-wide">Sign Up</h2>
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className="border border-gray-300 p-3 bg-white rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition placeholder-gray-400 shadow-sm"
                type="email"
                placeholder="Email address"
                autoComplete="username"
              />
              <input
                className="border border-gray-300 p-3 bg-white rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition placeholder-gray-400 shadow-sm"
                type="email"
                placeholder="Confirm email"
                autoComplete="off"
                // No value/onChange for demo only
              />
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="border border-gray-300 p-3 bg-white rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition placeholder-gray-400 shadow-sm"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <button
                className="py-2 mt-2 text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl shadow-md hover:scale-105 hover:from-green-500 hover:to-blue-600 transition-all duration-300 active:scale-95"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
export default AuthForm