import touch from "assets/icons/iconoHelpeers.png";
const RueSpinners = ({ size }) => {
  return (
    <>
      <div className="contianer-fluid">
        <div className="row">
          <div
            className={` col-12 animate__animated  animate__flash animate__slower animate__infinite`}
          >
            <img width={size} src={touch} alt="logo rue" />
          </div>
        </div>
      </div>
    </>
  );
};
export default RueSpinners;
