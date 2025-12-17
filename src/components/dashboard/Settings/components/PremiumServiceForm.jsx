export default function PremiumServiceForm() {
  return (
    <>
      <form style={{ width: "100%" }}>
        <div className="form-section">
          <h2>Subscribe to Premium</h2>
          <div className="form-group">
            <div className="input_container">
              <label htmlFor="beneficiaryAccountNumber">OTP</label>
              <input
                type="text"
                name="beneficiaryAccountNumber"
                id="beneficiaryAccountNumber"
                placeholder="Enter OTP"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="primary-btn"
          style={{ width: "12rem" }}
        >
          Proceed
        </button>
      </form>
    </>
  );
}
