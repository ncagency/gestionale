import User from "./Search";


const UserRow = ({ user }: { user: User }) => {
    return (
      <div className="bg-success text-warning p-4 rounded-3 row my-2">
        <div className="col-6">
        <h1 className="fs-5">{user.info.nome} {user.info.secondo_nome} {user.info.cognome}</h1>
        </div>
        <div className="col-4">
        <p className=" fs-5 ml-5 bold">{user.info.dob}</p>
        </div>
        <div className="col-2 d-flex gap-2">
          <p className="fs-5">Visu</p>
          <p></p>
        </div>
      </div>
    );
  };
  
export const StudentView: React.FC<{ results: User[] }> = ({ results }) => {
    const containerHeight = 300;
  
    return (
      <div className="p-2 w-100 h-100 mt-4 rounded-2 border border-5 border-warning overflow-hidden">
        <div className="h-100 overflow-auto" style={{ maxHeight: `${containerHeight}px`, overflowX: "hidden" }}>
          {results.map((item: User, index: number) => (
            <div key={index}>
              <>
                <UserRow user={item as User} />
              </>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  