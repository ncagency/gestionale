
import ViewButton from "./ViewButton"


const styleBox = {
  background: "linear-gradient(to right, #3b83ff, #2a59ac)",
}

const Row = ({data, type} : {data:any, type:string}) => {

    let single = data
    let id = single._id.toString()
    return (
          <div style={styleBox} className='d-flex justify-content-between align-items-center p-4 rounded-3 shadow'>
            <div className='fs-4 text-white'>{single.nome} {single.secondo_nome} {single.cognome}</div>
            <ViewButton id={id} type={type} />
          </div>
    )
  }

  export default Row