import React from 'react';
import './About.css';

const About = () => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
  };

  return (
    <div className="about-page" style={backgroundStyle}>
      <h1>Über diesen Adventskalender</h1>

      <div className="about-content-wrapper">
        <section className="author-section">
          <img
            src={`${process.env.PUBLIC_URL}/images/silketost.jpg`}
            alt="Author"
            className="author-photo"
          />
          <div className="author-bio">
            <h3>Über die Autorin</h3>
            <p>Die Autorin <span style={{ fontWeight: 'bold' }}>Silke Tost</span> stammt ursprünglich aus der Region Osnabrück – daher spielt auch die Geschichte im Haus Nr. 24 dort. Heute lebt sie in Minnesota (USA). Ihre große Leidenschaft gilt dem Adventskalender: Fast das ganze Jahr über sammelt sie Ideen und kleine Schätze, um ihre Familie und Freunde mit liebevoll gestalteten Adventskalendern zu überraschen. Ebenso gerne steht sie in der Küche und entdeckt neue Geschmacksrichtungen. So war es nur naheliegend, ihre Geschichte rund um das Haus Nr. 24 mit kulinarischen Eindrücken aus unterschiedlichen Kulturen zu verbinden und daraus einen ganz besonderen Adventskalender entstehen zu lassen.</p>
          </div>
        </section>

        <section className="contributors-section">
          <h3>Umsetzung und Gestaltung</h3>
          <p>Die Illustrationen der Texte und die Gestaltung und Realisierung dieser Webseite sind von Andre Tost.</p>
          <p>Die Vorleserin heisst Nadja und ist KI-generiert.</p>
        </section>
      </div>
    </div>
  );
};

export default About;
