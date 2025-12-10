import Loader from "@/components/ui/Loader";
import { useState } from "react";

export default function PendingReview(){

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="success__msg__container">
            <h1>Your Appilcation has been submited for Review</h1>
            <p>Please check this page after 24 hours</p>
            <Loader isOpen={open} onClose={() => setOpen(false)} />
            <button onClick={() => setOpen(true)}>Track Application</button>
            </div>
        </>
    )
}