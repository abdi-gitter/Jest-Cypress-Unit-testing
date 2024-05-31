import { useState } from 'react'

const Greeting = ()=>{

    const [changeText, setChangeText] = useState(false)
    const [name, setName] = useState('')

    return(
        <>
            <h1>Hello World!</h1>
            <h1>Hello again, World.</h1>
            {/* <h2>Hello World!</h2> */}
            {changeText?<p data-testid="para">See you soon</p>:<p data-testid="para">Welcome back</p>}
            <button data-testid="btn" onClick={()=>setChangeText(!changeText)}>Change text</button>

            <input data-testid='nameinput' type="text" placeholder="Enter your name" value = {name} onInput={(e)=>{setName(e.target.value)}} />
            <h1 data-testid="name">Hi, {name}</h1>
        </>
    )
}

export default Greeting