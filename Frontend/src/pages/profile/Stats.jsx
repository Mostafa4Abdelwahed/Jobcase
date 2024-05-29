import { useEffect } from "react"
import { CiBoxList } from "react-icons/ci"
import { MdOutlinePending } from "react-icons/md"
import { PiChalkboardTeacher } from "react-icons/pi"
import { VscError } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { fetchJobsCount, fetchJobsDeclineCount, fetchJobsInterviewCount, fetchJobsPendingCount } from "../../redux/apiCalls/jobApiCall"


const Stats = () => {
  const { user } = useSelector(state => state.auth)
  const { jobsCount, PendingCount, InterviewCount, DeclineCount } = useSelector(state => state.job)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobsCount(user));
    dispatch(fetchJobsPendingCount(user));
    dispatch(fetchJobsInterviewCount(user));
    dispatch(fetchJobsDeclineCount(user));
  }, [user])
  
  return (
    <div className="bg-zinc-900 px-5 min-h-screen">
      <div className="grid container mx-auto pt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <article className="flex items-center gap-4 rounded-lg border dark:border-gray-700 border-gray-100 dark:bg-zinc-800 bg-white p-6">
          <span className="rounded-full dark:bg-zinc-900 bg-gray-100 p-3 dark:text-white text-black">
          <CiBoxList className="h-8 w-8" />
          </span>
          <div>
            <p className="text-2xl font-medium dark:text-white text-gray-900">{jobsCount ? jobsCount : 0}</p>

            <p className="text-sm text-gray-500">Total Applications</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border dark:border-gray-700 border-gray-100 dark:bg-zinc-800 bg-white p-6">
          <span className="rounded-full dark:bg-zinc-900 bg-gray-100 p-3 dark:text-white text-black">
          <MdOutlinePending className="w-8 h-8" />
          </span>
          <div>
            <p className="text-2xl font-medium dark:text-white text-gray-900">{PendingCount ? PendingCount : 0}</p>

            <p className="text-sm text-gray-500">Pending Applications</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border dark:border-gray-700 border-gray-100 dark:bg-zinc-800 bg-white p-6">
          <span className="rounded-full dark:bg-zinc-900 bg-gray-100 p-3 dark:text-white text-black">
          <PiChalkboardTeacher className="w-8 h-8" />
          </span>
          <div>
            <p className="text-2xl font-medium dark:text-white text-gray-900">{InterviewCount ? InterviewCount : 0}</p>

            <p className="text-sm text-gray-500">Interviews Scheduled</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border dark:border-gray-700 border-gray-100 dark:bg-zinc-800 bg-white p-6">
          <span className="rounded-full dark:bg-zinc-900 bg-gray-100 p-3 dark:text-white text-black">
          <VscError className="w-8 h-8" />
          </span>
          <div>
            <p className="text-2xl font-medium dark:text-white text-gray-900">{DeclineCount ? DeclineCount : 0}</p>

            <p className="text-sm text-gray-500">Jobs Declined</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Stats