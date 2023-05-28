import "./topbar.css"

export default function Topbar({menuOpen, setMenuOpen}) {
  return (
  	<div id="topbar" className="topbar" dos>
    	<h1>LangComprehend</h1>
      	<h3>An LLM powered language learning app</h3>
			<a href="comprehension">Comprehension</a>
			<a href="vocab">Vocab</a>
		</div>
  )
}