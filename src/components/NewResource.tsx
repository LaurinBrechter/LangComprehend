"use client";

import { getVideoData } from "@/actions/getVideoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from 'lucide-react';
import ImportYoutubeVideoForm from "./forms/ImportYoutubeVideoForm";

export default function NewResource({ email }: { email: string }) {
  const [resourceType, setResourceType] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger className="fixed bottom-5 left-5 bg-blue-200 rounded-full "><Plus width={70} height={70}/></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Resource</DialogTitle>
          <DialogDescription>Create a new resource</DialogDescription>
        </DialogHeader>
        <Select
          onValueChange={(value) => {
            setResourceType(value);
          }}
        >
          <SelectTrigger id="framework">
            <SelectValue placeholder="Select a type of resource" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        {resourceType === "youtube" ? (
          <ImportYoutubeVideoForm email={email} />
        ) : (
          <div>PDF</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
