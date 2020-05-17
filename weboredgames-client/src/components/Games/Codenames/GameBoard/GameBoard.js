/**
* GameBoard.js
* @author Christopher Smith
* @description The main codenames gameboard
* @created 2020-04-16T16:53:05.958Z-07:00
* @last-modified 2020-05-16T19:55:45.703Z-07:00
*/

// ----------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button
} from 'reactstrap';

import './GameBoard.css';

import WordCard from 'components/Games/Codenames/WordCard/WordCard';
import SpymasterView from 'components/Games/Codenames/SpymasterView/SpymasterView';
import SpyView from 'components/Games/Codenames/SpyView/SpyView';
import Timer from 'components/Timer/Timer';
// import ClueHistory from 'components/Games/Codenames/ClueHistory/ClueHistory';


// ----------------------------------------------------

export default class GameBoard extends Component {

  constructor(props) {
    super(props);

    let minutesAndSeconds = props.gameData._timer.timerActive ?
         props.gameData._timer.wantedTime.split(',') : [0,0];

    this.state = {
      minutes: Number(minutesAndSeconds[0]),
      seconds: Number(minutesAndSeconds[1])
    };

    this.returnToHomeScreen = this.returnToHomeScreen.bind(this);
    this.startANewGame = this.startANewGame.bind(this);
  }

  // ----------------------------------------------------

  componentDidMount() {
    const { gameData } = this.props;
    this.timerInterval = gameData._timer.timerActive ? setInterval(() => {
      const { minutes, seconds } = this.state;
      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.timerInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000) : null;
  }


  // ----------------------------------------------------

  returnToHomeScreen() {
    const { socket, currentUserData } = this.props;
    socket.emit("codenamesReturnHome", { userId: currentUserData.userId });
  }

  // ----------------------------------------------------

  startANewGame() {
    const { socket, currentUserData } = this.props;
    socket.emit('codenamesStartNew', { userId: currentUserData.userId });
  }


  // ----------------------------------------------------

  changeTeamsTurn = () => {
    const { socket, currentUserData } = this.props;
    socket.emit("codenamesChangeTeamsTurn", { userId: currentUserData.userId });
  };

  // ----------------------------------------------------

  render() {

    const { gameData, currentUserData, currentUsersTeam, socket, currentUserIsRoomLeader } = this.props;

    let isSpymaster = [gameData._spyMasterBlue, gameData._spyMasterRed].includes(currentUserData.userId);

    let borderColorClassName = currentUsersTeam === "Red" ? "red-team-border" : "blue-team-border";

    let needsFlashingBorder =
      currentUsersTeam === gameData._currentTeamsTurn &&
      (
        (isSpymaster && gameData._currentClue.clueWord === "")
        || (
            [gameData._designatedBlueGuesser, gameData._designatedRedGuesser].includes(currentUserData.userId)
            && gameData._currentClue.clueWord !== ""
           )
      );

    return (
      <div className="main-gameboard">
        <div className="codenames-header">
          {gameData._gameResults.gameIsOver ? (
            <h1>{`${gameData._gameResults.gameWinner} Team Wins!`}</h1>
          ) : (
            <>
              <h1>It is {gameData._currentTeamsTurn}&apos;s turn</h1>
              <Button
                className="skip-turn-button"
                color="danger"
                disabled={gameData._currentTeamsTurn !== currentUsersTeam || gameData._currentClue.clueWord === ""}
                onClick={() => this.changeTeamsTurn()}
              >
                Skip
              </Button>
            </>
          )}
        </div>
        <div className={`main-cards ${borderColorClassName} ${needsFlashingBorder && !gameData._gameResults.gameIsOver ? "flashing-border" : "static-border"}`}>
          {this.getWordCards()}
        </div>
        {!gameData._gameResults.gameIsOver ? (
          <>
            {gameData._timer.timerActive && (
              <Timer
                minutes={this.state.minutes}
                seconds={this.state.seconds}
              />
            )}
            {isSpymaster ? (
              <SpymasterView
                socket={socket}
                skipDisabled={currentUsersTeam !== gameData._currentTeamsTurn}
                currentClue={gameData._currentClue}
                userId={currentUserData.userId}
              />
            ) : (
              <SpyView
                currentClue={gameData._currentClue}
                currentlyUsersTurn={gameData._currentTeamsTurn === currentUsersTeam}
                currentUserIsGuesser={currentUsersTeam === "Red" ? gameData._designatedRedGuesser === currentUserData.userId : gameData._designatedBlueGuesser === currentUserData.userId}
              />
            )}
            {/* <ClueHistory clueHistory={gameData._clueHistory} /> */}
          </>
        ) : (
          <>
            {currentUserIsRoomLeader && (
              <div className="room-leader-resets">
                <Button
                  className="return-home-button"
                  color="danger"
                  onClick={this.returnToHomeScreen}
                >
                  Return to Lobby
                </Button>
                <Button
                  className="restart-button"
                  color="success"
                  onClick={this.startANewGame}
                >
                  Restart Game
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }


  // ----------------------------------------------------

  getWordCards() {
    const { gameData, currentUserData, currentUsersTeam, socket } = this.props;

    const determineCardsTeam = (wordIndex) => {
      if (gameData._blueWords.includes(wordIndex)) return "blue-team";
      if (gameData._redWords.includes(wordIndex)) return "red-team";
      if (gameData._assassin.index === wordIndex) return "assassin";

      return "bystander";
    };

    const selectWord = (wordObject) => {
      socket.emit('codenamesSelectWord', { selectedWord: wordObject, userId: currentUserData.userId }, () => {

      });
    };

    return gameData._words.map((word) => (
      <WordCard
        key={word.index}
        word={word}
        wordSelected={gameData._selectedWords.includes(word.index)}
        cardTeam={determineCardsTeam(word.index)}
        selectWord={selectWord}
        gameData={gameData}
        userData={currentUserData}
        currentUsersTeam={currentUsersTeam}
        disabled={currentUsersTeam !== gameData._currentTeamsTurn}
      />
    ));
  }

}


// ----------------------------------------------------

GameBoard.propTypes = {
  gameData: PropTypes.object,
  currentUserData: PropTypes.object,
  socket: PropTypes.object,
  currentUsersTeam: PropTypes.string,
  currentUserIsRoomLeader: PropTypes.bool
};

