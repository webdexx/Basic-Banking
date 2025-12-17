import Loader from "@/components/ui/Loader";
import { useEffect, useState } from "react";

export default function PendingReview() {

    const [open, setOpen] = useState(false);
    const [messageWindow, setMessageWindow] = useState(false);

    useEffect(() => {
        if (open === true) {
            setTimeout(() => {
                setOpen(false);
                setMessageWindow(true);
            }, 800);
        }
    }, [open]);

    return (
        <>
            <div className="success__msg__container">
                <h1>Your Appilcation has been submited for Review</h1>
                <p>Please check this page after 24 hours</p>
                <Loader isOpen={open} onClose={() => setOpen(false)} />
                {messageWindow &&
                    <div className="message-window">
                        <h2>Under Review</h2>        
                    <button onClick={() => setMessageWindow(false)}>Close</button>
                    </div>
                }
                <button onClick={() => setOpen(true)}>Track Application</button>
            </div>
        </>
    )
}