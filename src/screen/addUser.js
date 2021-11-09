
import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../actions/userAction'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Users from '../screen/users'
import { Button, Modal } from 'react-bootstrap';

// const AddUser = (props) => {
// const [email, setEmail] = useState('')
// const [name, setName] = useState('')
// const dispatch = useDispatch()

// const addUserStore = useSelector((store) => store.addUser)
// const { loading, response, error } = addUserStore

// useEffect(() => {
//     if (response && response.status == 'success') {
//         props.history.push('/')
//     } else if (error) {
//         alert('error')
//     }
// }, [loading, response, error])
// const onAdd = () => {
//     dispatch(addUser(name, email))
// }

// const onCancel = () => {
//     props.history.push('/')
// }
//     return (
// <div>
// <form>
//     <div className="form-group">
//         <label for="exampleFormControlInput1">Email address</label>
//         <input type="email" className="form-control" id="" placeholder="name@example.com" onChange={(e) => {
//             setEmail(e.target.value)
//         }} />
//     </div>

//     <div className="form-group">
//         <label for="exampleFormControlInput1">Name</label>
//         <input type="name" className="form-control" id="" placeholder="abc" onChange={(e) => {
//             setName(e.target.value)
//         }} />
//     </div>

// </form>

//     <button onClick={onAdd} className="btn btn-success">
//         Add
//     </button>
//     <button onClick={onCancel} className="btn btn-danger float-end">
//         Cancel
//     </button>
// </div>
//     )

// }







const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

const AddUser = (props) => {
    const [open, setOpen] = useState(true)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()




    const addUserStore = useSelector((store) => store.addUser)
    const { loading, response, error } = addUserStore

    useEffect(() => {
        if (response && response.status == 'success') {
            props.history.push('/')
        } else if (error) {
            alert('error')
        }
    }, [loading, response, error])
    const onAdd = () => {
        dispatch(addUser(name, email))
    }

    const onCancel = () => {
        props.history.push('/')
    }

    return (
        <div>

            {/* <Users /> */}


            <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add  User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="" placeholder="name@example.com" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlInput1">Name</label>
                                <input type="name" className="form-control" id="" placeholder="abc" onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Add 
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </>
            <Transition.Root show={show} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
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
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-large text-gray-900">Add User</Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <div>
                                                        <form>
                                                            <div className="form-group">
                                                                <label for="exampleFormControlInput1">Email </label>
                                                                <input type="email" className="form-control" id="" placeholder="name@example.com" onChange={(e) => {
                                                                    setEmail(e.target.value)
                                                                }} />
                                                            </div>

                                                            <div className="form-group">
                                                                <label for="exampleFormControlInput1">Name</label>
                                                                <input type="name" className="form-control" id="" placeholder="abc" onChange={(e) => {
                                                                    setName(e.target.value)
                                                                }} />
                                                            </div>

                                                        </form>

                                                        <button onClick={onAdd} className="btn btn-success m-4">
                                                            Add
                                                        </button>
                                                        <button onClick={handleClose}className="btn btn-danger float-end">
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
        </div>
    )
}


export default AddUser;