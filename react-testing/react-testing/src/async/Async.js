import { useEffect, useState } from 'react';

const Async = ()=>{

    const [posts, setPosts] = useState([]);

    useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			})
			.catch((err) => console.log(err));
	}, []);

    return(
        <div>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
    )
}

export default Async