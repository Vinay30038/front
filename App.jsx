import React, { useState, useEffect } from "react";
import axios from 'axios';


function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data); // store data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3>Loading posts...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts from API (Axios Demo)</h2>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}


function UseEffectEg() {
  const [count, setCount] = useState(0);

  // useEffect runs after every render when "count" changes
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // dependency array

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React Hook (useEffect) Demo</h2>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

const Counter2 = ()=> {
    const [count, setCount] = useState(0);
    const increase = () => setCount(count + 1);
    const decrease = () => setCount(count - 1);
    const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React State Management Demo</h2>
      <h3>Count: {count}</h3>

      <button onClick={increase} style={{ margin: "5px" }}>
        ➕ Increase
      </button>
      <button onClick={decrease} style={{ margin: "5px" }}>
        ➖ Decrease
      </button>
      <button onClick={reset} style={{ margin: "5px" }}>
        🔄 Reset
      </button>
    </div>
  );
}



function Counter(){
 const [count, setCount] = useState(0);
 return(
 <div>
  <h2> Count = {count} </h2>
<button onClick = {()=>setCount(count + 1)} > increase</button>
<button onClick = {()=>setCount(count - 1)} > decrease</button>
<button onClick = {()=>setCount(0)} > reset</button>
 </div>
 )
}


const Home =() =>{
  return(
<div>
  <h3> Welcome to Home Compnent</h3>
</div>
  )}

  const About =() =>{
  return(
<div>
  <h3> Welcome to About Compnent</h3>
</div>
  )}

  const Contact =() =>{
  return(
<div>
  <h3> Welcome to Contact Compnent</h3>
</div>
  )}

   const Hello =(props) =>{
  return(
<div>
  <h3> Hello {props.name} </h3>
</div>
  )}

  const Hello2 =(props) =>{
  return(
<div>
  <h3> Hello {props.name}, your age is {props.age} </h3>
</div>
  )}


const App= ()  =>  {   
  const now = new Date()
  const a = 10
  const b = 20
  const name = 'vinay'
  const age = 40
  console.log('console welcome')
return(
<div>
<h1> Welcome to react application </h1>

<p> {a} plus {b}  = { a + b}</p>

<p> Date : {now.toString()}</p>

<Home />
<Home />
<Home />
<About />
<Contact />

<Hello name='vinay' />

<Hello2 name='vinay' age={30} />

<Hello2 name={name} age={age} />

<Counter />
<Counter2 />

<UseEffectEg />

<h2> Axios Demonstration</h2>
<UserList />
<PostList />


</div>
)
}

export default App;
