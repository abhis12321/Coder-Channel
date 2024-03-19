import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faC, faN} from '@fortawesome/free-solid-svg-icons'
import { faBootstrap, faCss3Alt, faGithub, faHtml5, faInstagram, faJava, faLinkedin, faLinkedinIn, faReact, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
// import Typewriter from "typewriter-effect";
// import  A from '../public/Ab1.jpg'

export default function Home() {
  
  return (
    <div className='home'>
      <div className="intro">
          <h3 className='intro-tag'>My name is </h3>
          <h1 className='intro-tag'>Abhishek Singh</h1>
          <h3 className='intro-tag'>& I am a Passionate </h3>
          <h1 className='intro-tag'>Web Developer ,</h1>
          <h1 className='intro-tag'>Problem Solver</h1>
          <h1 className='intro-tag'>Full Stack Developer</h1>
          {/* <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("GeeksForGeeks")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Welcomes You")
                        .start();
                }}
            /> */}
        <div className='social-media'>
          <Link target='_blank'  href={`https://github.com/abhis12321`} className='social-platform'><FontAwesomeIcon icon={faGithub} size='3x' id='github'/></Link>
          <Link target='_blank'  href={`https://www.linkedin.com/in/abhishek-singh-b82427256/`}  className='social-platform'><FontAwesomeIcon icon={faLinkedin} size='3x' /></Link>          
          <Link target='_blank'  href={`https://www.instagram.com/____abhis____/`}><FontAwesomeIcon icon={faInstagram} size='3x' className='social-platform' id='insta' /></Link>
        </div>
      </div>

      <section className="study">
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faC} size='8x' id='c'/> 
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
            <FontAwesomeIcon icon={faHtml5} size='8x' id='html'/> 
            <h3>HTML</h3>
          </div>
          <div className="tech-tag">
            <h2>December 2022</h2>
            <p>It was the initial Starting for my web development journey as a beginner I started with HTML(Hyper Text Markup Language)</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faCss3Alt} size='8x' id='css'/> 
            <h3>CSS</h3>
          </div>
          <div className="tech-tag">
            <h2>December 2022</h2>
            <p>It was the initial Starting for my web development journey as a beginner I started with HTML and here I also focused on CSS(Cascading Style Sheet) as It gives a good look to the HTML</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faSquareJs} size='8x' id='js'/> 
            <h3>JavaScript</h3>
          </div>
          <div className="tech-tag">
            <h2>February 2023</h2>
            <p>After having a good knowledge of HTML and CSS, I moved to JavaScript as It is used in Front-end and Back-end of and web-app and provides some Dynamic properties too</p>
          </div>
        </div>
        
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faBootstrap} size='8x' id='boot'/> 
            <h3>Bootstrap</h3>
          </div>
          <div className="tech-tag">
            <h2>February 2023</h2>
            <p>Bootstrap is an toolkit which makes the web development very fast and dynamic, It is an predefined CSS and JavaScript containing tool, I spend some time to learn How to use Bootstrap in my projects</p>
          </div>
        </div>
        
        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faReact} size='8x' id='react'/> 
            <h3>ReactJS</h3>
          </div>
          <div className="tech-tag">
            <h2>May 2023</h2>
            <p>React is an JavaScript library for front-end only and I spend a lot of time in learning ReactJS and its properties like : hooks, routing , etc</p>
          </div>
        </div>

        <div className="lang1 tech">
          <div className="tech-tag">
            <FontAwesomeIcon icon={faN} size='6x' id='N'/> 
            <h3>NextJS</h3>
          </div>
          <div className="tech-tag">
            <h2>September 2023</h2>
            <p>NextJs is an a complete package for web development, It is a ReactJS framework but as we know ReactJS is only an front-end libreary but NextJS is a not only for Front-end, It can be used for Back-end develoment too.</p>
          </div>
        </div>

      </section>

      <section className="project">
        <div className="proj">
          <Image  
          // src={A}
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44xyPyV2KNaYbm0oO-E5sn0NyanhpjfjI7pd6ozdrRTJRl9Y5ixHj5dIQsAso7d9A1ms&usqp=CAU'} 
           alt='profile' width={200} height={200}/>

           <Image src={'/uploads/1710806250731insta6.jpg'} height={100} width={100} alt='profile'/>
        </div>
      </section>

    </div>
  )
}