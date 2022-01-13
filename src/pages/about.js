import React from "react";
import MainLayout from "../components/main-layout";
import Section from "../components/section";
import Content from "../components/content";

const AboutPage = () => {
  return (
    <MainLayout>
      <Section className="pb-3">
        <Content>
          <h3 className="">Au sujet de ce cours</h3>
          <p className="pt-3">Les buts de ce cours sont de :</p>
          <ul className="list"> 
            <li>
              découvrir ce qu'est une application JAX-RS ;
            </li>   
            <li>
              réaliser des Backends & RESTful APIs via Jakarta EE ;
            </li>
            <li>
              consommer des RESTful APIs à l'aide de clients légers.
            </li>           
          </ul>
          <p className="pt-3">
            Si vous souhaitez participer à la mise à jour des contenus du cours, n’hésitez
            pas à faire part de modifications en soumettant des Pull Requests ou
            des des Issues sur le &nbsp;
            <a href="https://github.com/e-vinci/baja" target="_blank">
              web repository de ce website.
            </a>
          </p>
          <p className="pt-3">
            Nous vous souhaitons une belle découverte de ces technologies !
          </p>

          <p className="pt-3 text--hand-written">e-Baron</p>
        </Content>
      </Section>
    </MainLayout>
  );
};

export default AboutPage;
