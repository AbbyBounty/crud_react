import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { getUsers, addUser, deleteUser, updateUser } from '../actions/userAction'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from 'react-bootstrap';
import Pagination from './Pagination'
import axios from 'axios';
import {
    PERMISSION_LEVEL
} from '../constant/userConstant'
const Users = () => {


    const [salary, setSalary] = useState('')
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);

    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    //number of users to display on single page 
    const [usersPerPage] = useState(5);

    const [order, setOrder] = useState("ASC")

    const handleClose = () => { setShow(false); setUpdate(false) };

    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const [searchField, setSearchField] = useState("");




    useEffect(() => {

        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:8000/users');
            setUserList(res.data);
        };

        fetchUsers();



    }, [])


    const filteredcategory = userList.filter(
        user => {
            return (
                user
                    .employee_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );

    // Get current posts
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const onAdd = () => {
        dispatch(addUser(name, salary))
        setShow(false)

        dispatch(getUsers())

    }



    const handleDelete = (id) => {
        dispatch(deleteUser(id))

        dispatch(getUsers())
    }

    const handleUpdate = () => {
        setUpdate(true)
    }

    const onUpdate = (id, salary, name) => {
        dispatch(updateUser(id, salary, name))
        dispatch(getUsers())



    }


    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...userList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            console.log("🚀 ~ file: users.js ~ line 90 ~ sorting ~ sorted", sorted)
            setUserList(sorted);
            setOrder("DSC");
        }

        if (order === "DSC") {
            const sorted = [...userList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUserList(sorted);
            setOrder("ASC");
        }
    }

    const handleChange = e => {
        setSearchField(e.target.value);

    };
 

    return (
        < div >
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                            <div className="col-sm-4">
                                <Button type="button" onClick={handleShow} className="btn btn-info add-new m-5" ><i className="fa fa-plus"></i> Add New</Button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 relative mx-auto text-gray-600 mb-6 flex justify-end">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search" onChange={handleChange} />
                        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                        </button>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th onClick={() => sorting("id")}>Id</th>
                                <th onClick={() => sorting("employee_name")}>Name</th>
                                <th onClick={() => sorting("employee_salary")}>salary</th>
                                <th onClick={() => sorting("permission_level")}>permission level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                filteredcategory.map((user, i) => {
                                    return (

                                        <tr key={i}>
                                            <td>{user.id} </td>
                                            <td>{user.employee_name}</td>
                                            <td>{user.employee_salary}</td>
                                            <td>{user.permission_level}</td>
                                            <td>
                                                {user.permission_level >= PERMISSION_LEVEL ? <button className="" type="button" onClick={() => { handleShow(); setName(user.employee_name); setSalary(user.employee_salary); handleUpdate(); setId(user.id) }} title="Edit" data-toggle="tooltip"><i className="material-icons mr-3" ></i></button> : <button className="" style={{ "cursor": "not-allowed" }} disabled type="button" onClick={() => { handleShow(); setName(user.employee_name); setSalary(user.employee_salary); handleUpdate(); setId(user.id) }} title="Edit" data-toggle="tooltip"><i className="material-icons mr-3" ></i></button>}
                                                {user.permission_level >= PERMISSION_LEVEL ? <button className="delete" title="Delete" data-toggle="tooltip " onClick={() => handleDelete(user.id)}><i className="material-icons"></i></button> : <button className="delete" style={{ "cursor": "not-allowed" }} disabled title="Delete" data-toggle="tooltip " onClick={() => handleDelete(user.id)}><i className="material-icons"></i></button>}
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>


            </div>

            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={userList.length}
                paginate={paginate}
            />
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={handleClose}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex ">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-md">
                                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">


                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <div>
                                                        <form>
                                                            <div className="form-group">
                                                                <label for="exampleFormControlInput1">Salary </label>
                                                                <input type="email" className="form-control" id="" value={salary} onChange={(e) => {
                                                                    setSalary(e.target.value)
                                                                }} />
                                                            </div>

                                                            <div className="form-group">
                                                                <label for="exampleFormControlInput1">Name</label>
                                                                <input type="name" className="form-control" id="" value={name} onChange={(e) => {
                                                                    setName(e.target.value)
                                                                }} />
                                                            </div>

                                                        </form>
                                                        {update ? <button onClick={() => { onUpdate(id, salary, name) }} className="btn btn-success m-4">
                                                            update
                                                        </button> : <button onClick={onAdd} className="btn btn-success m-4">
                                                            Add
                                                        </button>}

                                                        <button onClick={handleClose} className="btn btn-danger">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>



        </div >
    )
}

export default Users;