import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useEffect, useState } from "react";
import { getValue, handleChangeForName } from "../funcs";
import { generateHindiName } from "@/shared/funcs";
import { BlueButton } from "@/shared/components/Button";
import toast from "react-hot-toast";

const HindiName = ({ englishName, productDetails, setProductDetails }) => {
  const [loading, setLoading] = useState(false);
  const [generatedHindiName, setGeneratedHindiName] = useState(
    getValue("hi", productDetails) || ""
  );

  useEffect(() => {
    handleChangeForName("hi", generatedHindiName, setProductDetails);
    // setGeneratedHindiName(null);
  }, [generatedHindiName]);

  return (
    <div className="flex items-center gap-2">
      <Label styles="min-w-[50px]">Hindi&nbsp;:</Label>
      <BlueButton
        className="border px-2 py-2"
        loading={loading}
        onClick={async () => {
          if (englishName.length < 3) {
            toast.error(`अंग्रेज़ी नाम कम से कम 3 अक्षरों का होना चाहिए`);
          }

          await generateHindiName(
            englishName,
            setLoading,
            setGeneratedHindiName
          );
        }}
      >
        <>
          Get{"\u00A0"}Hindi{"\u00A0"}Name
        </>
      </BlueButton>
      <Input
        type="text"
        placeholder={`Type Hindi Name`}
        value={getValue("hi", productDetails)}
        onChange={(e) =>
          handleChangeForName("hi", e.target.value, setProductDetails)
        }
      />
    </div>
  );
};

export default HindiName;
