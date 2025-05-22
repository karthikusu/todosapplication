
import React from 'react'
import { useParams,Link} from 'react-router-dom';

type Params ={
    username : string | undefined;
}
const WelcomeComponent = () => {
    const {username} = useParams<Params>();
  return (
    <>
    <div>welcome!</div>
    <p>Welcome {username}.Click <Link to="/todos">here
    </Link>to manage your todos</p>
    </>
  )
}

export default WelcomeComponent;