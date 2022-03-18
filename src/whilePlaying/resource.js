import JudgeLine from './assets/JudgeLine.png';
import ProgressBar from './assets/ProgressBar.png';
import SongsNameBar from './assets/SongNameBar.png';
import Pause from './assets/Pause.png';
import clickRaw from './assets/clickRaw.png';
import Tap from './assets/Tap.png';
import Tap2 from './assets/Tap2.png';
import TapHL from './assets/TapHL.png';
import Drag from './assets/Drag.png';
import DragHL from './assets/DragHL.png';
import HoldHead from './assets/HoldHead.png';
import HoldHeadHL from './assets/HoldHeadHL.png';
import Hold from './assets/Hold.png';
import HoldHL from './assets/HoldHL.png';
import HoldEnd from './assets/HoldEnd.png';
import Flick from './assets/Flick.png';
import FlickHL from './assets/FlickHL.png';
import NoImage from './assets/0.png';
import mute from './assets/mute.ogg';
import HitSong0 from './assets/Tap.ogg';
import HitSong1 from './assets/Drag.ogg';
import HitSong2 from './assets/Flick.ogg';

import clickRaw_old from './assets/oldui/clickRaw.png';
import Drag_old from './assets/oldui/Drag.png';
import DragHL_old from './assets/oldui/Drag2HL.png';
import Flick_old from './assets/oldui/Flick.png';
import FlickHL_old from './assets/oldui/Flick2HL.png';
import Hold_old from './assets/oldui/HoldBody.png';
import HoldHL_old from './assets/oldui/HoldBody.png';
import HoldHead_old from './assets/oldui/Tap.png';
import HoldHeadHL_old from './assets/oldui/Tap2HL.png';
import HoldEnd_old from './assets/oldui/HoldEnd.png';
import Tap_old from './assets/oldui/Tap.png';
import Tap2_old from './assets/oldui/Tap2.png';
import TapHL_old from './assets/oldui/Tap2HL.png';

let resource = {
	JudgeLine,
	ProgressBar,
	SongsNameBar,
	Pause,
	clickRaw,
	Tap,
	Tap2,
	TapHL,
	Drag,
	DragHL,
	HoldHead,
	HoldHeadHL,
	Hold,
	HoldHL,
	HoldEnd,
	Flick,
	FlickHL,
	NoImage,
	mute,
	HitSong0,
	HitSong1,
	HitSong2,
};
if (localStorage.getItem('useOldUI') == 'true') {
	resource = {
		...resource,
		clickRaw: clickRaw_old,
		Drag: Drag_old,
		DragHL: DragHL_old,
		Flick: Flick_old,
		FlickHL: FlickHL_old,
		Hold: Hold_old,
		HoldHL: HoldHL_old,
		HoldHead: HoldHead_old,
		HoldHeadHL: HoldHeadHL_old,
		HoldEnd: HoldEnd_old,
		Tap: Tap_old,
		Tap2: Tap2_old,
		TapHL: TapHL_old,
	};
}

export default resource;
