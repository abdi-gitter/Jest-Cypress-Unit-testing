import useFetch from './hooks/useFetch';

const CustomHooksExample = () => {

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const { loading, data, error } = useFetch(url, {});
    console.log(error)
    
    if(loading){
        return <h1>Loading...</h1>
    }

    return(
        <>
            {data&&data.map((post)=>{
                return <h3 key={post.id}>{post.title}</h3>
            })}
        </>
    )
}

export default CustomHooksExample