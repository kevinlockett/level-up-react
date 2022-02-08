import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createGame, getGameTypes } from "./GameManager"
import "./Game.css"

export const GameForm = () => {
	const history = useHistory()
	const [gameTypes, setGameTypes] = useState([])

	/*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
	const [currentGame, setCurrentGame] = useState({
		title: "",
		maker: "",
		numberOfPlayers: 0,
		skillLevel: 1,
		gameTypeId: 0,
	})

	useEffect(() => {
		getGameTypes().then((data) => {
			setGameTypes(data)
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
			<h2 className='gameForm__title'>Register New Game</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						name='title'
						required
						autoFocus
						className='form-control'
						value={currentGame.title}
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
						value={currentGame.maker}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='number_of_players'>
						Number of Players:{" "}
					</label>
					<input
						type='number'
						name='numberOfPlayers'
						required
						className='form-control'
						value={currentGame.numberOfPlayers}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='skill_level'>Skill Level: </label>
					<input
						type='number'
						name='skillLevel'
						required
						className='form-control'
						value={currentGame.skillLevel}
						onChange={changeGameState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='gameTypeId'>Game Type: </label>
					<select
						name='gameTypeId'
						required
						className='form-control'
						value={currentGame.gameTypeId}
						onChange={changeGameState}>
						<option
							value='0'
							label='Select appropriate game type'></option>
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

					const game = {
						title: currentGame.title,
						maker: currentGame.maker,
						number_of_players: parseInt(
							currentGame.numberOfPlayers
						),
						skill_level: parseInt(currentGame.skillLevel),
						game_type: parseInt(currentGame.gameTypeId),
					}

					// Send POST request to your API
					createGame(game).then(() => history.push("/"))
				}}
				className='btn btn-2 btn-primary'>
				Create
			</button>
		</form>
	)
}
