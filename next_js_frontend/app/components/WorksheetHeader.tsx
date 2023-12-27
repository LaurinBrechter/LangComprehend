"use client";
import React from 'react'
import updateWorksheet from '../actions/updateWorksheet';

const WorksheetHeader = ({ name, id }: { name: string, id: Number }) => {

    const actionUpdated = updateWorksheet.bind(null, id)

    return (
        <form className="flex justify-between items-center" action={actionUpdated}>
            <input type="text" placeholder="Type here" className="font-bold text-3xl input w-full max-w-xs bg-slate-300" defaultValue={name} name='ws-name' />
            <select className="select select-bordered max-w-xs select-sm" name='ws-visibility'>
                <option value={"public"}>Public</option>
                <option value={"private"}>Private</option>
            </select>
            <button className="btn btn-sm" type='submit'>Save</button>
        </form>
    )
}

export default WorksheetHeader