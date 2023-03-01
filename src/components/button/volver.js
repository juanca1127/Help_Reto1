const volver = ({ clase, stilos }) => {
  const back = () => {
    window.history.back();
  };

  return (
    <>
      <button onClick={() => back()} className={clase}>
        Volver
      </button>
    </>
  );
};
export default volver;
