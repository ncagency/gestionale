
import Navbar from "../../components/Navbar"


const UserDetails = (props: {}) => {

    console.log(props.type);
    return (
        <>
            

        </>
    )
}











const tabDetails = ({ params })=> {
    return (
        <main className="container-fluid d-flex flex-row">
                <Navbar />
                <div className="col-md-10 p-4">
                    <UserDetails type={params.type} />
                </div>
        </main>
    );
  }; 

export default tabDetails;