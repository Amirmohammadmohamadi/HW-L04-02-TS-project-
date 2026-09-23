import { useLocation, useParams } from "react-router-dom";

const TestPage = ()=> {
    const location = useLocation();
    const params = useParams();
    console.log(location);
    console.log(params);
    return <div style={{color:"white"}}>Test Page{params.id}</div>
};

export default TestPage;