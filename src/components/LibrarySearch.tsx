"use client";

import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React from 'react'
import { fetchWorksheets } from '../actions/fetchWorksheets';
import { Input } from './ui/input';
import { Button } from './ui/button';

const LibrarySearch = ({ search }: { search?: string }) => {

    const router = useRouter()

    return (
        <form className='bg-slate-300 p-4 flex gap-4 rounded-md' action={fetchWorksheets}>
            <Input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" name='search' />
            <select className="select select-bordered w-full max-w-xs" defaultValue={"Language"} name='language'>
                <option value={"de"}>German</option>
                <option value={"fr"}>French</option>
            </select>
            <Button type="submit" className='btn'>Search</Button>
        </form>
    )
}

export default LibrarySearch