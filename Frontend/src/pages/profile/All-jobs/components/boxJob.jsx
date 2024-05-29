import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Chip, useDisclosure } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem } from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import { MdOutlineGpsFixed, MdWork } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { deleteJob, fetchJobs, fetchJobsCount, updateJob } from "../../../../redux/apiCalls/jobApiCall";

const boxJob = ({ details, page }) => {
    const dateTime = new Date(details.createdAt);
    const date = dateTime.toLocaleDateString("en-GB");
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const [addJobLoading, setAddJobLoading] = useState("");
    const [updtJobLoading, setUpdtJobLoading] = useState("");
    const jobTypes = ["Full Time", "Part Time", "Remotely", "Internship"];
    const jobStatus = ["Pending", "Interview", "Decline"];
    const modalDelete = useDisclosure();
    const modalEdit = useDisclosure();
    const [job, setJob] = useState({
        position: details.position,
        company: details.company,
        location: details.location,
        jobType: details.jobType,
        status: details.status
    });

    const submitHandler = async () => {
        setAddJobLoading(true);
        await dispatch(deleteJob(user, details._id));
        dispatch(fetchJobs(page, user));
        dispatch(fetchJobsCount(user));
        setAddJobLoading(false);
        modalDelete.onClose();

    }

    const submitUpdateHandler = async () => {
        setUpdtJobLoading(true);
        await dispatch(updateJob(user, details._id, job));
        dispatch(fetchJobs(page, user));
        setUpdtJobLoading(false);
        modalEdit.onClose();
    }

    return (
        <Fragment>
            <Card className="mx-4">
                <CardHeader className="flex gap-3">
                    <div className="logo-avatar bg-black w-12 h-12 rounded text-center flex items-center justify-center">
                        <h1 className="text-3xl">{details.position.split("")[0]}</h1>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-md line-clamp-1">{details.position}</p>
                        <p className="text-small text-default-500">{details.company}</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-2 gap-5">
                        <span className="flex items-center gap-2">
                            <MdWork />
                            {details.jobType}
                        </span>
                        <span className="flex items-center gap-2">
                            <SlCalender />
                            {date}
                        </span>
                        <span className="flex items-center gap-2">
                            <MdOutlineGpsFixed />
                            {details.location}
                        </span>
                        <Chip color={details.status === "Pending" ? "default" : details.status === "Decline" ? "danger" : "warning"}>
                            {details.status}
                        </Chip>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="space-x-4">
                    <Button onClick={() => { modalEdit.onOpen() }} color="warning">Edit</Button>
                    <Button onClick={() => { modalDelete.onOpen() }} color="danger">Delete</Button>
                </CardFooter>
            </Card>

            <Modal
                size="lg"
                isOpen={modalDelete.isOpen}
                onClose={modalDelete.onClose}
            >
                <ModalContent className="bg-zinc-900">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex text-white flex-col gap-1">Are You Sure ?</ModalHeader>
                            <ModalBody className="bg-zinc-800">
                                <p className="text-xl text-white">Are you sure you want to delete this task? If it is deleted it cannot be restored again</p>
                            </ModalBody>
                            <ModalFooter className="grid grid-cols-2">
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={addJobLoading} onClick={submitHandler} color="default">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                size="2xl"
                isOpen={modalEdit.isOpen}
                onClose={modalEdit.onClose}
            >
                <ModalContent className="bg-zinc-900">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex text-white flex-col gap-1">Job Update</ModalHeader>
                            <ModalBody className="bg-zinc-800">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <Input value={job.position} onChange={(e) => { setJob({ ...job, position: e.target.value }) }} color="default" type="text" label="Position" placeholder="Enter your position" />
                                    <Input value={job.company} onChange={(e) => { setJob({ ...job, company: e.target.value }) }} color="default" type="text" label="Company" placeholder="Enter your company" />
                                    <Input value={job.location} onChange={(e) => { setJob({ ...job, location: e.target.value }) }} color="default" type="text" label="Job Location" placeholder="Enter Location company" />
                                    <Select
                                        label="Select Job Type"
                                        className="max-w-full"
                                        defaultSelectedKeys={[job.jobType]}
                                        value={job.jobType}
                                        onChange={(e) => { setJob({ ...job, jobType: e.target.value }) }}
                                    >
                                        {/* <SelectItem onSelect={true} value={job.jobType}>
                                            {job.jobType}
                                        </SelectItem> */}

                                        {
                                            jobTypes.map((job) => {
                                                return (
                                                    <SelectItem key={job} value={job}>
                                                        {job}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </Select>
                                    <Select
                                        label="Select Status"
                                        className="max-w-full"
                                        defaultSelectedKeys={[job.status]}
                                        value={job.status}
                                        onChange={(e) => { setJob({ ...job, status: e.target.value }) }}
                                    >
                                        {
                                            jobStatus.map((status) => {
                                                return (
                                                    <SelectItem key={status} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>

                            </ModalBody>
                            <ModalFooter className="grid grid-cols-2">
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={updtJobLoading} onClick={submitUpdateHandler} color="default">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </Fragment>
    )
}

export default boxJob