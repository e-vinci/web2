import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import contentConfiguration from "../../data/content-configuration.json";

const Index = () => {
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

  return (
    <div className="index">
      {contents.map(({ node: content }, partNo) => (
        <div className="index__card">
          <div className="index__card__header">
            {"Partie " + (partNo + 1) + " : " + content.subject}
          </div>

          <div className="index__card__content">
            {content.week !== undefined ? (
              <>
                <div className="index__card__content__title">Module / Week</div>
                <div className="index__card__content__description">
                  {content.week}
                </div>
              </>
            ) : (
              ""
            )}

            <div className="index__card__content__title">Optionnel?</div>
            <div className="index__card__content__description">
              {content.isOptional !== undefined && content.isOptional
                ? "☑"
                : "☐"}
            </div>

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
                    {content.courseFiles.map((item) => (
                      <li className="index__card__content__description__subitems__item">
                        {pdfs.find(
                          (element) => element.node.relativePath === item.uri
                        ) !== undefined ? (
                          <a
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
                    {content.courseDemos.map((item) => (
                      <li className="index__card__content__description__subitems__item">
                        <a
                          href={contentConfiguration.demoCodeBaseUrl + item.uri}
                          target="_blank"
                        >
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

            {content.courseVideos.length > 0 ? (
              <>
                <div className="index__card__content__title">Vidéos</div>
                <div className="index__card__content__description">
                  <ul className="index__card__content__description__subitems">
                    {content.courseVideos.map((item) => (
                      <li className="index__card__content__description__subitems__item">
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
                    {content.exerciseInstructions.map((item) => (
                      <li className="index__card__content__description__subitems__item">
                        {pdfs.find(
                          (element) => element.node.relativePath === item.uri
                        ) !== undefined ? (
                          <a
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
                    {content.exerciseSolutions.map((item) => (
                      <li className="index__card__content__description__subitems__item">
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
