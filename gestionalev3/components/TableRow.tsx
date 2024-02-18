const TableRow = ({ label, value }:{ label:any, value:any }) => {
    let text;

    if (value == true) {
        text = "Si"
    } else if (value == false) {
        text = "No"
    } else {
        text = value
    }

    return ( 
        <tr className="border-1 p-4">
        <td>{label}</td>
        <td>{text}</td>
    </tr>
    )
  
};


export default TableRow