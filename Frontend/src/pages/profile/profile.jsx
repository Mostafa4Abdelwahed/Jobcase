import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUser, updateUser } from '../../redux/apiCalls/authApiCall';

const profile = () => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { user } = useSelector(state => state.auth)
    const { profile } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [myUser, setMyUser] = useState({});

    useEffect(()=>{
        dispatch(ProfileUser(user));
    },[profile])




    const submitHandler = ()=>{
        setLoadingSubmit(true);
        dispatch(updateUser(user, myUser));
        setLoadingSubmit(false)
    }
    return (
        <div className="bg-zinc-900 px-5 md:px-0 min-h-screen">
            <div className="max-w-3xl mx-auto text-white pt-5">
                <form className='grid grid-cols-1 gap-5'>
                <Input type="text" value={myUser.name} onChange={(e)=>{setMyUser({...myUser, name: e.target.value})}} label="Name"  placeholder={profile.name} />
                <Input type="email" value={myUser.email} onChange={(e)=>{setMyUser({...myUser, email: e.target.value})}} label="Email" placeholder={profile.email} />
                <Button onClick={submitHandler} isLoading={loadingSubmit} >Save Changes</Button>
                </form>
            </div>
        </div>

    )
}

export default profile