"use client";

import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React from 'react'
import { fetchWorksheets } from '../actions/fetchWorksheets';

const LibrarySearch = ({ search }: { search?: string }) => {

    const router = useRouter()

    return (
        <form className='bg-slate-300 p-4 flex gap-4' action={fetchWorksheets}>
            <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" name='search' />
            <select className="select select-bordered w-full max-w-xs" defaultValue={"Language"} name='language'>
                <option value={"de"}>German</option>
                <option value={"fr"}>French</option>
            </select>
            <button type="submit" className='btn'>Search</button>
        </form>
    )
}

export default LibrarySearch