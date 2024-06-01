import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Logo from "/logo.svg"
import { TbHomeStats } from "react-icons/tb"
import { BiFileFind } from "react-icons/bi"
import { MdAssignmentAdd } from "react-icons/md"
import { Link } from "react-router-dom";
import AddJob from "./../../components/addJob"
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <Navbar>
                <NavbarBrand>
                    <Link to="/">
                        <img src={Logo} width={100} alt="Logo" />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden text-white sm:flex gap-7" justify="center">
                    <NavbarItem>
                        <Link className="flex items-center gap-1" to="/">
                            <TbHomeStats />
                            Stats
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="flex items-center gap-1" to="/all-jobs">
                            <BiFileFind />
                            All Jobs
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <span onClick={() => { onOpen() }} className="flex items-center gap-1 cursor-pointer">
                            <MdAssignmentAdd />
                            Add Job
                        </span>
                    </NavbarItem>

                </NavbarContent>
                <NavbarContent justify="end">
                    <Dropdown>
                        <DropdownTrigger>
                            <NavbarItem>
                                <Avatar className="cursor-pointer" showFallback src='https://images.unsplash.com/broken' />
                            </NavbarItem>

                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem as="span" key="new">
                                <Link className="inline-flex h-full w-full" to="/profile">Profile</Link>
                            </DropdownItem>
                            <DropdownItem onClick={logoutHandler} key="delete" className="text-danger" color="danger">
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </NavbarContent>
                <AddJob isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            </Navbar>

            <div className="fixed z-50 flex md:hidden items-center justify-center gap-8 p-5 left-0 right-0 bottom-0 bg-zinc-900 text-white shadow-lg border-t-2">
                <Link className="flex items-center transition-all gap-1 hover:-translate-y-1" to="/">
                    <TbHomeStats />
                    Stats
                </Link>
                <Link className="flex items-center transition-all gap-1 hover:-translate-y-1" to="/all-jobs">
                    <BiFileFind />
                    All Jobs
                </Link>
                <span onClick={() => { onOpen() }} className="flex items-center transition-all gap-1 cursor-pointer hover:-translate-y-1">
                    <MdAssignmentAdd />
                    Add Job
                </span>
            </div>

        </div>
    )
}

export default Sidebar