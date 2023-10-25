import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faC, faN} from '@fortawesome/free-solid-svg-icons'
import { faBootstrap, faCss3Alt, faHtml5, faJava, faReact, faSquareJs } from '@fortawesome/free-brands-svg-icons';
export default function Home() {
  
      // var typed = new Typed("#element", {
      //   strings: [" Problem Solver", "Web Designer", "Full Stack Developer"],
      //   typeSpeed: 50,
      // });
      

  return (
    <div className='home'>

      <section className="study">
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faC} size='8x' /> 
          </div>
          <div className="tech-tag">
            <h2>Dec 2021</h2>
            <p>My first and the starting programming language is C as It was also in the course of my BTECH 1st year and 2nd year hence I learned the BASICS of C language and Data Structure in C language</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faJava} size='8x' id='java'/> 
            <h3>Java</h3>
          </div>
          <div className="tech-tag">
            <h2>August 2022</h2>
            <p>Java is my main programming language as I have spend a long time to study the BASICS of JAVA , Data Structure and Algorithm in JAVA language ans Object Oriented Programming in JAVA language</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faHtml5} size='8x' /> 
            <h3>HTML</h3>
          </div>
          <div className="tech-tag">
            <h2>December 2022</h2>
            <p>It was the initial Starting for my web development journey as a beginner I started with HTML(Hyper Text Markup Language)</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faCss3Alt} size='8x' /> 
            <h3>CSS</h3>
          </div>
          <div className="tech-tag">
            <h2>December 2022</h2>
            <p>It was the initial Starting for my web development journey as a beginner I started with HTML and here I also focused on CSS(Cascading Style Sheet) as It gives a good look to the HTML</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faSquareJs} size='8x' /> 
            <h3>JavaScript</h3>
          </div>
          <div className="tech-tag">
            <h2>May 2021</h2>
            <p>After having a good knowledge of HTML and CSS, I moved to JavaScript as It is used in Front-end and Back-end of and web-app and provides some Dynamic properties too</p>
          </div>
        </div>
        
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faBootstrap} size='8x' /> 
            <h3>Bootstrap</h3>
          </div>
          <div className="tech-tag">
            <h2>May 2021</h2>
            <p>Bootstrap is an toolkit which makes the web development very fast and dynamic, It is an predefined CSS and JavaScript containing tool, I spend some time to learn How to use Bootstrap in my projects</p>
          </div>
        </div>
        
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faReact} size='8x' /> 
            <h3>ReactJS</h3>
          </div>
          <div className="tech-tag">
            <h2>May 2021</h2>
            <p>React is an JavaScript library for front-end only and I spend a lot of time in learning ReactJS and its properties like : hooks, routing , etc</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faN} size='8x' id='N'/> 
            <h3>NextJS</h3>
          </div>
          <div className="tech-tag">
            <h2>May 2021</h2>
            <p>NextJs is an a complete package for web development, It is a ReactJS framework but as we know ReactJS is only an front-end libreary but NextJS is a not only for Front-end, It can be used for Back-end develoment too.</p>
          </div>
        </div>

      </section>

      <section className="project">
        <div className="proj">

        </div>
      </section>
    </div>
  )
}

// export async function generateStaticParams() {
//   return null;
// }