import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getGame, getGameTypes, updateGame } from "./GameManager"
import "./Game.css"

export const UpdateGame = () => {
	const [gameTypes, setGameTypes] = useState([])
	const [currentGame, setCurrentGame] = useState({})
	const { gameId } = useParams()
	const history = useHistory()

	useEffect(() => {
		getGameTypes().then((data) => {
			setGameTypes(data)
		})
	}, [])

	useEffect(() => {
		getGame(gameId).then((gameData) => {
			setCurrentGame(gameData)
		})
	}, [])

	const changeGameState = (domEvent) => {
		const copy = { ...currentGame }
		copy[domEvent.target.name] = domEvent.target.value
		// another way to do the same thing follows on the next line:
		// const copy = Object.assign({}, currentGame)
		setCurrentGame(copy)
	}

	return (
		<form className='gameForm'>
			<h2 className='gameForm__title'>Update {currentGame.title}</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						name='title'
						required
						autoFocus
						className='form-control'
						defaultValue={currentGame.title}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='maker'>Game Maker: </label>
					<input
						type='text'
						name='maker'
						required
						className='form-control'
						defaultValue={currentGame.maker}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='number_of_players'>
						Number of Players:
					</label>
					<input
						type='number'
						name='number_of_players'
						required
						className='form-control'
						defaultValue={currentGame.number_of_players}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='skill_level'>Skill Level: </label>
					<input
						type='number'
						name='skill_level'
						required
						className='form-control'
						defaultValue={currentGame.skill_level}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='game_type'>Game Type: </label>
					<select
						name='game_type'
						required
						className='form-control'
						value={currentGame.game_type}
						onChange={changeGameState}>
						{gameTypes.map((gameType) => {
							return (
								<option
									value={gameType.id}
									key={`gameType--${gameType.id}`}>
									{gameType.label}
								</option>
							)
						})}
					</select>
				</div>
			</fieldset>
			<button
				type='submit'
				onClick={(evt) => {
					// Prevent form from being submitted
					evt.preventDefault()

					// Send PUT request to your API
					updateGame(currentGame).then(() => history.push("/"))
				}}
				className='btn btn-2 btn-primary'>
				Update Game
			</button>
		</form>
	)
}
