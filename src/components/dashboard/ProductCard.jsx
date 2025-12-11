import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchCard } from "@/features/cards/fetchCards";
import Card from "./components/Card";

export default function ProductCard() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [cardKind, setCardKind] = useState("Prepaid");

  const { cardNo, limit, cardType, expiryMonth, expiryYear } = useSelector(
    (state) => state.cards
  );

  console.log(`Card No: ${cardNo} \n Limit: ${limit}`);

  useDocumentTitle("Manage Cards");

  useEffect(() => {
    if (!isAuth) return;
    dispatch(fetchCard());
  }, [isAuth, dispatch]);

  return (
    <>
      <h1>Manage Cards</h1>
      <button className="tab-btn" onClick={() => setCardKind("Postpaid")}>Postpaid Cards</button>
      <button className="tab-btn" onClick={() => setCardKind("Prepaid")}>Postpaid Cards</button>

      {cardKind === "Prepaid" && (
        <Card>
          <span>Card No. {cardNo}</span>
          <span>Limit: {limit}</span>
          <span>Card Type: {cardType}</span>
          <span>
            Expiry: {expiryMonth}/{expiryYear}
          </span>
        </Card>
      )}
      {cardKind === "Postpaid" && (
        <Card>
          <span>Postpaid Card No. {cardNo}</span>
          <span>Limit: {limit}</span>
          <span>Card Type: {cardType}</span>
          <span>
            Expiry: {expiryMonth}/{expiryYear}
          </span>
        </Card>
      )}
    </>
  );
}
