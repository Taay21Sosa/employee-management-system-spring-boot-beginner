import {useEffect, useState} from "react";
import {listEmployees} from "../service/EmployeeService.js";

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch((error) => {
            console.error(error);
        })
    })

    return (
        <section className="section">
            <h1>List Of Employees</h1>

            <div className="flex justify-end">
                <button className="btn-primary">
                    Add Employee
                </button>
            </div>

            <div className="table-container">
                <table className="table-striped">
                    <thead>
                    <tr>
                        <th>
                            <p>Id</p>
                        </th>
                        <th>
                            <p>First Name</p>
                        </th>
                        <th>
                            <p>Last Name</p>
                        </th>
                        <th>
                            <p>Email</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>
                                <p>{employee.id}</p>
                            </td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default ListEmployee
