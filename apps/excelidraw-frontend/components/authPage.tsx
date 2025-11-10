"use client"

export default function AuthPage({isSignIn ,reference,authFunc }:{ isSignIn:boolean,
    reference:any,authFunc:any
}){
return ( <div className="w-screen  h-screen flex justify-center items-center ">
<div className="border   p-4   " >
<div className="flex flex-col  "  > 
      <input 
      type="text"
                        placeholder="name"
                        ref={reference.nameRef}
                        className={`border rounded p-2 m-2 ${isSignIn ? 'hidden' : ''}`}
                    />
<input type="text" placeholder="Email"   ref={reference.usernameRef}  className="border rounded p-2 m-2  "  />
<input type="text" placeholder="Password"   ref={reference.passwordRef}  className=" rounded border  p-2 m-2 "/>

</div>
<div className="mt-8 flex justify-center " >
<button onClick={ authFunc} className="  bg-blue-600 text-white rounded border px-8 py-2  " > {isSignIn?"Sign in ":"Sign up "} </button>
</div>
</div>

</div> )
}