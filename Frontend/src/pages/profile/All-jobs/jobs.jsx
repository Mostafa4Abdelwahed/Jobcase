import { useDispatch, useSelector } from "react-redux";
import BoxJob from "./components/boxJob"
import { useEffect, useState } from "react";
import { Pagination, Button } from "@nextui-org/react";
import { fetchJobs, fetchJobsCount } from "../../../redux/apiCalls/jobApiCall";

const jobs = () => {
    const { user } = useSelector(state => state.auth)
    const { jobs } = useSelector(state => state.job)
    const { jobsCount } = useSelector(state => state.job)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(jobsCount / 9);
    const dispatch = useDispatch();


    useEffect(() => {
        window.scroll(0, 0)
        dispatch(fetchJobs(currentPage, user))
        dispatch(fetchJobsCount(user))
    }, [currentPage])
    return (
        <div className="bg-zinc-900 min-h-screen">
            <div className="container mx-auto text-white pt-5">
                <h1 className="text-2xl px-3 py-4">{jobsCount} Jobs Found</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 space-y-5 gap-5 lg:gap-0">
                    {
                        jobs.map((job, key) => {
                            return <BoxJob page={currentPage} key={key} details={job} />
                        })
                    }
                </div>
                <div className="flex flex-col py-11 gap-5">
                    <Pagination
                        total={totalPages}
                        color="default"
                        page={currentPage}
                        onChange={setCurrentPage}
                        className="mx-auto"
                        size="lg"
                    />
                    <div className={`${jobsCount <= 0 ? "hidden" : "flex"} mx-auto gap-2`}>
                        <Button
                            size="sm"
                            variant="flat"
                            color="default"
                            onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                        >
                            Previous
                        </Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="default"
                            onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default jobs