import React from "react";
import { Button } from "./ui/button";
import { useTranslation } from "next-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string | undefined) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Button
      onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
      variant={"ghost"}
      className="mr-2"
    >
      {i18n.language === "en" ? "العربية" : "English"}
    </Button>
  );
};

export default LanguageSwitcher;
