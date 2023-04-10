import { useState } from "react";
import { Button, ConfigProvider } from "antd";
import FormComponent from "./FormComponent";

import "./App.css";

const config = [
  {
    id: "first_name",
    type: "inputText",
    label: "First Name",
    defaultValue: "Alexander",
  },
  {
    id: "last_name",
    type: "inputText",
    label: "Last Name",
  },
  {
    id: "email",
    type: "inputEmail",
    label: "Email",
    required: true,
  },
  {
    id: "password",
    type: "inputPassword",
    label: "Password",
    required: true,
  },
];

const App = () => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const formId = "TEST_FORM";

  return (
    <div className="card">
      <p className="eye">🙆🏼</p>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(255 85 50)",
          },
        }}
      >
        <FormComponent
          formId={formId}
          fields={config}
          onSubmit={(info) => console.log(info)}
          setIsSubmitEnabled={setIsSubmitEnabled}
        />
        <Button
          form={formId}
          htmlType="submit"
          type="primary"
          disabled={!isSubmitEnabled}
        >
          Submit
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default App;
