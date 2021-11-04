
var count = 5;
	var rectSize = 60;
	
	//CIRCLE SHAPE
	var path = new Path.Circle(new Point(0,0), 190);
	
	path.style = {
		strokeColor: 'blue'
	};
	
	var symbol = new Symbol(path);
	
	var yCord = rectSize;
	var center = 0;
	
	//place instance of this symbol
	for( var i = 0; i < count; i++)
	{
		//position randomly
		var center = Point.random() * view.size;
		
		if( center > view.bounds.width - (rectSize * 2.0))
		{
			center = 0;
			yCord = yCord + (rectSize + 10);
		}
		
		//center accordingly
		center = center + (rectSize + 10);
		
		var placed = symbol.place(new Point( center, yCord));
		
		//size scaling by index
		placed.scale( i / count);
		
		
		placed.data = {};
		placed.data.vector = new Point
		({
			angle: Math.random() * 360,
			length: ( i / count) * Math.random()
		});
	}
	
	var vector = new Point
	({
		angle: 45,
		length: 0
	});
	
	//onframe function is called up to 60 fps
	function onFrame(event)
	{
		
		vector = vector / view.center
		
		//Run through the active layer's child list and change
		//the position of the placed symbols
		for( var i = 0; i < count; i++)
		{
			vector = vector + 0.01;
			var item = project.activeLayer.children[i];
			var size = item.bounds.size;
			var length = vector.length / 10.0 * size.width / 10.0;
			
			//update this items POSITION RANDOMLY
			item.position += vector.normalize(length) + item.data.vector;
			
			if(item.position.y >= 150)
				item.position.y-=(Math.sqrt(item.position.y - 150) / 5.0);			
			
			keepInView(item);
		}
	}
	
	function keepInView(item)
	{
		var position = item.position;
		var itemBounds = item.bounds;
		var bounds = view.bounds;
		
		if( itemBounds.left > bounds.width)
			position.x = -item.bounds.width;
		
		if( position.x < -itemBounds.width)
			position.x = bounds.width + itemBounds.width;
		
		if( position.y < -itemBounds.height)
			position.y = bounds.height + itemBounds.height / 2.0;
	}