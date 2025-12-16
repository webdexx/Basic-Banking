export default function PasswordSetting() {
  return (
    <>
        <form style={{ width: "100%" }}>
          <div className="form-section">
            <h2>Change Password</h2>
            <div className="form-group">
              <div className="input_container">
                <label htmlFor="beneficiaryAccountNumber">
                  Old Password
                </label>
                <input
                  type="text"
                  name="beneficiaryAccountNumber"
                  id="beneficiaryAccountNumber"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input_container">
                <label htmlFor="beneficiaryName">New Password</label>
                <input
                  type="text"
                  name="beneficiaryName"
                  placeholder="Enter New Password"
                /><br />
                <input
                  type="text"
                  name="beneficiaryName"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="primary-btn" style={{width: "12rem"}}>
            Submit
          </button>
        </form>
    </>
  );
}
