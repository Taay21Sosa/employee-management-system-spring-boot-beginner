import {useEffect, useState} from "react";
import {createEmployee, getEmployee, updateEmployee} from "../service/EmployeeService.js";
import {useNavigate, useParams} from "react-router-dom";

const Employee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (id) {
            getEmployee(id).then(response => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [])

    const navigator = useNavigate();

    const {id} = useParams();

    function pageTitle() {
        if (id) {
            return <h2>Edit Employee</h2>;
        } else {
            return <h2>Add Employee</h2>;
        }
    }

    function handleBackClick() {
        navigator("/employees");
    }

    function validateForm() {
        let valid = true;
        
        const errorsCopy = {...errors};

        if (firstName.trim()) {
            errorsCopy.firstName = "";
        } else {
            errorsCopy.firstName = "First name is required";
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = "";
        } else {
            errorsCopy.lastName = "Last name is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email address is required";
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = {firstName, lastName, email};
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then(response => {
                    console.log(response.data);
                    navigator("/employees");
                }).catch(error => {
                    console.log(error);
                });
            } else {
                createEmployee(employee).then(response => {
                    console.log(response.data);
                    navigator("/employees");
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    return (
        <section className="section">
            <button className="btn-back" onClick={handleBackClick}>
                <img src="/back-arrow.svg" alt="Back arrow"/>
            </button>
            
            <div className="add-employee-form">
                {pageTitle()}

                <form>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <button className="btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                </form>
            </div>
        </section>
    )
}
export default Employee
