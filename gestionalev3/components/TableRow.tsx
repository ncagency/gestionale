const TableRow = ({ label, value }:{ label:any, value:any }) => {
    console.log(value)
    return ( 
        <tr className="border-1 p-4">
        <td>{label}</td>
        <td>{value}</td>
    </tr>
    )
  
};


export default TableRow