import { createAction } from '@reduxjs/toolkit'

import type { Skill } from '~/components/molecules/card-skill/card-skill'
import type { IPlayer } from './player'
import {
    ACTION_ADD_PLAYERS,
    ACTION_ADD_PLAYERS_FAIL,
    ACTION_ADD_PLAYERS_SUCCESS,
    ACTION_ANSWERED_THE_QUESTION,
    ACTION_ANSWERED_THE_QUESTION_FAIL,
    ACTION_ANSWERED_THE_QUESTION_SUCCESS,
    ACTION_CHANGE_PLAYERS,
    ACTION_CHANGE_PLAYERS_FAIL,
    ACTION_CHANGE_PLAYERS_SUCCESS,
    ACTION_DELETE_PLAYERS,
    ACTION_DELETE_PLAYERS_FAIL,
    ACTION_DELETE_PLAYERS_SUCCESS,
    ACTION_NEW_ROUND,
    ACTION_NEW_ROUND_FAIL,
    ACTION_NEW_ROUND_SUCCESS,
    ACTION_RESET_PLAYERS,
    ACTION_RESET_PLAYERS_FAIL,
    ACTION_RESET_PLAYERS_SUCCESS,
    ACTION_RESET_SCORE,
    ACTION_RESET_SCORE_FAIL,
    ACTION_RESET_SCORE_SUCCESS,
    ACTION_RESET_VOTING,
    ACTION_RESET_VOTING_FAIL,
    ACTION_RESET_VOTING_SUCCESS,
    ACTION_UPDATE_CAN_PLAYER_VOTE,
    ACTION_UPDATE_CAN_PLAYER_VOTE_FAIL,
    ACTION_UPDATE_CAN_PLAYER_VOTE_SUCCESS,
    ACTION_UPDATE_HISTORIC_SKILLS,
    ACTION_UPDATE_HISTORIC_SKILLS_FAIL,
    ACTION_UPDATE_HISTORIC_SKILLS_SUCCESS,
    ACTION_UPDATE_PLAYER_CAN_ANSWER,
    ACTION_UPDATE_PLAYER_CAN_ANSWER_FAIL,
    ACTION_UPDATE_PLAYER_CAN_ANSWER_SUCCESS,
    ACTION_UPDATE_PLAYER_CAN_ASK,
    ACTION_UPDATE_PLAYER_CAN_ASK_FAIL,
    ACTION_UPDATE_PLAYER_CAN_ASK_SUCCESS,
    ACTION_UPDATE_PLAYER_NAME,
    ACTION_UPDATE_PLAYER_NAME_FAIL,
    ACTION_UPDATE_PLAYER_NAME_SUCCESS,
    ACTION_UPDATE_PLAYER_REVEAL,
    ACTION_UPDATE_PLAYER_REVEAL_FAIL,
    ACTION_UPDATE_PLAYER_REVEAL_SUCCESS,
    ACTION_UPDATE_PLAYER_SCORE,
    ACTION_UPDATE_PLAYER_SCORE_FAIL,
    ACTION_UPDATE_PLAYER_SCORE_SUCCESS,
    ACTION_UPDATE_SKILL_ATTACK,
    ACTION_UPDATE_SKILL_ATTACK_FAIL,
    ACTION_UPDATE_SKILL_ATTACK_SUCCESS,
    ACTION_UPDATE_SKILL_DEFENSE,
    ACTION_UPDATE_SKILL_DEFENSE_FAIL,
    ACTION_UPDATE_SKILL_DEFENSE_SUCCESS,
    ACTION_VOTE_IN_PLAYER,
    ACTION_VOTE_IN_PLAYER_FAIL,
    ACTION_VOTE_IN_PLAYER_SUCCESS,
} from './types'

export const onChangePlayers = createAction<{ players: IPlayer[] }>(
    ACTION_CHANGE_PLAYERS,
)
export const onChangePlayersSuccess = createAction<{ players: IPlayer[] }>(
    ACTION_CHANGE_PLAYERS_SUCCESS,
)
export const onChangePlayersFail = createAction(ACTION_CHANGE_PLAYERS_FAIL)

export const onAddPlayers = createAction<{ name: string }>(ACTION_ADD_PLAYERS)
export const onAddPlayersSuccess = createAction<{ name: string }>(
    ACTION_ADD_PLAYERS_SUCCESS,
)
export const onAddPlayersFail = createAction(ACTION_ADD_PLAYERS_FAIL)

export const onDeletePlayers = createAction<{ id: string }>(ACTION_DELETE_PLAYERS)
export const onDeletePlayersSuccess = createAction<{ id: string }>(
    ACTION_DELETE_PLAYERS_SUCCESS,
)
export const onDeletePlayersFail = createAction(ACTION_DELETE_PLAYERS_FAIL)

export const onUpdatePlayerScore = createAction<{ _id: string; score: number }>(
    ACTION_UPDATE_PLAYER_SCORE,
)
export const onUpdatePlayerScoreSuccess = createAction<{
    _id: string
    score: number
}>(ACTION_UPDATE_PLAYER_SCORE_SUCCESS)
export const onUpdatePlayerScoreFail = createAction(ACTION_UPDATE_PLAYER_SCORE_FAIL)

export const onUpdatePlayerReveal = createAction<{ _id: string; reveal: boolean }>(
    ACTION_UPDATE_PLAYER_REVEAL,
)
export const onUpdatePlayerRevealSuccess = createAction<{
    _id: string
    reveal: boolean
}>(ACTION_UPDATE_PLAYER_REVEAL_SUCCESS)
export const onUpdatePlayerRevealFail = createAction(
    ACTION_UPDATE_PLAYER_REVEAL_FAIL,
)

export const onUpdatePlayerCanAnswer = createAction<{
    _id: string
    canAnswer: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ANSWER)
export const onUpdatePlayerCanAnswerSuccess = createAction<{
    _id: string
    canAnswer: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ANSWER_SUCCESS)
export const onUpdatePlayerCanAnswerFail = createAction(
    ACTION_UPDATE_PLAYER_CAN_ANSWER_FAIL,
)

export const onUpdatePlayerCanAsk = createAction<{ _id: string; canAsk: boolean }>(
    ACTION_UPDATE_PLAYER_CAN_ASK,
)
export const onUpdatePlayerCanAskSuccess = createAction<{
    _id: string
    canAsk: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ASK_SUCCESS)
export const onUpdatePlayerCanAskFail = createAction(
    ACTION_UPDATE_PLAYER_CAN_ASK_FAIL,
)

export const onUpdatePlayerName = createAction<{ _id: string; name: string }>(
    ACTION_UPDATE_PLAYER_NAME,
)
export const onUpdatePlayerNameSuccess = createAction<{
    _id: string
    name: string
}>(ACTION_UPDATE_PLAYER_NAME_SUCCESS)
export const onUpdatePlayerNameFail = createAction(ACTION_UPDATE_PLAYER_NAME_FAIL)

export const onResetPlayers = createAction(ACTION_RESET_PLAYERS)
export const onResetPlayersSuccess = createAction(ACTION_RESET_PLAYERS_SUCCESS)
export const onResetPlayersFail = createAction(ACTION_RESET_PLAYERS_FAIL)

type DisplayVote = {
    _id: string
    canVote: boolean
}

export const onUpdateCanPlayerVote = createAction<DisplayVote>(
    ACTION_UPDATE_CAN_PLAYER_VOTE,
)

export const onUpdateCanPlayerVoteSuccess = createAction<DisplayVote>(
    ACTION_UPDATE_CAN_PLAYER_VOTE_SUCCESS,
)

export const onUpdateCanPlayerVoteFail = createAction(
    ACTION_UPDATE_CAN_PLAYER_VOTE_FAIL,
)

export const onResetVoting = createAction(ACTION_RESET_VOTING)
export const onResetVotingSuccess = createAction(ACTION_RESET_VOTING_SUCCESS)
export const onResetVotingFail = createAction(ACTION_RESET_VOTING_FAIL)

export type DisplayVoting = {
    disguised_id: string
    _id: string
}

export const onVoteInPlayer = createAction<DisplayVoting>(ACTION_VOTE_IN_PLAYER)
export const onVoteInPlayerSuccess = createAction<{ players: IPlayer[] }>(
    ACTION_VOTE_IN_PLAYER_SUCCESS,
)
export const onVoteInPlayerFail = createAction(ACTION_VOTE_IN_PLAYER_FAIL)

export const onAnsweredTheQuestion = createAction<{
    _id: string
    player_ask_id: string
}>(ACTION_ANSWERED_THE_QUESTION)
export const onAnsweredTheQuestionSuccess = createAction<{
    players: IPlayer[]
}>(ACTION_ANSWERED_THE_QUESTION_SUCCESS)
export const onAnsweredTheQuestionFail = createAction(
    ACTION_ANSWERED_THE_QUESTION_FAIL,
)

export const onNewQuestionRound = createAction(ACTION_NEW_ROUND)
export const onNewQuestionRoundSuccess = createAction<{ players: IPlayer[] }>(
    ACTION_NEW_ROUND_SUCCESS,
)
export const onNewQuestionRoundFail = createAction(ACTION_NEW_ROUND_FAIL)

export const onResetScore = createAction(ACTION_RESET_SCORE)
export const onResetScoreSuccess = createAction<{ players: IPlayer[] }>(
    ACTION_RESET_SCORE_SUCCESS,
)
export const onResetScoreFail = createAction(ACTION_RESET_SCORE_FAIL)

export const onUpdateHistoricSkills = createAction<{
    player: IPlayer
    skill: Skill
    type: 'add' | 'remove'
}>(ACTION_UPDATE_HISTORIC_SKILLS)

export const onUpdateHistoricSkillsSuccess = createAction<{
    players: IPlayer[]
}>(ACTION_UPDATE_HISTORIC_SKILLS_SUCCESS)

export const onUpdateHistoricSkillsFail = createAction(
    ACTION_UPDATE_HISTORIC_SKILLS_FAIL,
)

export const onUpdateSkillDefense = createAction<{
    player: IPlayer
    skill: Skill
    type: 'add' | 'remove'
}>(ACTION_UPDATE_SKILL_DEFENSE)

export const onUpdateSkillDefenseSuccess = createAction<{
    players: IPlayer[]
}>(ACTION_UPDATE_SKILL_DEFENSE_SUCCESS)

export const onUpdateSkillDefenseFail = createAction(
    ACTION_UPDATE_SKILL_DEFENSE_FAIL,
)

export const onUpdateSkillAttack = createAction<{
    player: IPlayer
    skill: Skill
    type: 'add' | 'remove'
}>(ACTION_UPDATE_SKILL_ATTACK)

export const onUpdateSkillAttackSuccess = createAction<{
    players: IPlayer[]
}>(ACTION_UPDATE_SKILL_ATTACK_SUCCESS)

export const onUpdateSkillAttackFail = createAction(ACTION_UPDATE_SKILL_ATTACK_FAIL)
