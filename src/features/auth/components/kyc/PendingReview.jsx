import Modal from "@components/dashboard/components/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PendingReview(){

    const { overallStatus } = useSelector((state) => state.kyc)

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="success__msg__container">
            <h1>Your Appilcation has been submited for Review</h1>
            <p>Please check this page after 24 hours</p>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                {overallStatus === "PENDING_REVIEW" && <h2>Your Application is under Review</h2>}
                                {overallStatus === "REJECTED" && <h1>Your Application is Rejected</h1>}
                <button onClick={() => setOpen(false)}>Close</button>
            </Modal>
            <button onClick={() => setOpen(true)}>Track Application</button>
            </div>
        </>
    )
}