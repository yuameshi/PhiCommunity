const resource = {
	JudgeLine: 'assets/JudgeLine.png',
	ProgressBar: 'assets/ProgressBar.png',
	SongsNameBar: 'assets/SongNameBar.png',
	Pause: 'assets/Pause.png',
	clickRaw: 'assets/clickRaw.png',
	Tap: 'assets/Tap.png',
	Tap2: 'assets/Tap2.png',
	TapHL: 'assets/TapHL.png',
	Drag: 'assets/Drag.png',
	DragHL: 'assets/DragHL.png',
	HoldHead: 'assets/HoldHead.png',
	HoldHeadHL: 'assets/HoldHeadHL.png',
	Hold: 'assets/Hold.png',
	HoldHL: 'assets/HoldHL.png',
	HoldEnd: 'assets/HoldEnd.png',
	Flick: 'assets/Flick.png',
	FlickHL: 'assets/FlickHL.png',
	NoImage: 'assets/0.png',
	mute: 'assets/mute.ogg',
	HitSong0: 'assets/Tap.ogg',
	HitSong1: 'assets/Drag.ogg',
	HitSong2: 'assets/Flick.ogg',
};
if (localStorage.getItem('usePlayerFriendlyUI') == 'true') {
	resource.FlickHL = 'assets/playerFirendlyNote/FlickHL.png';
	resource.HoldHL = 'assets/playerFirendlyNote/HoldHL.png';
	resource.HoldHeadHL = 'assets/playerFirendlyNote/HoldHeadHL.png';
	resource.TapHL = 'assets/playerFirendlyNote/TapHL.png';
}
if (localStorage.getItem('useOldUI') == 'true') {
	resource.clickRaw = 'assets/oldui/clickRaw.png';
	resource.Drag = 'assets/oldui/Drag.png';
	resource.DragHL = 'assets/oldui/Drag2HL.png';
	resource.Flick = 'assets/oldui/Flick.png';
	resource.FlickHL = 'assets/oldui/Flick2HL.png';
	resource.Hold = 'assets/oldui/HoldBody.png';
	resource.HoldHL = 'assets/oldui/HoldBody.png';
	resource.HoldHead = 'assets/oldui/Tap.png';
	resource.HoldHeadHL = 'assets/oldui/Tap2HL.png';
	resource.HoldEnd = 'assets/oldui/HoldEnd.png';
	resource.Tap = 'assets/oldui/Tap.png';
	resource.Tap2 = 'assets/oldui/Tap2.png';
	resource.TapHL = 'assets/oldui/Tap2HL.png';
}

export default resource;
