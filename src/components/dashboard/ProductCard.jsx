import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import Card from "./components/Card";

import { LuEye } from "react-icons/lu";

import "./product-card.css";

export default function ProductCard() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [cardKind, setCardKind] = useState("Prepaid");

  const { cardNo, limit, cardType, expiryMonth, expiryYear } = useSelector(
    (state) => state.cards
  );

  console.log(`Card No: ${cardNo} \n Limit: ${limit}`);

  useDocumentTitle("Manage Cards");

  useEffect(() => {
    if (!isAuth) return;
  }, [isAuth]);

  return (
    <>
      <h1>Manage Cards</h1>
      <button className="tab-btn" onClick={() => setCardKind("Postpaid")}>
        Credit Card
      </button>
      <button className="tab-btn" onClick={() => setCardKind("Prepaid")}>
        Debit Card
      </button>

      <div className="left__aligned__container">
        {cardKind === "Prepaid" && (
          <Card className="table__container__card card__info__container">
            <div className="card__img debit__card">
              <div className="card__chip"></div>
              <div className="card__logo"></div>
              <div className="card__number">{cardNo}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Card</th>
                  <th>Type</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="pill pill-info">{cardNo}</span>
                  </td>
                  <td>{cardType}</td>
                  <td>
                    <span className="pill pill-warning">
                      {expiryMonth}/{expiryYear}
                    </span>
                  </td>
                  <td>
                    <button className="primary-btn">
                      <LuEye />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}
        {cardKind === "Postpaid" && (
          <Card className="table__container__card card__info__container">
            <div className="card__img credit__card">
              <div className="card__chip"></div>
              <div className="card__logo"></div>
              <div className="card__number"></div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Card</th>
                  <th>Type</th>
                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="pill pill-info">{cardNo}</span>
                  </td>
                  <td>{cardType}</td>
                  <td>
                    <span className="pill pill-warning">
                      {expiryMonth}/{expiryYear}
                    </span>
                  </td>
                  <td>
                    <button className="primary-btn">
                      <LuEye />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </>
  );
}
