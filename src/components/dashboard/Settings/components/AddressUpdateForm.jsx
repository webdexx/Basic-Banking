export default function AddressUpdateForm() {
  return (
    <>
      <form style={{ width: "40vw" }}>
        <div className="form-section">
          <h2>Change Correspondence Address</h2>
          <div className="">              
                <div className="address-grid">
                  <div className="form-group">
                    <div className="input_container">
                      <label htmlFor="corrStreet">Street</label>
                      <input
                        type="text"
                        id="corrStreet"
                        placeholder="Enter street address"
                        name="corrStreet"
                        // value={kycFormData.correspondenceAddress.street}
                        // onChange={(e) => {
                        //   setKycFormData({
                        //     ...kycFormData,
                        //     correspondenceAddress: {
                        //       ...kycFormData.correspondenceAddress,
                        //       street: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>
                  </div>

                  <div className="address-grid-two">
                    <div className="input_container">
                      <label htmlFor="corrCity">City</label>
                      <input
                        type="text"
                        id="corrCity"
                        placeholder="Enter city"
                        name="corrCity"
                        // value={kycFormData.correspondenceAddress.city}
                        // onChange={(e) => {
                        //   setKycFormData({
                        //     ...kycFormData,
                        //     correspondenceAddress: {
                        //       ...kycFormData.correspondenceAddress,
                        //       city: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="corrState">State</label>
                      <input
                        type="text"
                        id="corrState"
                        placeholder="Enter state"
                        name="corrState"
                        // value={kycFormData.correspondenceAddress.state}
                        // onChange={(e) => {
                        //   setKycFormData({
                        //     ...kycFormData,
                        //     correspondenceAddress: {
                        //       ...kycFormData.correspondenceAddress,
                        //       state: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>
                  </div>

                  <div className="address-grid-two">
                    <div className="input_container">
                      <label htmlFor="corrCountry">Country</label>
                      <input
                        type="text"
                        id="corrCountry"
                        placeholder="Enter country"
                        name="corrCountry"
                        // value={kycFormData.correspondenceAddress.country}
                        // onChange={(e) => {
                        //   setKycFormData({
                        //     ...kycFormData,
                        //     correspondenceAddress: {
                        //       ...kycFormData.correspondenceAddress,
                        //       country: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="corrPinCode">Pincode</label>
                      <input
                        type="text"
                        id="corrPinCode"
                        placeholder="Enter pincode"
                        // value={kycFormData.correspondenceAddress.pincode}
                        // onChange={(e) => {
                        //   setKycFormData({
                        //     ...kycFormData,
                        //     correspondenceAddress: {
                        //       ...kycFormData.correspondenceAddress,
                        //       pincode: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
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
