import React, { useState } from 'react'
import Blog from './Blog';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showBlog, setsShowBlog] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    let url = isLogin ? "http://localhost:5000/login" : "http://localhost:5000/signup";

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
      <div className="min-h-screen flex items-center justify-center bg-[rgb(17,115,154)]">
        <div className="bg-white rounded-2xl shadow-md p-4 w-[320px]">
          <div className="flex justify-center bg-gray-100 rounded-4xl overflow-hidden font-bold">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-lg font-medium transition ${isLogin ? 'bg-[#033452] text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-lg font-medium transition ${!isLogin ? 'bg-[#033452] text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              SignUp
            </button>
          </div>
          {isLogin ? (
            <form onSubmit={submitHandler}
              className="flex flex-col gap-3 mt-4">
              <h2 className="text-center font-semibold text-lg">Login Form</h2>
              <input value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className="border-2 border-transparent p-3 bg-gray-200 rounded-3xl outline-none"
                type="email"
                placeholder="Enter your email here"
              />
              <input value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="border-2 border-transparent p-3 bg-gray-200 rounded-3xl outline-none"
                type="password"
                placeholder="Enter your password"
              />
              <button className="py-2 m-auto text-xl font-bold bg-transparent border border-black w-[120px] rounded-2xl text-blue-400 transition-all duration-300 active:scale-95 hover:scale-105"
              >Login </button>
              <a className='ml-0 text-blue-400 ' href="#">Forget Password</a>
              <p className='ml-15'>Not a user?
                <a className='text-blue-400' href='' onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false)
                }} > Signup here</a>
              </p>
            </form>
          ) : (
            <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-4">
              <h2 className="text-center font-semibold text-lg">SignUp Form</h2>
              <input value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
                className="border-2 border-transparent p-3 bg-gray-200 rounded-3xl outline-none"
                type="email"
                placeholder="Enter your email here"
              />
              <input 
                className="border-2 border-transparent p-3 bg-gray-200 rounded-3xl outline-none"
                type="email"
                placeholder="Confirm your email"
              />
              <input value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="border-2 border-transparent p-3 bg-gray-200 rounded-3xl outline-none"
                type="password"
                placeholder="Enter your password"
              />
              <button className="py-2 m-auto text-xl font-bold bg-transparent border border-black w-[120px] rounded-2xl text-blue-400 transition-all duration-300 active:scale-95 hover:scale-105"
>SignUp </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
export default AuthForm