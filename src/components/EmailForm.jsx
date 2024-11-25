import React, { useState, useEffect } from "react";
import "/src/index.css"; // Importa los estilos

function EmailForm({
  showSubject = false,
  subject = "",
  message = "",
  title = "",
  isLastShowedForm = false,
  onNext,
  onSubmit,
  onSubjectChange,
  onMessageChange,
}) {
  const [formData, setFormData] = useState({
    subject,
    message,
  });

  useEffect(() => {
    setFormData({
      subject,
      message,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "subject" && onSubjectChange) {
      onSubjectChange(value);
    } else if (name === "message" && onMessageChange) {
      onMessageChange(value);
    }
  };

  return (
    <div className="email-form">
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        {showSubject ? (
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Escribe ..."
            />
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe ..."
            rows="6"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Atras
          </button>
          {isLastShowedForm ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Enviar
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onNext}>
              Siguiente
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmailForm;
