import Navbar from "../components/Navbar"
import Search from "../components/Search"

export default function Search_Page() {
    

    return (
      <main className="container-fluid d-flex flex-row">
        <Navbar />
        <div className="col-md-10 p-4">
            <Search />
        </div>
      </main>
    )
  }
  