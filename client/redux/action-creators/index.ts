import { playerActions } from "../reducers/player.slice"
import { tracksActions } from "../reducers/tracks.slice"

export default {
	...playerActions,
	...tracksActions
}