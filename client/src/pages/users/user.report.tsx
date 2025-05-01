import style from "../../styles/pages/pages.module.css"
import IUsers from "../../types/interface.user";
import Report from "../../utils/generate-reports";

const ReportsUsers: React.FC = () => {
    const columns = [ "_id", "Create At", "Email", "Name", "Password", "Phone", "Update At" ];

    const mapDataToRow = (users: IUsers) => (
        <>
            <td>{users._id}</td>
            <td>{users.createdAt}</td>
            <td>{users.email}</td>
            <td>{users.name}</td>
            <td>{users.password}</td>
            <td>{users.phone}</td>
            <td>{users.updatedAt}</td>
        </>
    );

    return (
        <div className={style[ 'pages' ]}>
            <Report
                endpoint="http://localhost:3001/api/v1/users/"
                columns={columns}
                mapDataToRow={mapDataToRow}
                fileName="users_report"
            />
        </div>
    );
}

export default ReportsUsers;