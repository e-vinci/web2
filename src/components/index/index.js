import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import contentConfiguration from "../../data/content-configuration.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Index = ({ isSearchable }) => {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        allContentJson {
          edges {
            node {
              id
              week
              subject
              isOptional
              skillsL1
              skillsL2
              courseDemos {
                type
                title
                uri
              }
              courseFiles {
                type
                title
                uri
              }
              exerciseInstructions {
                type
                title
                uri
              }
              exerciseSolutions {
                type
                title
                uri
              }
              courseVideos {
                type
                title
                uri
              }
            }
          }
        }
        allMyPDFs: allFile(filter: { extension: { eq: "pdf" } }) {
          edges {
            node {
              relativePath
              publicURL
            }
          }
        }
      }
    `
  );

  const { edges: contents } = data.allContentJson;
  const { edges: pdfs } = data.allMyPDFs;

  // add a contentNumber to the contents
  const contentsWithNumber = contents.map(
    ({ node: content }, index) => (content.index = index + 1)
  );
  const [filteredContents, setFilteredContents] = useState(contents);
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setQuery(e.target.value);

    const filteredData = contents.filter((content) => {
      // destructure data from post frontmatter
      const { subject, skillsL1, skillsL2, index } = content.node;
      return (
        // standardize data with .toLowerCase()
        // return true if the subject, skills...
        // contains the query string
        subject.toLowerCase().includes(inputText.toLowerCase()) ||
        skillsL1.toLowerCase().includes(inputText.toLowerCase()) ||
        (inputText.length > 0 && parseInt(inputText) === index)
      );
    });

    if (filteredData && filteredData.length > 0)
      setFilteredContents(filteredData);
  };

  return (
    <div className="index">
      {isSearchable !== undefined ? (
        <input
          type="text"
          aria-label="Search"
          placeholder="Filtrez les contenus..."
          onChange={handleInputChange}
          className="index__search"
        />
      ) : (
        ""
      )}
      {filteredContents.map(({ node: content }) => (
        <div className="index__card">
          <div className="index__card__header" key={content.index}>
            {content.isOptional ? <FontAwesomeIcon icon={faPlusCircle} /> : ""}
            {"Partie " + content.index + " : " + content.subject}
          </div>

          <div className="index__card__content">
            {content.week !== undefined ? (
              <>
                <div className="index__card__content__title">Module</div>
                <div className="index__card__content__description">
                  {content.week}
                </div>
              </>
            ) : (
              ""
            )}

            {content.skillsL1.length > 0 ? (
              <>
                <div className="index__card__content__title">Skills L1</div>
                <div className="index__card__content__description">
                  {content.skillsL1}
                </div>
              </>
            ) : (
              ""
            )}

            {content.skillsL2.length > 0 ? (
              <>
                <div className="index__card__content__title">Skills L2</div>
                <div className="index__card__content__description">
                  {content.skillsL2}
                </div>
              </>
            ) : (
              ""
            )}

            {content.courseFiles.length > 0 ? (
              <>
                <div className="index__card__content__title">Document</div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.courseFiles.map((item, index) => (
                      <li
                        className="index__card__content__description__subitems__item"
                        key={index}
                      >
                        {pdfs.find(
                          (element) => element.node.relativePath === item.uri
                        ) !== undefined ? (
                          <a
                            /*href={withPrefix(
                              pdfs.find(
                                (element) =>
                                  element.node.relativePath === item.uri
                              ).node.publicURL
                            )}*/
                            href={
                              pdfs.find(
                                (element) =>
                                  element.node.relativePath === item.uri
                              ).node.publicURL
                            }
                            target="_blank"
                          >
                            {item.title}
                          </a>
                        ) : (
                          "Ressource non trouvée"
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}

            {content.courseDemos.length > 0 ? (
              <>
                <div className="index__card__content__title">Démos</div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.courseDemos.map((item, index) => (
                      <li
                        className="index__card__content__description__subitems__item"
                        key={index}
                      >
                        {item.uri.length > 0 ? (
                          <a
                            href={
                              contentConfiguration.demoCodeBaseUrl + item.uri
                            }
                            target="_blank"
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}

            {content.courseVideos.length > 0 ? (
              <>
                <div className="index__card__content__title">Vidéos</div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.courseVideos.map((item, index) => (
                      <li
                        className="index__card__content__description__subitems__item"
                        key={index}
                      >
                        <a href={item.uri} target="_blank">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}

            {content.exerciseInstructions.length > 0 ? (
              <>
                <div className="index__card__content__title">
                  Fiche d'exercices
                </div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.exerciseInstructions.map((item, index) => (
                      <li
                        className="index__card__content__description__subitems__item"
                        key={index}
                      >
                        {pdfs.find(
                          (element) => element.node.relativePath === item.uri
                        ) !== undefined ? (
                          <a
                            /*href={withPrefix(
                              pdfs.find(
                                (element) =>
                                  element.node.relativePath === item.uri
                              ).node.publicURL
                            )}*/
                            href={
                              pdfs.find(
                                (element) =>
                                  element.node.relativePath === item.uri
                              ).node.publicURL
                            }
                            target="_blank"
                          >
                            {item.title}
                          </a>
                        ) : (
                          "Ressource non trouvée"
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}

            {content.exerciseSolutions.length > 0 ? (
              <>
                <div className="index__card__content__title">Exercices</div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.exerciseSolutions.map((item, index) => (
                      <li
                        className="index__card__content__description__subitems__item"
                        key={index}
                      >
                        {item.uri.length > 0 ? (
                          <a
                            href={
                              contentConfiguration.exerciseCodeBaseUrl +
                              item.uri
                            }
                            target="_blank"
                          >
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;
