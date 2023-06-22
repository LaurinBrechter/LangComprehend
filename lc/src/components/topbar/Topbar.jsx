import "./topbar.css"

export default function Topbar({menuOpen, setMenuOpen}) {
  return (
  	<div id="topbar" className="topbar" dos>
    	<h1>LangComprehend</h1>
      <h3>An LLM powered language learning app</h3>
		  <div className="section-container">
		    <a className="section-link" href="comprehension">Comprehension</a>
			  <a className="section-link" href="vocab">Vocab</a>
		  </div>
  	</div>
  )
}