import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { getUsers, addUser, deleteUser, updateUser } from '../actions/userAction'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from 'react-bootstrap';
import {
    PERMISSION_LEVEL
} from '../constant/userConstant'
const Users = (props) => {


    const users = useSelector((store) => store.users)
    const { error, response, loading } = users
    const [salary, setSalary] = useState('')
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);

    const handleClose = () => { setShow(false); setUpdate(false) };

    const handleShow = () => setShow(true);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())

        if (response && response.status == 'success') {
            dispatch(getUsers())
        } else if (error) {
            alert('error')
        }
    }, [])

    useEffect(() => { }, [loading, response, error])



    const onAdd = () => {
        dispatch(addUser(name, salary))
        setShow(false)

        dispatch(getUsers())

    }

    const onCancel = () => {
        props.history.push('/')
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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {console.log(response)}
                        <tbody>
                            {response &&
                                response &&
                                response.length > 0 &&
                                response.map((user) => {
                                    return (

                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.employee_name}</td>
                                            <td>{user.employee_salary}</td>
                                            <td>
                                                <button className=""  type="button" onClick={() => { handleShow(); setName(user.employee_name); setSalary(user.employee_salary); handleUpdate(); setId(user.id) }} title="Edit" data-toggle="tooltip"><i className="material-icons mr-3" ></i></button>
                                                <a className="delete" title="Delete" data-toggle="tooltip " onClick={() => handleDelete(user.id)}><i className="material-icons"></i></a>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div><Transition.Root show={show} as={Fragment}>
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