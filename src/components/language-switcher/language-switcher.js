import React from "react";
import { useIntl } from "react-intl";
import { Link } from "gatsby";

const LanguageSwitcher = () => {
  const { messages } = useIntl();
  const { langsMenu } = messages;

  console.log("langsMenu in Language Switcher : ", langsMenu);
  if (langsMenu?.length <= 1) return null;

  return (
    <div>
      <ul className="menu">
        {langsMenu?.map((language) =>
          ! language.selected ? (
            <li key={language?.langKey}>
              <Link to={language?.link} language={language?.langKey}>
                {language?.langKey}
              </Link>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};
export default LanguageSwitcher;
