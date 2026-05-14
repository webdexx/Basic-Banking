import { fetchBenList } from "@/features/beneficiary/fetchBenificiary";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BeneficiaryList() {
    const dispatch = useDispatch();

    const {
        beneficiaries,
        benLoading,
        error
    } = useSelector((s) => s.beneficiaries);

    useEffect(() => {
        dispatch(fetchBenList());
    }, [dispatch]);

    if (benLoading) return <p>Loading beneficiaries...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="beneficiary-list">
            <h2>Beneficiary List</h2>

            {beneficiaries.length === 0 && <p>No beneficiaries found</p>}

            <ul>
                {beneficiaries.map((ben) => (
                    <li key={ben._id}>
                        {ben.benName} — {ben.benAccountNo} - {ben.benIfsc}
                    </li>
                ))}
            </ul>
        </div>
    );
}
