import React, { useState } from "react";
function ActionButtons({ onNext }) {
  return (
    <div className="actions">
      <button className="button button-cancel">Cancelar</button>
      <button className="button button-next" onClick={onNext}>
        Siguiente
      </button>
    </div>
  );
}

export default ActionButtons;
