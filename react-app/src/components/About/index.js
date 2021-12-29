import './About.css'
import githubIcon from '../../media/GitHub-Icon.png'
import linkedInIcon from '../../media/LI-Icon-Logo.png'
// import goodeatsFlower from '../../media/goodeats_flower_transparent.png'

const AboutPage = () => {

  return (
    <div className="About-Outer-Div">
      <div className="AboutCont-Inner-Div">
        <div className='aboutHeading'>
          <h1 className="aboutHeader-Title">About</h1>
          {/* <img src={goodeatsFlower} alt='' className='goodeatsFlower-About' ></img>  */}
        </div>
        <div className="aboutInner-Inner-Div">
          <a href='https://github.com/Chocoloco123/goodeats' className="githubIcon-About" rel=''>
            <img src={githubIcon} alt="" className="githubIcon"></img>
          </a>
          <h3 className='headings-About'>App Github</h3>
        </div>
        <div className="aboutInner-Inner-Div">
          <a href='https://www.linkedin.com/in/caroline-sarkki-2a5517126/' className="githubIcon-About" rel=''>
            <img src={linkedInIcon} alt="" className="githubIcon"></img>
          </a>
          <h3 className='headings-About'>Caroline's LinkedIn</h3>
        </div>
        <div className="aboutInner-Inner-Div">
          <a href='https://github.com/Chocoloco123' className="githubIcon-About" rel=''>
            <img src={githubIcon} alt="" className="githubIcon"></img>
          </a>
          <h3 className='headings-About'>Caroline's Github</h3>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;