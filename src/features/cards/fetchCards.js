import axios from "axios";
import { fetchCardData } from "./cardSlice";

export const fetchCard = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token Found");
      return;
    }

    const res = await axios.get("http://localhost:3000/cards/my-card", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.cardDetails) {
      const cardData = {
        id: res.data.cardDetails._id,
        cardNo: res.data.cardDetails.cardNumber,
        limit: res.data.cardDetails.limit,
        cardType: res.data.cardDetails.cardType,
        expiryMonth: res.data.cardDetails.expiryMonth,
        expiryYear: res.data.cardDetails.expiryYear,
        token: token, // Pass the token along
      };
      console.log(cardData);
      dispatch(fetchCardData(cardData));
    } else {
      console.error("No accountDetails in response:", res.data.message);
    }
  } catch (err) {
    console.error("Error fetching account:", err);
  }
};
