import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addNewJob, fetchJobs, fetchJobsCount } from "../../redux/apiCalls/jobApiCall";

const addJob = ({ isOpen, onOpen, onClose }) => {
    const jobTypes = ["Full Time", "Part Time", "Remotely", "Internship"];
    const jobStatus = ["Pending", "Interview", "Decline"];
    const [addJobLoading, setAddJobLoading] = useState(false);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [job, setJob] = useState({
        position: "",
        company: "",
        location: "",
        jobType: "",
        status: ""
    });

    const submitHandler = async () => {
        setAddJobLoading(true);
        try {
            dispatch(addNewJob(user, job));
            dispatch(fetchJobs(1, user));
            dispatch(fetchJobsCount(user));
        } finally {
            setAddJobLoading(false);
        }
    }
    return (
        <div>
            <Modal
                size="2xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent className="bg-zinc-900">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex text-white flex-col gap-1">Add Job</ModalHeader>
                            <ModalBody className="bg-zinc-800">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <Input isRequired value={job.position} onChange={(e) => { setJob({ ...job, position: e.target.value }) }} color="default" type="text" label="Position" placeholder="Enter your position" />
                                    <Input isRequired value={job.company} onChange={(e) => { setJob({ ...job, company: e.target.value }) }} color="default" type="text" label="Company" placeholder="Enter your company" />
                                    <Input isRequired value={job.location} onChange={(e) => { setJob({ ...job, location: e.target.value }) }} color="default" type="text" label="Job Location" placeholder="Enter Location company" />
                                    <Select
                                        isRequired
                                        label="Select Job Type"
                                        className="max-w-full"
                                        value={job.jobType}
                                        onChange={(e) => { setJob({ ...job, jobType: e.target.value }) }}
                                    >
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
                                        isRequired
                                        label="Select Status"
                                        className="max-w-full"
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
                                <Button isLoading={addJobLoading} onClick={submitHandler} color="default">
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default addJob