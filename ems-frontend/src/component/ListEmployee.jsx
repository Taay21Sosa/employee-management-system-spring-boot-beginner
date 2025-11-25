import {useEffect, useState} from "react";
import {deleteEmployee, getEmployee, listEmployees} from "../service/EmployeeService.js";
import {useNavigate} from "react-router-dom";

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function newEmployee() {
        navigator("/add-employee");
    }

    function editEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <section className="section scrollbar-hidden">
            <h1>List Of Employees</h1>

            <div className="flex justify-end">
                <button className="btn-primary" onClick={newEmployee}>
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
                        <th>
                            <p>Actions</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>
                                <p>{employee.id}</p>
                            </td>
                            <td>
                                <p>{employee.firstName}</p>
                            </td>
                            <td>
                                <p>{employee.lastName}</p>
                            </td>
                            <td>
                                <p>{employee.email}</p>
                            </td>
                            <td className="actions" >
                                <button className="btn-edit" onClick={() => editEmployee(employee.id)}>Edit</button>
                                <button className="btn-delete" onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default ListEmployee
