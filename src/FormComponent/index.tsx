import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "antd";

import "./index.css";

interface Field {
  id: string;
  type: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}

interface FormComponentProps {
  formId: string;
  fields: Field[];
  onSubmit: (values: Record<string, string>) => void;
  setIsSubmitEnabled: (val: boolean) => void;
}

const FormComponent = ({
  formId,
  fields,
  onSubmit,
  setIsSubmitEnabled,
}: FormComponentProps) => {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc: Record<string, string>, field) => {
      if (field.defaultValue) {
        acc[field.id] = field.defaultValue;
      } else {
        acc[field.id] = "";
      }
      return acc;
    }, {})
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
  };

  useEffect(() => {
    if (fields.some((field) => field.required && !values[field.id])) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(true);
    }
  }, [values]);

  return (
    <form id={formId} onSubmit={handleSubmit} className="container">
      {fields.map((field) => {
        switch (field.type) {
          case "inputText":
            return (
              <Input
                className="custom-input"
                key={field.id}
                allowClear
                id={field.id}
                placeholder={field.label}
                value={values[field.id]}
                onChange={handleChange}
              />
            );
          case "inputEmail":
            return (
              <Input
                className="custom-input"
                type="email"
                allowClear
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={values[field.id]}
                onChange={handleChange}
              />
            );
          case "inputPassword":
            return (
              <Input.Password
                className="custom-input"
                allowClear
                key={field.id}
                id={field.id}
                placeholder={field.label}
                value={values[field.id]}
                onChange={handleChange}
              />
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormComponent;
