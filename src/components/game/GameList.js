import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { getGames, deleteGame } from "./GameManager.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons"
import "./Game.css"

export const GameList = (props) => {
	const [games, setGames] = useState([])
	const history = useHistory()

	const pencil = <FontAwesomeIcon icon={faPencil} />
	const trashCan = <FontAwesomeIcon icon={faTrashCan} />

	const getAllGames = () => getGames().then((gameData) => setGames(gameData))

	useEffect(() => {
		getAllGames()
	}, [])

	return (
		<article className='games'>
			{games.map((game) => {
				return (
					<section key={`game--${game.id}`} className='game'>
						<div className='game__title'>
							{game.title} by {game.maker}
						</div>
						<div className='game__players'>
							{game.number_of_players} players needed
						</div>
						<div className='game__skillLevel'>
							Skill level is {game.skill_level}
						</div>
						<div>
							<Link
								className='btn-icon'
								to={`/games/${game.id}/update`}>
								{pencil}
							</Link>
							<button
								className='btn-icon'
								onClick={() => {
									deleteGame(game.id).then(getAllGames)
								}}>
								{trashCan}
							</button>
						</div>
					</section>
				)
			})}
			<button
				className='btn btn-2 btn-sep icon-create'
				onClick={() => {
					history.push({ pathname: "/games/new" })
				}}>
				Register New Game
			</button>
		</article>
	)
}
