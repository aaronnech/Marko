function MarkoViewModel() {
	this.base = ViewModel;
	this.base.apply(this);

	// Input processor
	this.input_ = new Input();

	// Setup renderer
	this.pixiStage_ = new PIXI.Stage(0x339933);
	this.pixiRenderer_ = PIXI.autoDetectRenderer(
		MarkoViewModel.DISPLAY_WIDTH, MarkoViewModel.DISPLAY_HEIGHT);
	this.pixiWorld_ = new PIXI.DisplayObjectContainer();
	this.pixiStage_.addChild(this.pixiWorld_);
	document.body.appendChild(this.pixiRenderer_.view);

	// Camera
	this.camera_ = new Camera(
		MarkoViewModel.WORLD_WIDTH,
		MarkoViewModel.WORLD_HEIGHT,
		MarkoViewModel.DISPLAY_WIDTH,
		MarkoViewModel.DISPLAY_HEIGHT);
	this.cameraView_ = new CameraView(this.camera_, this.pixiStage_, this.pixiWorld_);
	var cameraContainer = this.cameraView_.getPixiStageMember();

	// Map
	this.map_ = new Map(
		MarkoViewModel.NUMBER_OF_X_TILES,
		MarkoViewModel.NUMBER_OF_Y_TILES,
		MarkoViewModel.TILE_HEIGHT,
	    MarkoViewModel.TILE_WIDTH);
	this.mapView_ = new MapView(this.map_, this.camera_, this.pixiWorld_);

	// Create select handler
	this.selector_ = new Selector(this.input_);

	// Place a colony down (test for now)
	this.colony_ = new WorkerColony(this.map_);
	for (var i = 0; i < 100; i++) {
		var worker = new Worker();
		var workerView = new WorkerView(worker, this.camera_, this.pixiWorld_);
		this.colony_.addWorker(worker);
	}

	// Camera panning
	this.input_.bindKeyDownAction(
		Input.Keys.UP, Action.ViewActions.PAN_UP);
	this.input_.bindKeyDownAction(
		Input.Keys.DOWN, Action.ViewActions.PAN_DOWN);
	this.input_.bindKeyDownAction(
		Input.Keys.RIGHT, Action.ViewActions.PAN_RIGHT);
	this.input_.bindKeyDownAction(
		Input.Keys.LEFT, Action.ViewActions.PAN_LEFT);

	// Move the camera to the starting position
	this.camera_.moveX(MarkoViewModel.WORLD_WIDTH / 2);
	this.camera_.moveY(MarkoViewModel.WORLD_HEIGHT / 2);
}
MarkoViewModel.prototype = Object.create(ViewModel.prototype);

MarkoViewModel.DISPLAY_WIDTH = 800;
MarkoViewModel.DISPLAY_HEIGHT = 600;
MarkoViewModel.WORLD_WIDTH = 8000;
MarkoViewModel.WORLD_HEIGHT = 6000;
MarkoViewModel.TILE_HEIGHT = 16;
MarkoViewModel.TILE_WIDTH = 16;
MarkoViewModel.NUMBER_OF_X_TILES =
	MarkoViewModel.WORLD_WIDTH / MarkoViewModel.TILE_WIDTH;
MarkoViewModel.NUMBER_OF_Y_TILES =
	MarkoViewModel.WORLD_HEIGHT / MarkoViewModel.TILE_HEIGHT;


MarkoViewModel.prototype.render = function() {
	// Render the pixi stage
	this.pixiRenderer_.render(this.pixiStage_);
};


MarkoViewModel.prototype.update = function() {
	// Update the models that have to be updated
	// every game loop here
	this.input_.update();
};


MarkoViewModel.prototype.panCameraLeft = function() {
	this.camera_.panLeft();
};


MarkoViewModel.prototype.panCameraRight = function() {
	this.camera_.panRight();
};


MarkoViewModel.prototype.panCameraUp = function() {
	this.camera_.panUp();
};


MarkoViewModel.prototype.panCameraDown = function() {
	this.camera_.panDown();
};