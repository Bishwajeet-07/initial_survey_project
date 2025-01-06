import { Link } from "react-router-dom";
import "./Home.css"
const Home=()=>{
    return(
        <div className=" text-center">
            <h1 className=" text-3xl font-bold mt-10">Get Ready for Your Running Journey!</h1>
            <p className=" text-xl mt-6">Answer a few questions to help us understand your running profile better.</p>
            <Link to="/personal_information" className=" inline-block text-white px-8 bg-black py-2 rounded-lg mt-6 text-2xl">Get Started</Link>
        </div>

        
    ) 
}

export default Home;